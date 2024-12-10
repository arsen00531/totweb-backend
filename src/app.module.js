"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const student_module_1 = require("./student/student.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./student/entities/student.entity");
const token_module_1 = require("./token/token.module");
const email_module_1 = require("./email/email.module");
const vacancy_module_1 = require("./vacancy/vacancy.module");
const company_module_1 = require("./company/company.module");
const vacancy_entity_1 = require("./vacancy/entities/vacancy.entity");
const company_entity_1 = require("./company/entities/company.entity");
const profession_module_1 = require("./profession/profession.module");
const profession_entity_1 = require("./profession/entities/profession.entity");
const studentToken_entity_1 = require("./token/entities/studentToken.entity");
const companyToken_entity_1 = require("./token/entities/companyToken.entity");
const notification_module_1 = require("./notification/notification.module");
const response_module_1 = require("./response/response.module");
const notification_entity_1 = require("./notification/entities/notification.entity");
const response_entity_1 = require("./response/entities/response.entity");
const file_module_1 = require("./file/file.module");
const nestjs_form_data_1 = require("nestjs-form-data");
const experience_module_1 = require("./experience/experience.module");
const experience_entity_1 = require("./experience/entities/experience.entity");
const ENV = process.env.NODE_ENV;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            student_module_1.StudentModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [`.env.${ENV}`, ENV === 'development' ? '.env' : ''],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    url: configService.getOrThrow('TYPEORM_URL'),
                    synchronize: true ? ENV === 'development' : false,
                    entities: [
                        student_entity_1.Student,
                        studentToken_entity_1.StudentToken,
                        companyToken_entity_1.CompanyToken,
                        vacancy_entity_1.Vacancy,
                        company_entity_1.Company,
                        profession_entity_1.Profession,
                        notification_entity_1.Notification,
                        response_entity_1.Response,
                        experience_entity_1.Experience,
                    ],
                }),
            }),
            nestjs_form_data_1.NestjsFormDataModule.config({ isGlobal: true }),
            token_module_1.TokenModule,
            email_module_1.EmailModule,
            vacancy_module_1.VacancyModule,
            company_module_1.CompanyModule,
            profession_module_1.ProfessionModule,
            notification_module_1.NotificationModule,
            response_module_1.ResponseModule,
            file_module_1.FileModule,
            experience_module_1.ExperienceModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map