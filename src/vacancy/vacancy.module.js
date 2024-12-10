"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacancyModule = void 0;
const common_1 = require("@nestjs/common");
const vacancy_controller_1 = require("./vacancy.controller");
const vacancy_service_1 = require("./vacancy.service");
const typeorm_1 = require("@nestjs/typeorm");
const vacancy_entity_1 = require("./entities/vacancy.entity");
const token_module_1 = require("../token/token.module");
const profession_module_1 = require("../profession/profession.module");
const company_module_1 = require("../company/company.module");
let VacancyModule = class VacancyModule {
};
exports.VacancyModule = VacancyModule;
exports.VacancyModule = VacancyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([vacancy_entity_1.Vacancy]),
            token_module_1.TokenModule,
            company_module_1.CompanyModule,
            profession_module_1.ProfessionModule,
        ],
        controllers: [vacancy_controller_1.VacancyController],
        providers: [vacancy_service_1.VacancyService],
        exports: [vacancy_service_1.VacancyService],
    })
], VacancyModule);
//# sourceMappingURL=vacancy.module.js.map