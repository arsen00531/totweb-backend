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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const createCompany_dto_1 = require("./dto/createCompany.dto");
const login_dto_1 = require("../email/dto/login.dto");
const updateCompany_dto_1 = require("./dto/updateCompany.dto");
const role_decorator_1 = require("../student/decorators/role.decorator");
const student_entity_1 = require("../student/entities/student.entity");
const companyAuth_guard_1 = require("./guards/companyAuth.guard");
const companyRole_guard_1 = require("./guards/companyRole.guard");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    registration(createCompanyDto) {
        return this.companyService.registration(createCompanyDto);
    }
    login(loginDto, req, res) {
        return this.companyService.login(loginDto, req, res);
    }
    logout(req, res) {
        return this.companyService.logout(req, res);
    }
    refresh(req, res) {
        return this.companyService.refresh(req, res);
    }
    activate(link, res) {
        return this.companyService.activate(link, res);
    }
    update(updateCompanyDto, id) {
        return this.companyService.update(updateCompanyDto, id);
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCompany_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "registration", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginCompanyDto, Object, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('activate'),
    __param(0, (0, common_1.Query)('link')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "activate", null);
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Company),
    (0, common_1.UseGuards)(companyAuth_guard_1.CompanyAuthGuard, companyRole_guard_1.CompanyRoleGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateCompany_dto_1.UpdateCompanyDto, Number]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "update", null);
exports.CompanyController = CompanyController = __decorate([
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map