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
exports.Notification = void 0;
const company_entity_1 = require("../../company/entities/company.entity");
const student_entity_1 = require("../../student/entities/student.entity");
const vacancy_entity_1 = require("../../vacancy/entities/vacancy.entity");
const typeorm_1 = require("typeorm");
let Notification = class Notification {
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company),
    __metadata("design:type", company_entity_1.Company)
], Notification.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student),
    __metadata("design:type", student_entity_1.Student)
], Notification.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vacancy_entity_1.Vacancy),
    __metadata("design:type", vacancy_entity_1.Vacancy)
], Notification.prototype, "vacancy", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)()
], Notification);
//# sourceMappingURL=notification.entity.js.map