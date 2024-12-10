"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModule = void 0;
const common_1 = require("@nestjs/common");
const response_controller_1 = require("./response.controller");
const response_service_1 = require("./response.service");
const typeorm_1 = require("@nestjs/typeorm");
const response_entity_1 = require("./entities/response.entity");
const student_module_1 = require("../student/student.module");
const token_module_1 = require("../token/token.module");
const vacancy_module_1 = require("../vacancy/vacancy.module");
const company_module_1 = require("../company/company.module");
let ResponseModule = class ResponseModule {
};
exports.ResponseModule = ResponseModule;
exports.ResponseModule = ResponseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([response_entity_1.Response]),
            student_module_1.StudentModule,
            token_module_1.TokenModule,
            vacancy_module_1.VacancyModule,
            company_module_1.CompanyModule,
        ],
        controllers: [response_controller_1.ResponseController],
        providers: [response_service_1.ResponseService],
    })
], ResponseModule);
//# sourceMappingURL=response.module.js.map