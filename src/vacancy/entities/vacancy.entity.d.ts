import { Company } from 'src/company/entities/company.entity';
import { Profession } from 'src/profession/entities/profession.entity';
import { Response } from 'src/response/entities/response.entity';
export declare enum Graphic {
    ALL = "all",
    GRAPHIC_FULLDAY = "graphicFullDay",
    GRAPHIC_CHANGE = "graphicChange",
    GRAPHIC_ELASTIC = "graphicElastic",
    GRAPHIC_HOME = "graphicHome"
}
export declare class Vacancy {
    id: number;
    title: string;
    description: string;
    price: string;
    city: string;
    graphic: Graphic[];
    duties: string[];
    requirements: string[];
    conditions: string[];
    createdAt: Date;
    company: Company;
    profession: Profession;
    responses: Response[];
}
