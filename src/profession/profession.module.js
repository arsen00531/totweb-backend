"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionModule = void 0;
const common_1 = require("@nestjs/common");
const profession_controller_1 = require("./profession.controller");
const profession_service_1 = require("./profession.service");
const typeorm_1 = require("@nestjs/typeorm");
const profession_entity_1 = require("./entities/profession.entity");
const token_module_1 = require("../token/token.module");
const company_module_1 = require("../company/company.module");
let ProfessionModule = class ProfessionModule {
};
exports.ProfessionModule = ProfessionModule;
exports.ProfessionModule = ProfessionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([profession_entity_1.Profession]), token_module_1.TokenModule, company_module_1.CompanyModule],
        controllers: [profession_controller_1.ProfessionController],
        providers: [profession_service_1.ProfessionService],
        exports: [profession_service_1.ProfessionService],
    })
], ProfessionModule);
//# sourceMappingURL=profession.module.js.map