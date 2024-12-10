import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { CompanyService } from 'src/company/company.service';
import { StudentService } from 'src/student/student.service';
import { VacancyService } from 'src/vacancy/vacancy.service';
export declare class NotificationService {
    private readonly notificationRepository;
    private readonly companyService;
    private readonly studentService;
    private readonly vacancyService;
    constructor(notificationRepository: Repository<Notification>, companyService: CompanyService, studentService: StudentService, vacancyService: VacancyService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        company: import("../company/entities/company.entity").Company;
        student: import("../student/entities/student.entity").Student;
        vacancy: import("../vacancy/entities/vacancy.entity").Vacancy;
    } & Notification>;
    findByCompany(companyId: number): Promise<Notification[]>;
}
