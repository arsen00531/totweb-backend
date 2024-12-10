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
exports.Student = exports.Role = void 0;
const experience_entity_1 = require("../../experience/entities/experience.entity");
const response_entity_1 = require("../../response/entities/response.entity");
const typeorm_1 = require("typeorm");
var Role;
(function (Role) {
    Role["Student"] = "student";
    Role["Company"] = "company";
    Role["Admin"] = "admin";
})(Role || (exports.Role = Role = {}));
let Student = class Student {
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Student.prototype, "university", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], Student.prototype, "lastYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Student.prototype, "contactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Student.prototype, "contactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, default: [] }),
    __metadata("design:type", Array)
], Student.prototype, "keySkills", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, default: [] }),
    __metadata("design:type", Array)
], Student.prototype, "preferredFields", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { array: true, default: [] }),
    __metadata("design:type", Array)
], Student.prototype, "locationPreferences", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Student.prototype, "activateLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Student.prototype, "isActivated", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: Role, array: true, default: [Role.Student] }),
    __metadata("design:type", Array)
], Student.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Student.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Student.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], Student.prototype, "profession", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToMany)(() => response_entity_1.Response, (response) => response.student),
    __metadata("design:type", Array)
], Student.prototype, "responses", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToMany)(() => experience_entity_1.Experience, (experience) => experience.student),
    __metadata("design:type", Array)
], Student.prototype, "experiences", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)('student')
], Student);
//# sourceMappingURL=student.entity.js.map