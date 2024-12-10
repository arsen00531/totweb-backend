import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/createNotification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        company: import("../company/entities/company.entity").Company;
        student: import("src/student/entities/student.entity").Student;
        vacancy: import("../vacancy/entities/vacancy.entity").Vacancy;
    } & import("./entities/notification.entity").Notification>;
    findByCompany(companyId: number): Promise<import("./entities/notification.entity").Notification[]>;
}
