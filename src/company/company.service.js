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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_entity_1 = require("./entities/company.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const email_service_1 = require("../email/email.service");
const config_1 = require("@nestjs/config");
const tokenCompany_service_1 = require("../token/tokenCompany.service");
let CompanyService = class CompanyService {
    constructor(companyRepository, emailService, configService, tokenService) {
        this.companyRepository = companyRepository;
        this.emailService = emailService;
        this.configService = configService;
        this.tokenService = tokenService;
    }
    async registration(createCompanyDto) {
        const candidate = await this.companyRepository.findOneBy({
            email: createCompanyDto.email,
        });
        if (candidate) {
            throw new common_1.BadRequestException('Company already exists');
        }
        const password = await (0, bcryptjs_1.hash)(createCompanyDto.password, 5);
        const activateUrl = (0, uuid_1.v4)();
        await this.emailService.sendMailSandBox({
            to: [createCompanyDto.email],
            link: `${this.configService.getOrThrow('API_URL')}/company/activate?link=${activateUrl}`,
        });
        const company = this.companyRepository.save({
            ...createCompanyDto,
            activateLink: activateUrl,
            password: password,
        });
        return company;
    }
    async login(loginDto, req, res) {
        const company = await this.companyRepository.findOneBy({
            email: loginDto.email,
        });
        if (!company) {
            throw new common_1.BadRequestException('email or password are incorrect');
        }
        if (!company.isActivated) {
            throw new common_1.UnauthorizedException('email is not activated');
        }
        const isValidPassword = await (0, bcryptjs_1.compare)(loginDto.password, company.password);
        if (!isValidPassword) {
            throw new common_1.BadRequestException('email or password are incorrect');
        }
        const accessPayload = {
            companyId: company.id,
            email: company.email,
            role: company.roles,
        };
        const accessToken = await this.tokenService.generateAccessToken(accessPayload);
        const token = await this.tokenService.saveTokenLogin(company, req.headers['user-agent']);
        const response = {
            accessToken: accessToken,
            refreshToken: token.refreshToken,
            company: company,
        };
        res.cookie('refreshToken', token.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        });
        res.json(response);
        return response;
    }
    async logout(req, res) {
        const refreshToken = req.cookies.refreshToken;
        const tokenData = await this.tokenService.validateRefreshToken(refreshToken);
        await this.tokenService.deleteOneByAgent(tokenData.clientAgent, tokenData.companyId);
        res.clearCookie('refreshToken');
    }
    async refresh(req, res) {
        const cookies = req.cookies;
        const clientAgent = req.headers['user-agent'];
        if (!cookies.refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token was not found');
        }
        const refreshTokenCookie = cookies.refreshToken;
        const companyData = await this.tokenService.validateRefreshToken(refreshTokenCookie);
        const tokenFromDB = await this.tokenService.findOneByAgent(clientAgent, companyData.companyId);
        if (!companyData || !tokenFromDB) {
            throw new common_1.UnauthorizedException('Refresh token was not found');
        }
        const company = await this.companyRepository.findOne({
            where: {
                id: companyData.companyId,
            },
            relations: {
                vacancies: true,
            },
        });
        if (!company) {
            throw new common_1.UnauthorizedException('User was not found');
        }
        const accessPayload = {
            companyId: company.id,
            email: company.email,
            role: company.roles,
        };
        const accessToken = await this.tokenService.generateAccessToken(accessPayload);
        const response = {
            accessToken: accessToken,
            refreshToken: refreshTokenCookie,
            company: company,
        };
        res.json(response);
    }
    async activate(link, res) {
        if (!link) {
            throw new common_1.BadRequestException('Link is invalid');
        }
        const company = await this.companyRepository.findOneBy({
            activateLink: link,
        });
        if (!company) {
            throw new common_1.BadRequestException('User was not found');
        }
        company.isActivated = true;
        await this.companyRepository.save(company);
        res.redirect(this.configService.getOrThrow('FRONT_END_URL'));
    }
    async findAll() {
        return this.companyRepository.find();
    }
    async findOne(id) {
        return this.companyRepository.findOneBy({ id });
    }
    async update(updateCompanyDto, id) {
        const company = await this.companyRepository.findOneBy({ id });
        if (!company) {
            throw new common_1.BadRequestException('Company was not found');
        }
        Object.assign(company, {
            ...updateCompanyDto,
        });
        return this.companyRepository.save(company);
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => tokenCompany_service_1.TokenCompanyService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService,
        config_1.ConfigService,
        tokenCompany_service_1.TokenCompanyService])
], CompanyService);
//# sourceMappingURL=company.service.js.map