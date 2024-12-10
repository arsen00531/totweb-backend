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
exports.Vacancy = exports.Graphic = void 0;
const company_entity_1 = require("../../company/entities/company.entity");
const profession_entity_1 = require("../../profession/entities/profession.entity");
const response_entity_1 = require("../../response/entities/response.entity");
const typeorm_1 = require("typeorm");
var Graphic;
(function (Graphic) {
    Graphic["ALL"] = "all";
    Graphic["GRAPHIC_FULLDAY"] = "graphicFullDay";
    Graphic["GRAPHIC_CHANGE"] = "graphicChange";
    Graphic["GRAPHIC_ELASTIC"] = "graphicElastic";
    Graphic["GRAPHIC_HOME"] = "graphicHome";
})(Graphic || (exports.Graphic = Graphic = {}));
let Vacancy = class Vacancy {
};
exports.Vacancy = Vacancy;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Vacancy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vacancy.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vacancy.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vacancy.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vacancy.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: Graphic, array: true, default: [Graphic.ALL] }),
    __metadata("design:type", Array)
], Vacancy.prototype, "graphic", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true }),
    __metadata("design:type", Array)
], Vacancy.prototype, "duties", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true }),
    __metadata("design:type", Array)
], Vacancy.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true }),
    __metadata("design:type", Array)
], Vacancy.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Vacancy.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.vacancies, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", company_entity_1.Company)
], Vacancy.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profession_entity_1.Profession, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", profession_entity_1.Profession)
], Vacancy.prototype, "profession", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToMany)(() => response_entity_1.Response, (response) => response.vacancy),
    __metadata("design:type", Array)
], Vacancy.prototype, "responses", void 0);
exports.Vacancy = Vacancy = __decorate([
    (0, typeorm_1.Entity)()
], Vacancy);
//# sourceMappingURL=vacancy.entity.js.map