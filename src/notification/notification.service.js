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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const typeorm_2 = require("typeorm");
const company_service_1 = require("../company/company.service");
const student_service_1 = require("../student/student.service");
const vacancy_service_1 = require("../vacancy/vacancy.service");
let NotificationService = class NotificationService {
    constructor(notificationRepository, companyService, studentService, vacancyService) {
        this.notificationRepository = notificationRepository;
        this.companyService = companyService;
        this.studentService = studentService;
        this.vacancyService = vacancyService;
    }
    async create(createNotificationDto) {
        const company = await this.companyService.findOne(createNotificationDto.companyId);
        if (!company) {
            throw new common_1.BadRequestException('Company was not found');
        }
        const student = await this.studentService.findOne(createNotificationDto.studentId);
        if (!student) {
            throw new common_1.BadRequestException('Student was not found');
        }
        const vacancy = await this.vacancyService.findOne(createNotificationDto.vacancyId);
        if (!vacancy) {
            throw new common_1.BadRequestException('Vacancy was not found');
        }
        return this.notificationRepository.save({
            company,
            student,
            vacancy,
        });
    }
    async findByCompany(companyId) {
        return this.notificationRepository.find({
            where: {
                company: {
                    id: companyId,
                },
            },
            relations: { student: true, vacancy: true },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        company_service_1.CompanyService,
        student_service_1.StudentService,
        vacancy_service_1.VacancyService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map