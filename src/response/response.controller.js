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
exports.ResponseController = void 0;
const common_1 = require("@nestjs/common");
const response_service_1 = require("./response.service");
const student_entity_1 = require("../student/entities/student.entity");
const role_decorator_1 = require("../student/decorators/role.decorator");
const createResponse_dto_1 = require("./dto/createResponse.dto");
const studentAuth_guard_1 = require("../student/guards/studentAuth.guard");
const studentRole_guard_1 = require("../student/guards/studentRole.guard");
const companyAuth_guard_1 = require("../company/guards/companyAuth.guard");
const companyRole_guard_1 = require("../company/guards/companyRole.guard");
let ResponseController = class ResponseController {
    constructor(responseService) {
        this.responseService = responseService;
    }
    create(createResponseDto) {
        return this.responseService.create(createResponseDto);
    }
    getCompanyResponses(companyId) {
        return this.responseService.getCompanyResponses(companyId);
    }
    getVacancyResponses(vacancyId) {
        return this.responseService.getVacancyResponses(vacancyId);
    }
    getStudentResponses(studentId) {
        return this.responseService.getStudentResponses(studentId);
    }
};
exports.ResponseController = ResponseController;
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Student),
    (0, common_1.UseGuards)(studentAuth_guard_1.StudentAuthGuard, studentRole_guard_1.StudentRoleGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createResponse_dto_1.CreateResponseDto]),
    __metadata("design:returntype", void 0)
], ResponseController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Company),
    (0, common_1.UseGuards)(companyAuth_guard_1.CompanyAuthGuard, companyRole_guard_1.CompanyRoleGuard),
    (0, common_1.Get)('findAllCompany'),
    __param(0, (0, common_1.Query)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ResponseController.prototype, "getCompanyResponses", null);
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Company),
    (0, common_1.UseGuards)(companyAuth_guard_1.CompanyAuthGuard, companyRole_guard_1.CompanyRoleGuard),
    (0, common_1.Get)('findAllVacancy'),
    __param(0, (0, common_1.Query)('vacancyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ResponseController.prototype, "getVacancyResponses", null);
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Student),
    (0, common_1.UseGuards)(studentAuth_guard_1.StudentAuthGuard, studentRole_guard_1.StudentRoleGuard),
    (0, common_1.Get)('findAllStudent'),
    __param(0, (0, common_1.Query)('studentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ResponseController.prototype, "getStudentResponses", null);
exports.ResponseController = ResponseController = __decorate([
    (0, common_1.Controller)('response'),
    __metadata("design:paramtypes", [response_service_1.ResponseService])
], ResponseController);
//# sourceMappingURL=response.controller.js.map