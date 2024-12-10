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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const createNotification_dto_1 = require("./dto/createNotification.dto");
const role_decorator_1 = require("../student/decorators/role.decorator");
const student_entity_1 = require("../student/entities/student.entity");
const studentAuth_guard_1 = require("../student/guards/studentAuth.guard");
const studentRole_guard_1 = require("../student/guards/studentRole.guard");
const companyAuth_guard_1 = require("../company/guards/companyAuth.guard");
const companyRole_guard_1 = require("../company/guards/companyRole.guard");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    create(createNotificationDto) {
        return this.notificationService.create(createNotificationDto);
    }
    findByCompany(companyId) {
        return this.notificationService.findByCompany(companyId);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, role_decorator_1.Roles)(student_entity_1.Role.Student),
    (0, common_1.UseGuards)(studentAuth_guard_1.StudentAuthGuard, studentRole_guard_1.StudentRoleGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createNotification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Company),
    (0, common_1.UseGuards)(companyAuth_guard_1.CompanyAuthGuard, companyRole_guard_1.CompanyRoleGuard),
    (0, common_1.Get)('findByCompany'),
    __param(0, (0, common_1.Query)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findByCompany", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map