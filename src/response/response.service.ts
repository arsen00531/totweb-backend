import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './dto/createResponse.dto';
import { StudentService } from 'src/student/student.service';
import { VacancyService } from 'src/vacancy/vacancy.service';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
    private readonly studentService: StudentService,
    private readonly vacancyService: VacancyService,
  ) {}

  async create(createResponseDto: CreateResponseDto) {
    const student = await this.studentService.findOne(
      createResponseDto.studentId,
    );
    const vacancy = await this.vacancyService.findOne(
      createResponseDto.vacancyId,
    );

    if (!student) {
      throw new BadRequestException('student was not found');
    }

    if (!vacancy) {
      throw new BadRequestException('vacancy was not found');
    }

    return this.responseRepository.save({
      student,
      vacancy,
    });
  }

  async getCompanyResponses(companyId: number) {
    return this.responseRepository.find({
      where: {
        vacancy: {
          company: {
            id: companyId,
          },
        },
      },
      relations: { vacancy: true },
    });
  }

  async getVacancyResponses(vacancyId: number) {
    return this.responseRepository.find({
      where: {
        vacancy: {
          id: vacancyId,
        },
      },
      relations: { vacancy: true },
    });
  }

  async getStudentResponses(studentId: number) {
    return this.responseRepository.find({
      where: {
        student: {
          id: studentId,
        },
      },
      relations: { vacancy: true },
    });
  }
}
