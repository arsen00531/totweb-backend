"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModule = void 0;
const common_1 = require("@nestjs/common");
const token_controller_1 = require("./token.controller");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const student_module_1 = require("../student/student.module");
const tokenUser_service_1 = require("./tokenUser.service");
const tokenCompany_service_1 = require("./tokenCompany.service");
const company_module_1 = require("../company/company.module");
const studentToken_entity_1 = require("./entities/studentToken.entity");
const companyToken_entity_1 = require("./entities/companyToken.entity");
let TokenModule = class TokenModule {
};
exports.TokenModule = TokenModule;
exports.TokenModule = TokenModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => student_module_1.StudentModule),
            (0, common_1.forwardRef)(() => company_module_1.CompanyModule),
            typeorm_1.TypeOrmModule.forFeature([studentToken_entity_1.StudentToken, companyToken_entity_1.CompanyToken]),
            jwt_1.JwtModule.register({
                global: true,
            }),
        ],
        providers: [tokenUser_service_1.TokenStudentService, tokenCompany_service_1.TokenCompanyService],
        controllers: [token_controller_1.TokenController],
        exports: [tokenUser_service_1.TokenStudentService, tokenCompany_service_1.TokenCompanyService],
    })
], TokenModule);
//# sourceMappingURL=token.module.js.map