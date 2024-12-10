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
exports.ProfessionController = void 0;
const common_1 = require("@nestjs/common");
const profession_service_1 = require("./profession.service");
const createProfession_dto_1 = require("./dto/createProfession.dto");
const role_decorator_1 = require("../student/decorators/role.decorator");
const student_entity_1 = require("../student/entities/student.entity");
const companyAuth_guard_1 = require("../company/guards/companyAuth.guard");
const companyRole_guard_1 = require("../company/guards/companyRole.guard");
let ProfessionController = class ProfessionController {
    constructor(professionService) {
        this.professionService = professionService;
    }
    create(createProfessionDto) {
        return this.professionService.create(createProfessionDto);
    }
    findAll() {
        return this.professionService.findAll();
    }
};
exports.ProfessionController = ProfessionController;
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Admin),
    (0, common_1.UseGuards)(companyAuth_guard_1.CompanyAuthGuard, companyRole_guard_1.CompanyRoleGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createProfession_dto_1.CreateProfessionDto]),
    __metadata("design:returntype", void 0)
], ProfessionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfessionController.prototype, "findAll", null);
exports.ProfessionController = ProfessionController = __decorate([
    (0, common_1.Controller)('profession'),
    __metadata("design:paramtypes", [profession_service_1.ProfessionService])
], ProfessionController);
//# sourceMappingURL=profession.controller.js.map