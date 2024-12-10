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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCompanyService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const company_service_1 = require("../company/company.service");
const companyToken_entity_1 = require("./entities/companyToken.entity");
let TokenCompanyService = class TokenCompanyService {
    constructor(jwtService, tokenRepository, companyService, configService) {
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.companyService = companyService;
        this.configService = configService;
    }
    async saveTokenLogin(company, clientAgent) {
        const tokenDB = await this.tokenRepository.findOneBy({
            browser: clientAgent,
            company: { id: company.id },
        });
        if (!tokenDB) {
            const token = await this.createToken(company, clientAgent);
            return token;
        }
        const refreshPayload = {
            clientAgent: clientAgent,
            companyId: company.id,
            email: company.email,
            role: company.roles,
        };
        tokenDB.refreshToken = await this.generateRefreshToken(refreshPayload);
        return tokenDB;
    }
    async saveTokenRefresh(companyId, refreshToken, clientAgent) {
        const company = await this.companyService.findOne(companyId);
        if (!company) {
            throw new common_1.BadRequestException('User was not found');
        }
        const tokenDB = await this.tokenRepository.findOneBy({
            browser: clientAgent,
        });
        if (!tokenDB) {
            await this.createToken(company, clientAgent);
            return tokenDB;
        }
        return tokenDB;
    }
    async createToken(company, clientAgent) {
        const token = this.tokenRepository.create({
            company: company,
            browser: clientAgent,
        });
        const refreshPayload = {
            clientAgent: clientAgent,
            companyId: company.id,
            email: company.email,
            role: company.roles,
        };
        const refreshToken = await this.generateRefreshToken(refreshPayload);
        token.refreshToken = refreshToken;
        return await this.tokenRepository.save(token);
    }
    async validateAccessToken(token) {
        try {
            const userData = await this.jwtService.verifyAsync(token, {
                secret: this.configService.getOrThrow('JWT_ACCESS_KEY'),
            });
            return userData;
        }
        catch (error) {
            return null;
        }
    }
    async validateRefreshToken(token) {
        try {
            const userData = await this.jwtService.verifyAsync(token, {
                secret: this.configService.getOrThrow('JWT_REFRESH_KEY'),
            });
            return userData;
        }
        catch (error) {
            return null;
        }
    }
    async generateAccessToken(payload) {
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.getOrThrow('JWT_ACCESS_LIVE'),
            secret: this.configService.getOrThrow('JWT_ACCESS_KEY'),
        });
        return token;
    }
    async generateRefreshToken(payload) {
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.getOrThrow('JWT_REFRESH_LIVE'),
            secret: this.configService.getOrThrow('JWT_REFRESH_KEY'),
        });
        return token;
    }
    async findOne(id) {
        return this.tokenRepository.findOneBy({ id });
    }
    async findOneByAgent(clientAgent, companyId) {
        return this.tokenRepository.findOneBy({
            browser: clientAgent,
            company: { id: companyId },
        });
    }
    async deleteOneByAgent(clientAgent, companyId) {
        return this.tokenRepository.delete({
            browser: clientAgent,
            company: { id: companyId },
        });
    }
};
exports.TokenCompanyService = TokenCompanyService;
exports.TokenCompanyService = TokenCompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(companyToken_entity_1.CompanyToken)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => company_service_1.CompanyService))),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        company_service_1.CompanyService,
        config_1.ConfigService])
], TokenCompanyService);
//# sourceMappingURL=tokenCompany.service.js.map