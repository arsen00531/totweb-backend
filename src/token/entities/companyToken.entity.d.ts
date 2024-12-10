import { Company } from 'src/company/entities/company.entity';
export declare class CompanyToken {
    id: number;
    refreshToken: string;
    browser: string;
    company: Company;
}
