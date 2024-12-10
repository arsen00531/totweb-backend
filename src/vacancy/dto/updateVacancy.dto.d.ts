import { Graphic } from '../entities/vacancy.entity';
export declare class UpdateVacancyDto {
    title: string;
    description: string;
    price: string;
    city: string;
    graphic: Graphic[];
    duties: string[];
    requirements: string[];
    conditions: string[];
    professionId: number;
}
