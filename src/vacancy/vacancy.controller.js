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
exports.VacancyController = void 0;
const common_1 = require("@nestjs/common");
const vacancy_service_1 = require("./vacancy.service");
const createVacancy_dto_1 = require("./dto/createVacancy.dto");
const role_decorator_1 = require("../student/decorators/role.decorator");
const student_entity_1 = require("../student/entities/student.entity");
const findAll_query_1 = require("./query/findAll.query");
const companyAuth_guard_1 = require("../company/guards/companyAuth.guard");
const companyRole_guard_1 = require("../company/guards/companyRole.guard");
const updateVacancy_dto_1 = require("./dto/updateVacancy.dto");
let VacancyController = class VacancyController {
    constructor(vacancyService) {
        this.vacancyService = vacancyService;
    }
    create(createVacancyDto, req) {
        return this.vacancyService.create(createVacancyDto, req);
    }
    findAll(findAllQuery) {
        return this.vacancyService.findAll(findAllQuery);
    }
    findOne(id) {
        return this.vacancyService.findOne(id);
    }
    update(id, updateVacancyDto) {
        return this.vacancyService.update(id, updateVacancyDto);
    }
    delete(id) {
        return this.vacancyService.delete(id);
    }
};
exports.VacancyController = VacancyController;
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Company),
    (0, common_1.UseGuards)(companyAuth_guard_1.CompanyAuthGuard, companyRole_guard_1.CompanyRoleGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createVacancy_dto_1.CreateVacancyDto, Object]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "create", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)('findAll'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_query_1.FindAllQuery]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findOne'),
    __param(0, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateVacancy_dto_1.UpdateVacancyDto]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "delete", null);
exports.VacancyController = VacancyController = __decorate([
    (0, common_1.Controller)('vacancy'),
    __metadata("design:paramtypes", [vacancy_service_1.VacancyService])
], VacancyController);
//# sourceMappingURL=vacancy.controller.js.map