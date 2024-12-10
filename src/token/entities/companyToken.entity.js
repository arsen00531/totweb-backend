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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyToken = void 0;
const company_entity_1 = require("../../company/entities/company.entity");
const typeorm_1 = require("typeorm");
let CompanyToken = class CompanyToken {
};
exports.CompanyToken = CompanyToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CompanyToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CompanyToken.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], CompanyToken.prototype, "browser", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.companyTokens, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", company_entity_1.Company)
], CompanyToken.prototype, "company", void 0);
exports.CompanyToken = CompanyToken = __decorate([
    (0, typeorm_1.Entity)()
], CompanyToken);
//# sourceMappingURL=companyToken.entity.js.map