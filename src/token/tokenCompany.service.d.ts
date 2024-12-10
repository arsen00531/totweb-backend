import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { CompanyToken } from './entities/companyToken.entity';
import { TAccessCompanyPayload, TRefreshCompanyPayload } from './types/payload.type';
export declare class TokenCompanyService {
    private readonly jwtService;
    private readonly tokenRepository;
    private readonly companyService;
    private readonly configService;
    constructor(jwtService: JwtService, tokenRepository: Repository<CompanyToken>, companyService: CompanyService, configService: ConfigService);
    saveTokenLogin(company: Company, clientAgent: string): Promise<CompanyToken>;
    saveTokenRefresh(companyId: number, refreshToken: string, clientAgent: string): Promise<CompanyToken>;
    createToken(company: Company, clientAgent: string): Promise<CompanyToken>;
    validateAccessToken(token: string): Promise<any>;
    validateRefreshToken(token: string): Promise<TRefreshCompanyPayload>;
    generateAccessToken(payload: TAccessCompanyPayload): Promise<string>;
    generateRefreshToken(payload: TRefreshCompanyPayload): Promise<string>;
    findOne(id: number): Promise<CompanyToken>;
    findOneByAgent(clientAgent: string, companyId: number): Promise<CompanyToken>;
    deleteOneByAgent(clientAgent: string, companyId: number): Promise<import("typeorm").DeleteResult>;
}
