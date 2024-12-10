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
exports.ResponseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const response_entity_1 = require("./entities/response.entity");
const typeorm_2 = require("typeorm");
const student_service_1 = require("../student/student.service");
const vacancy_service_1 = require("../vacancy/vacancy.service");
let ResponseService = class ResponseService {
    constructor(responseRepository, studentService, vacancyService) {
        this.responseRepository = responseRepository;
        this.studentService = studentService;
        this.vacancyService = vacancyService;
    }
    async create(createResponseDto) {
        const student = await this.studentService.findOne(createResponseDto.studentId);
        const vacancy = await this.vacancyService.findOne(createResponseDto.vacancyId);
        if (!student) {
            throw new common_1.BadRequestException('student was not found');
        }
        if (!vacancy) {
            throw new common_1.BadRequestException('vacancy was not found');
        }
        return this.responseRepository.save({
            student,
            vacancy,
        });
    }
    async getCompanyResponses(companyId) {
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
    async getVacancyResponses(vacancyId) {
        return this.responseRepository.find({
            where: {
                vacancy: {
                    id: vacancyId,
                },
            },
            relations: { vacancy: true },
        });
    }
    async getStudentResponses(studentId) {
        return this.responseRepository.find({
            where: {
                student: {
                    id: studentId,
                },
            },
            relations: { vacancy: true },
        });
    }
};
exports.ResponseService = ResponseService;
exports.ResponseService = ResponseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(response_entity_1.Response)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        student_service_1.StudentService,
        vacancy_service_1.VacancyService])
], ResponseService);
//# sourceMappingURL=response.service.js.map