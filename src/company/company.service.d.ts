import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { LoginCompanyDto } from 'src/email/dto/login.dto';
import { Request, Response } from 'express';
import { TokenCompanyService } from 'src/token/tokenCompany.service';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
export declare class CompanyService {
    private readonly companyRepository;
    private readonly emailService;
    private readonly configService;
    private readonly tokenService;
    constructor(companyRepository: Repository<Company>, emailService: EmailService, configService: ConfigService, tokenService: TokenCompanyService);
    registration(createCompanyDto: CreateCompanyDto): Promise<{
        activateLink: string;
        password: string;
        companyName: string;
        email: string;
        contactPerson: string;
        phone: string;
    } & Company>;
    login(loginDto: LoginCompanyDto, req: Request, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
        company: Company;
    }>;
    logout(req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    activate(link: string, res: Response): Promise<void>;
    findAll(): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    update(updateCompanyDto: UpdateCompanyDto, id: number): Promise<Company>;
}
