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

  async saveToken(
    tokenId: number | null,
    userId: number,
    refreshToken: string,
  ) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new BadRequestException('User was not found');
    }

    if (tokenId === null) {
      const token = await this.createToken(user);

      return token;
    }

    const tokenData = await this.tokenRepository.findOneBy({ id: tokenId });

    if (!tokenData) {
      const token = await this.createToken(user);
      return token;
    }

    if (refreshToken === null) {
      refreshToken = await this.generateRefreshToken({
        tokenId: tokenData.id,
        userId: user.id,
        email: user.email,
      });
    }

    tokenData.refreshToken = refreshToken;
    const token = await this.tokenRepository.save({ refreshToken });

    return token;
  }

  async createToken(user: User) {
    const token = this.tokenRepository.create({ user: user });

    const refreshPayload: TRefreshPayload = {
      tokenId: token.id,
      userId: user.id,
      email: user.email,
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
      const userData = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_REFRESH_KEY'),
      });

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

  // async generateTokenPair(payload: TPayload) {
  //     const accessToken = await this.generateAccessToken(payload)
  //     const refreshToken = await this.generateRefreshToken(payload)

  //     return {
  //         accessToken,
  //         refreshToken
  //     }
  // }

  async findOne(id: number) {
    return this.tokenRepository.findOneBy({ id });
  }
}
