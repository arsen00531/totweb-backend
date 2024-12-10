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
exports.TokenStudentService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_service_1 = require("../student/student.service");
const config_1 = require("@nestjs/config");
const studentToken_entity_1 = require("./entities/studentToken.entity");
let TokenStudentService = class TokenStudentService {
    constructor(jwtService, tokenRepository, StudentService, configService) {
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.StudentService = StudentService;
        this.configService = configService;
    }
    async saveTokenLogin(student, clientAgent) {
        const tokenDB = await this.tokenRepository.findOneBy({
            browser: clientAgent,
            student: { id: student.id },
        });
        if (!tokenDB) {
            const token = await this.createToken(student, clientAgent);
            return token;
        }
        const refreshPayload = {
            clientAgent: clientAgent,
            studentId: student.id,
            email: student.email,
            role: student.roles,
        };
        tokenDB.refreshToken = await this.generateRefreshToken(refreshPayload);
        return tokenDB;
    }
    async saveTokenRefresh(userId, refreshToken, clientAgent) {
        const user = await this.StudentService.findOne(userId);
        if (!user) {
            throw new common_1.BadRequestException('User was not found');
        }
        const tokenDB = await this.tokenRepository.findOneBy({
            browser: clientAgent,
        });
        if (!tokenDB) {
            await this.createToken(user, clientAgent);
            return tokenDB;
        }
        return tokenDB;
    }
    async createToken(user, clientAgent) {
        const token = this.tokenRepository.create({
            student: user,
            browser: clientAgent,
        });
        const refreshPayload = {
            clientAgent: clientAgent,
            studentId: user.id,
            email: user.email,
            role: user.roles,
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
    async findOneByAgent(clientAgent, userId) {
        return this.tokenRepository.findOneBy({
            browser: clientAgent,
            student: { id: userId },
        });
    }
    async deleteOneByAgent(clientAgent, userId) {
        return this.tokenRepository.delete({
            browser: clientAgent,
            student: { id: userId },
        });
    }
};
exports.TokenStudentService = TokenStudentService;
exports.TokenStudentService = TokenStudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(studentToken_entity_1.StudentToken)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => student_service_1.StudentService))),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        student_service_1.StudentService,
        config_1.ConfigService])
], TokenStudentService);
//# sourceMappingURL=tokenUser.service.js.map