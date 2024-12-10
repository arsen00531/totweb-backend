import { Experience } from 'src/experience/entities/experience.entity';
import { Response } from 'src/response/entities/response.entity';
export declare enum Role {
    Student = "student",
    Company = "company",
    Admin = "admin"
}
export declare class Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    university: string;
    lastYear: number;
    contactEmail: string;
    contactPhone: string;
    keySkills: string[];
    preferredFields: string[];
    locationPreferences: string[];
    activateLink: string;
    isActivated: boolean;
    roles: Role[];
    password: string;
    photo: string;
    profession: string;
    responses: Response[];
    experiences: Experience[];
}
