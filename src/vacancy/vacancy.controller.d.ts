import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/createVacancy.dto';
import { Request } from 'express';
import { FindAllQuery } from './query/findAll.query';
import { UpdateVacancyDto } from './dto/updateVacancy.dto';
export declare class VacancyController {
    private readonly vacancyService;
    constructor(vacancyService: VacancyService);
    create(createVacancyDto: CreateVacancyDto, req: Request): Promise<{
        title: string;
        description: string;
        price: string;
        city: string;
        graphic: import("./entities/vacancy.entity").Graphic[];
        duties: string[];
        requirements: string[];
        conditions: string[];
        company: import("../company/entities/company.entity").Company;
        profession: import("../profession/entities/profession.entity").Profession;
    } & import("./entities/vacancy.entity").Vacancy>;
    findAll(findAllQuery: FindAllQuery): Promise<import("./entities/vacancy.entity").Vacancy[]>;
    findOne(id: number): Promise<import("./entities/vacancy.entity").Vacancy>;
    update(id: number, updateVacancyDto: UpdateVacancyDto): Promise<import("./entities/vacancy.entity").Vacancy>;
    delete(id: number): Promise<import("./entities/vacancy.entity").Vacancy>;
}
