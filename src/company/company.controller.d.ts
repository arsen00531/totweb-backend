import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { LoginCompanyDto } from 'src/email/dto/login.dto';
import { Request, Response } from 'express';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    registration(createCompanyDto: CreateCompanyDto): Promise<{
        activateLink: string;
        password: string;
        companyName: string;
        email: string;
        contactPerson: string;
        phone: string;
    } & import("./entities/company.entity").Company>;
    login(loginDto: LoginCompanyDto, req: Request, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
        company: import("./entities/company.entity").Company;
    }>;
    logout(req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    activate(link: string, res: Response): Promise<void>;
    update(updateCompanyDto: UpdateCompanyDto, id: number): Promise<import("./entities/company.entity").Company>;
}
