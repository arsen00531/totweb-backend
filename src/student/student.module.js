"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const student_controller_1 = require("./student.controller");
const student_service_1 = require("./student.service");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./entities/student.entity");
const token_module_1 = require("../token/token.module");
const email_module_1 = require("../email/email.module");
const company_module_1 = require("../company/company.module");
const studentAuth_guard_1 = require("./guards/studentAuth.guard");
const studentRole_guard_1 = require("./guards/studentRole.guard");
const file_module_1 = require("../file/file.module");
const profession_module_1 = require("../profession/profession.module");
const experience_module_1 = require("../experience/experience.module");
let StudentModule = class StudentModule {
};
exports.StudentModule = StudentModule;
exports.StudentModule = StudentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            typeorm_1.TypeOrmModule.forFeature([student_entity_1.Student]),
            email_module_1.EmailModule,
            company_module_1.CompanyModule,
            file_module_1.FileModule,
            profession_module_1.ProfessionModule,
            experience_module_1.ExperienceModule,
        ],
        controllers: [student_controller_1.StudentController],
        providers: [student_service_1.StudentService, studentAuth_guard_1.StudentAuthGuard, studentRole_guard_1.StudentRoleGuard],
        exports: [student_service_1.StudentService, studentAuth_guard_1.StudentAuthGuard, studentRole_guard_1.StudentRoleGuard],
    })
], StudentModule);
//# sourceMappingURL=student.module.js.map