import { CompanyToken } from 'src/token/entities/companyToken.entity';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
declare enum Role {
    Student = "student",
    Company = "company",
    Admin = "admin"
}
export declare class Company {
    id: number;
    companyName: string;
    email: string;
    contactPerson: string;
    phone: string;
    industry: string;
    location: string;
    size: string;
    aboutUs: string[];
    contactEmail: string;
    contactPhone: string;
    site: string;
    social: string;
    projects: string[];
    reviews: string[];
    activateLink: string;
    isActivated: boolean;
    roles: Role[];
    password: string;
    companyTokens: CompanyToken[];
    vacancies: Vacancy[];
}
export {};
