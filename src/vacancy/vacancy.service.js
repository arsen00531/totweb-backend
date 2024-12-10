"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacancyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vacancy_entity_1 = require("./entities/vacancy.entity");
const typeorm_2 = require("typeorm");
const profession_service_1 = require("../profession/profession.service");
const company_service_1 = require("../company/company.service");
let VacancyService = class VacancyService {
    constructor(vacancyRepository, companyService, professionService) {
        this.vacancyRepository = vacancyRepository;
        this.companyService = companyService;
        this.professionService = professionService;
    }
    async create(createVacancyDto, req) {
        const companyPayload = req['company'];
        if (!companyPayload) {
            throw new common_1.UnauthorizedException();
        }
        const company = await this.companyService.findOne(companyPayload.companyId);
        if (!company) {
            throw new common_1.UnauthorizedException('Company was not found');
        }
        const profession = await this.professionService.findOne(createVacancyDto.professionId);
        if (!profession) {
            throw new common_1.BadRequestException('Profession was not found');
        }
        createVacancyDto.graphic.push(vacancy_entity_1.Graphic.ALL);
        return this.vacancyRepository.save({
            title: createVacancyDto.title,
            description: createVacancyDto.description,
            price: createVacancyDto?.price,
            city: createVacancyDto.city,
            graphic: createVacancyDto.graphic,
            duties: createVacancyDto.duties,
            requirements: createVacancyDto.requirements,
            conditions: createVacancyDto.conditions,
            company: company,
            profession: profession,
        });
    }
    async findAll(findAllQuery) {
        const { limit, page, search, city, graphic, professionIds } = findAllQuery;
        const queryBuilder = this.vacancyRepository
            .createQueryBuilder('vacancy')
            .leftJoinAndSelect('vacancy.profession', 'profession')
            .leftJoinAndSelect('vacancy.company', 'company');
        if (search) {
            queryBuilder.andWhere('LOWER(vacancy.title) LIKE :search', {
                search: `%${search.toLowerCase()}%`,
            });
        }
        if (city) {
            queryBuilder.andWhere('LOWER(vacancy.city) LIKE :city', {
                city: `%${city.toLowerCase()}%`,
            });
        }
        if (graphic) {
            queryBuilder.andWhere('vacancy.graphic && :graphic', { graphic });
        }
        if (professionIds) {
            queryBuilder.andWhere('profession.id IN (:...professionIds)', {
                professionIds,
            });
        }
        const vacancies = await queryBuilder
            .orderBy('vacancy.id', 'DESC')
            .take(limit || 0)
            .skip((page - 1) * limit || 0)
            .getMany();
        return vacancies;
    }
    async findOne(id) {
        return this.vacancyRepository.findOne({
            where: {
                id,
            },
            relations: {
                company: true,
                profession: true
            },
        });
    }
    async update(id, updateVacancyDto) {
        const vacancy = await this.vacancyRepository.findOneBy({ id });
        if (!vacancy) {
            throw new common_1.BadRequestException('Vacancy was not found');
        }
        Object.assign(vacancy, {
            ...updateVacancyDto
        });
        return this.vacancyRepository.save(vacancy);
    }
    async delete(id) {
        const vacancy = await this.vacancyRepository.findOneBy({ id });
        if (!vacancy) {
            throw new common_1.BadRequestException('Vacancy was not found');
        }
        return this.vacancyRepository.remove(vacancy);
    }
};
exports.VacancyService = VacancyService;
exports.VacancyService = VacancyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vacancy_entity_1.Vacancy)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        company_service_1.CompanyService,
        profession_service_1.ProfessionService])
], VacancyService);
//# sourceMappingURL=vacancy.service.js.map