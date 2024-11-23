import { Injectable } from '@nestjs/common';
import { Experience } from './entities/experience.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AddExperienceDto } from './dto/addExperience.dto';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async add(addExperienceDtos: AddExperienceDto[], student: Student) {
    try {
      addExperienceDtos.forEach(async (addExperienceDto) => {
        await this.experienceRepository.save({
          ...addExperienceDto,
          student: student,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(experienceIds: number[]) {
    const experiences = await this.experienceRepository.find({
      where: {
        id: In(experienceIds),
      },
    });
    return this.experienceRepository.remove(experiences);
  }
}
