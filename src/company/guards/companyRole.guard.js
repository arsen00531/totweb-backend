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
exports.CompanyRoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_decorator_1 = require("../../student/decorators/role.decorator");
const company_service_1 = require("../company.service");
let CompanyRoleGuard = class CompanyRoleGuard {
    constructor(reflector, companyService) {
        this.reflector = reflector;
        this.companyService = companyService;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const companyPayload = request['company'];
        const company = await this.companyService.findOne(companyPayload.companyId);
        if (!company) {
            throw new common_1.UnauthorizedException('wrong role');
        }
        return requiredRoles.some((role) => company.roles.includes(role));
    }
};
exports.CompanyRoleGuard = CompanyRoleGuard;
exports.CompanyRoleGuard = CompanyRoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        company_service_1.CompanyService])
], CompanyRoleGuard);
//# sourceMappingURL=companyRole.guard.js.map