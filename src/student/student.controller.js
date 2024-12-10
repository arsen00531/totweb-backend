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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const createStudent_dto_1 = require("./dto/createStudent.dto");
const login_dto_1 = require("./dto/login.dto");
const updateStudent_dto_1 = require("./dto/updateStudent.dto");
const nestjs_form_data_1 = require("nestjs-form-data");
const updateStudentFile_dto_1 = require("./dto/updateStudentFile.dto");
const role_decorator_1 = require("./decorators/role.decorator");
const student_entity_1 = require("./entities/student.entity");
const studentAuth_guard_1 = require("./guards/studentAuth.guard");
const studentRole_guard_1 = require("./guards/studentRole.guard");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    create(createUserDto) {
        return this.studentService.create(createUserDto);
    }
    login(loginDto, req, res) {
        return this.studentService.login(loginDto, req, res);
    }
    logout(req, res) {
        return this.studentService.logout(req, res);
    }
    refresh(req, res) {
        return this.studentService.refresh(req, res);
    }
    activate(link, response) {
        return this.studentService.activate(link, response);
    }
    findAll() {
        return this.studentService.findAll();
    }
    findOne(studentId) {
        return this.studentService.findOne(studentId);
    }
    update(updateStudentDto, id) {
        return this.studentService.update(updateStudentDto, id);
    }
    updateFile(updateStudentDto, id) {
        return this.studentService.updateFile(updateStudentDto, id);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Post)('registration'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createStudent_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginStudentDto, Object, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('activate'),
    __param(0, (0, common_1.Query)('link')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "activate", null);
__decorate([
    (0, common_1.Get)('findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findOne'),
    __param(0, (0, common_1.Query)('studentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "findOne", null);
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Student),
    (0, common_1.UseGuards)(studentAuth_guard_1.StudentAuthGuard, studentRole_guard_1.StudentRoleGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, nestjs_form_data_1.FormDataRequest)(),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateStudent_dto_1.UpdateStudentDto, Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "update", null);
__decorate([
    (0, role_decorator_1.Roles)(student_entity_1.Role.Student),
    (0, common_1.UseGuards)(studentAuth_guard_1.StudentAuthGuard, studentRole_guard_1.StudentRoleGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, nestjs_form_data_1.FormDataRequest)(),
    (0, common_1.Put)('updateFile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateStudentFile_dto_1.UpdateStudentFileDto, Number]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "updateFile", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.Controller)('student'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map