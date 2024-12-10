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
exports.ExperienceController = void 0;
const common_1 = require("@nestjs/common");
const experience_service_1 = require("./experience.service");
let ExperienceController = class ExperienceController {
    constructor(experienceService) {
        this.experienceService = experienceService;
    }
    create() { }
};
exports.ExperienceController = ExperienceController;
exports.ExperienceController = ExperienceController = __decorate([
    (0, common_1.Controller)('experience'),
    __metadata("design:paramtypes", [experience_service_1.ExperienceService])
], ExperienceController);
//# sourceMappingURL=experience.controller.js.map