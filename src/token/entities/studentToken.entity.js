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
exports.StudentToken = void 0;
const student_entity_1 = require("../../student/entities/student.entity");
const typeorm_1 = require("typeorm");
let StudentToken = class StudentToken {
};
exports.StudentToken = StudentToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StudentToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentToken.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], StudentToken.prototype, "browser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => student_entity_1.Student, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", student_entity_1.Student)
], StudentToken.prototype, "student", void 0);
exports.StudentToken = StudentToken = __decorate([
    (0, typeorm_1.Entity)()
], StudentToken);
//# sourceMappingURL=studentToken.entity.js.map