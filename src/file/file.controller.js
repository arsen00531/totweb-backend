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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("./file.service");
const role_decorator_1 = require("../student/decorators/role.decorator");
const student_entity_1 = require("../student/entities/student.entity");
const studentAuth_guard_1 = require("../student/guards/studentAuth.guard");
const studentRole_guard_1 = require("../student/guards/studentRole.guard");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    getFile(path) {
        return this.fileService.getFile(path);
    }
};
exports.FileController = FileController;
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Student),
    (0, common_1.UseGuards)(studentAuth_guard_1.StudentAuthGuard, studentRole_guard_1.StudentRoleGuard),
    (0, common_1.Get)('getFile'),
    __param(0, (0, common_1.Query)('path')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "getFile", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
//# sourceMappingURL=file.controller.js.map