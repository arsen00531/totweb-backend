import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { CompanyService } from 'src/company/company.service';
import { StudentService } from 'src/student/student.service';
import { VacancyService } from 'src/vacancy/vacancy.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly companyService: CompanyService,
    private readonly studentService: StudentService,
    private readonly vacancyService: VacancyService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const company = await this.companyService.findOne(
      createNotificationDto.companyId,
    );

    if (!company) {
      throw new BadRequestException('Company was not found');
    }

    const student = await this.studentService.findOne(
      createNotificationDto.studentId,
    );

    if (!student) {
      throw new BadRequestException('Student was not found');
    }

    const vacancy = await this.vacancyService.findOne(
      createNotificationDto.vacancyId,
    );

    if (!vacancy) {
      throw new BadRequestException('Vacancy was not found');
    }

    return this.notificationRepository.save({
      company,
      student,
      vacancy,
    });
  }

  async findByCompany(companyId: number) {
    return this.notificationRepository.find({
      where: {
        company: {
          id: companyId,
        },
      },
      relations: { student: true, vacancy: true },
    });
  }
}
