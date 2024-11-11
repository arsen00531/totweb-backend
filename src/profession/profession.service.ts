import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profession } from './entities/profession.entity';
import { Repository } from 'typeorm';
import { CreateProfessionDto } from './dto/createProfession.dto';

@Injectable()
export class ProfessionService {
  constructor(
    @InjectRepository(Profession)
    private readonly professionRepository: Repository<Profession>,
  ) {}

  async create(createProfessionDto: CreateProfessionDto) {
    const candidate = await this.professionRepository.findOneBy({
      name: createProfessionDto.name,
    });

    if (candidate) {
      throw new BadRequestException('Profession already exists');
    }

    return this.professionRepository.save(createProfessionDto);
  }

  async findAll() {
    return this.professionRepository.find();
  }

  async findOne(id: number) {
    return this.professionRepository.findOneBy({ id });
  }
}
