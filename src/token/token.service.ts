import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entity/token.entity';
import { Repository } from 'typeorm';
import { TAccessPayload, TRefreshPayload } from './types/payload.type';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async saveTokenLogin(user: User, clientAgent: string): Promise<Token> {
    const tokenDB = await this.tokenRepository.findOneBy({
      browser: clientAgent,
      user: { id: user.id },
    });

    if (!tokenDB) {
      const token = await this.createToken(user, clientAgent);
      return token;
    }

    const refreshPayload: TRefreshPayload = {
      clientAgent: clientAgent,
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    tokenDB.refreshToken = await this.generateRefreshToken(refreshPayload);

    return tokenDB;
  }

  async saveTokenRefresh(
    userId: number,
    refreshToken: string,
    clientAgent: string,
  ): Promise<Token> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new BadRequestException('User was not found');
    }

    const tokenDB = await this.tokenRepository.findOneBy({
      browser: clientAgent,
    });

    if (!tokenDB) {
      await this.createToken(user, clientAgent);

      return tokenDB;
    }

    return tokenDB;
  }

  async createToken(user: User, clientAgent: string) {
    const token = this.tokenRepository.create({
      user: user,
      browser: clientAgent,
    });

    const refreshPayload: TRefreshPayload = {
      clientAgent: clientAgent,
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const refreshToken = await this.generateRefreshToken(refreshPayload);
    token.refreshToken = refreshToken;
    return await this.tokenRepository.save(token);
  }

  async validateAccessToken(token: string) {
    try {
      const userData = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_ACCESS_KEY'),
      });

      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const userData: TRefreshPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.getOrThrow('JWT_REFRESH_KEY'),
        },
      );

      return userData;
    } catch (error) {
      return null;
    }
  }

  async generateAccessToken(payload: TAccessPayload) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_LIVE'),
      secret: this.configService.getOrThrow('JWT_ACCESS_KEY'),
    });

    return token;
  }

  async generateRefreshToken(payload: TRefreshPayload) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_LIVE'),
      secret: this.configService.getOrThrow('JWT_REFRESH_KEY'),
    });

    return token;
  }

  async findOne(id: number) {
    return this.tokenRepository.findOneBy({ id });
  }

  async findOneByAgent(clientAgent: string, userId: number) {
    return this.tokenRepository.findOneBy({
      browser: clientAgent,
      user: { id: userId },
    });
  }

  async deleteOneByAgent(clientAgent: string, userId: number) {
    return this.tokenRepository.delete({
      browser: clientAgent,
      user: { id: userId },
    });
  }
}
