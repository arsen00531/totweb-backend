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
exports.Company = void 0;
const companyToken_entity_1 = require("../../token/entities/companyToken.entity");
const vacancy_entity_1 = require("../../vacancy/entities/vacancy.entity");
const typeorm_1 = require("typeorm");
var Role;
(function (Role) {
    Role["Student"] = "student";
    Role["Company"] = "company";
    Role["Admin"] = "admin";
})(Role || (Role = {}));
let Company = class Company {
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "contactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Company.prototype, "industry", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Company.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Company.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, default: [] }),
    __metadata("design:type", Array)
], Company.prototype, "aboutUs", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Company.prototype, "contactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Company.prototype, "contactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Company.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Company.prototype, "social", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, default: [] }),
    __metadata("design:type", Array)
], Company.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, default: [] }),
    __metadata("design:type", Array)
], Company.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Company.prototype, "activateLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Company.prototype, "isActivated", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: Role, array: true, default: [Role.Company] }),
    __metadata("design:type", Array)
], Company.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => companyToken_entity_1.CompanyToken, (companyToken) => companyToken.company, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Company.prototype, "companyTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vacancy_entity_1.Vacancy, (vacancy) => vacancy.company, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Company.prototype, "vacancies", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)()
], Company);
//# sourceMappingURL=company.entity.js.map