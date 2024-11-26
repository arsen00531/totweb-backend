import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Graphic, Vacancy } from './entities/vacancy.entity';
import { Repository } from 'typeorm';
import { CreateVacancyDto } from './dto/createVacancy.dto';
import { Request } from 'express';
import { ProfessionService } from 'src/profession/profession.service';
import { FindAllQuery } from './query/findAll.query';
import { CompanyService } from 'src/company/company.service';
import { TAccessCompanyPayload } from 'src/token/types/payload.type';
import { UpdateVacancyDto } from './dto/updateVacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepository: Repository<Vacancy>,
    private readonly companyService: CompanyService,
    private readonly professionService: ProfessionService,
  ) {}

  async create(createVacancyDto: CreateVacancyDto, req: Request) {
    const companyPayload: TAccessCompanyPayload = req['company'];

    if (!companyPayload) {
      throw new UnauthorizedException();
    }

    const company = await this.companyService.findOne(companyPayload.companyId);

    if (!company) {
      throw new UnauthorizedException('Company was not found');
    }

    const profession = await this.professionService.findOne(
      createVacancyDto.professionId,
    );

    if (!profession) {
      throw new BadRequestException('Profession was not found');
    }

    createVacancyDto.graphic.push(Graphic.ALL);

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

  async findAll(findAllQuery: FindAllQuery) {
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

  async findOne(id: number) {
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

  async update(id: number, updateVacancyDto: UpdateVacancyDto) {
    const vacancy = await this.vacancyRepository.findOneBy({ id })

    if (!vacancy) {
      throw new BadRequestException('Vacancy was not found')
    }

    Object.assign(vacancy, {
      ...updateVacancyDto
    })

    return this.vacancyRepository.save(vacancy)
  }

  async delete(id: number) {
    const vacancy = await this.vacancyRepository.findOneBy({ id })

    if (!vacancy) {
      throw new BadRequestException('Vacancy was not found')
    }

    return this.vacancyRepository.remove(vacancy)
  }
}
