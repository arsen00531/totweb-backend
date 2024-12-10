import { Graphic, Vacancy } from './entities/vacancy.entity';
import { Repository } from 'typeorm';
import { CreateVacancyDto } from './dto/createVacancy.dto';
import { Request } from 'express';
import { ProfessionService } from 'src/profession/profession.service';
import { FindAllQuery } from './query/findAll.query';
import { CompanyService } from 'src/company/company.service';
import { UpdateVacancyDto } from './dto/updateVacancy.dto';
export declare class VacancyService {
    private readonly vacancyRepository;
    private readonly companyService;
    private readonly professionService;
    constructor(vacancyRepository: Repository<Vacancy>, companyService: CompanyService, professionService: ProfessionService);
    create(createVacancyDto: CreateVacancyDto, req: Request): Promise<{
        title: string;
        description: string;
        price: string;
        city: string;
        graphic: Graphic[];
        duties: string[];
        requirements: string[];
        conditions: string[];
        company: import("../company/entities/company.entity").Company;
        profession: import("../profession/entities/profession.entity").Profession;
    } & Vacancy>;
    findAll(findAllQuery: FindAllQuery): Promise<Vacancy[]>;
    findOne(id: number): Promise<Vacancy>;
    update(id: number, updateVacancyDto: UpdateVacancyDto): Promise<Vacancy>;
    delete(id: number): Promise<Vacancy>;
}
