import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { CompanyToken } from './entities/companyToken.entity';
import {
  TAccessCompanyPayload,
  TRefreshCompanyPayload,
} from './types/payload.type';

@Injectable()
export class TokenCompanyService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(CompanyToken)
    private readonly tokenRepository: Repository<CompanyToken>,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
    private readonly configService: ConfigService,
  ) {}

  async saveTokenLogin(
    company: Company,
    clientAgent: string,
  ): Promise<CompanyToken> {
    const tokenDB = await this.tokenRepository.findOneBy({
      browser: clientAgent,
      company: { id: company.id },
    });

    if (!tokenDB) {
      const token = await this.createToken(company, clientAgent);
      return token;
    }

    const refreshPayload: TRefreshCompanyPayload = {
      clientAgent: clientAgent,
      companyId: company.id,
      email: company.email,
      role: company.roles,
    };

    tokenDB.refreshToken = await this.generateRefreshToken(refreshPayload);

    return tokenDB;
  }

  async saveTokenRefresh(
    companyId: number,
    refreshToken: string,
    clientAgent: string,
  ): Promise<CompanyToken> {
    const company = await this.companyService.findOne(companyId);

    if (!company) {
      throw new BadRequestException('User was not found');
    }

    const tokenDB = await this.tokenRepository.findOneBy({
      browser: clientAgent,
    });

    if (!tokenDB) {
      await this.createToken(company, clientAgent);

      return tokenDB;
    }

    return tokenDB;
  }

  async createToken(company: Company, clientAgent: string) {
    const token = this.tokenRepository.create({
      company: company,
      browser: clientAgent,
    });

    const refreshPayload: TRefreshCompanyPayload = {
      clientAgent: clientAgent,
      companyId: company.id,
      email: company.email,
      role: company.roles,
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
      const userData: TRefreshCompanyPayload =
        await this.jwtService.verifyAsync(token, {
          secret: this.configService.getOrThrow('JWT_REFRESH_KEY'),
        });

      return userData;
    } catch (error) {
      return null;
    }
  }

  async generateAccessToken(payload: TAccessCompanyPayload) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_LIVE'),
      secret: this.configService.getOrThrow('JWT_ACCESS_KEY'),
    });

    return token;
  }

  async generateRefreshToken(payload: TRefreshCompanyPayload) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_LIVE'),
      secret: this.configService.getOrThrow('JWT_REFRESH_KEY'),
    });

    return token;
  }

  async findOne(id: number) {
    return this.tokenRepository.findOneBy({ id });
  }

  async findOneByAgent(clientAgent: string, companyId: number) {
    return this.tokenRepository.findOneBy({
      browser: clientAgent,
      company: { id: companyId },
    });
  }

  async deleteOneByAgent(clientAgent: string, companyId: number) {
    return this.tokenRepository.delete({
      browser: clientAgent,
      company: { id: companyId },
    });
  }
}
