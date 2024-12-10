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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./entities/student.entity");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const email_service_1 = require("../email/email.service");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const tokenUser_service_1 = require("../token/tokenUser.service");
const file_service_1 = require("../file/file.service");
const profession_service_1 = require("../profession/profession.service");
const experience_service_1 = require("../experience/experience.service");
let StudentService = class StudentService {
    constructor(studentRepository, tokenService, emailService, configService, fileService, professionService, experienceService) {
        this.studentRepository = studentRepository;
        this.tokenService = tokenService;
        this.emailService = emailService;
        this.configService = configService;
        this.fileService = fileService;
        this.professionService = professionService;
        this.experienceService = experienceService;
    }
    async create(createStudentDto) {
        const candidate = await this.studentRepository.findOneBy({
            email: createStudentDto.email,
        });
        if (candidate) {
            throw new common_1.BadRequestException('User already exists');
        }
        const password = await (0, bcryptjs_1.hash)(createStudentDto.password, 5);
        const activateUrl = (0, uuid_1.v4)();
        await this.emailService.sendMailSandBox({
            to: [createStudentDto.email],
            link: `${this.configService.getOrThrow('API_URL')}/student/activate?link=${activateUrl}`,
        });
        const student = this.studentRepository.save({
            ...createStudentDto,
            activateLink: activateUrl,
            password: password,
        });
        return student;
    }
    async login(loginDto, req, res) {
        const student = await this.studentRepository.findOne({
            where: {
                email: loginDto.email,
            },
            relations: {
                experiences: true,
            },
        });
        if (!student) {
            throw new common_1.BadRequestException('email or password are incorrect');
        }
        if (!student.isActivated) {
            throw new common_1.UnauthorizedException('email is not activated');
        }
        const isValidPassword = await (0, bcryptjs_1.compare)(loginDto.password, student.password);
        if (!isValidPassword) {
            throw new common_1.BadRequestException('email or password are incorrect');
        }
        const accessPayload = {
            studentId: student.id,
            email: student.email,
            role: student.roles,
        };
        const accessToken = await this.tokenService.generateAccessToken(accessPayload);
        const token = await this.tokenService.saveTokenLogin(student, req.headers['user-agent']);
        const response = {
            accessToken: accessToken,
            refreshToken: token.refreshToken,
            student: student,
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
        await this.tokenService.deleteOneByAgent(tokenData.clientAgent, tokenData.studentId);
        res.clearCookie('refreshToken');
    }
    async refresh(req, res) {
        const cookies = req.cookies;
        const clientAgent = req.headers['user-agent'];
        if (!cookies.refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token was not found');
        }
        const refreshTokenCookie = cookies.refreshToken;
        const studentData = await this.tokenService.validateRefreshToken(refreshTokenCookie);
        const tokenFromDB = await this.tokenService.findOneByAgent(clientAgent, studentData.studentId);
        if (!studentData || !tokenFromDB) {
            throw new common_1.UnauthorizedException('Refresh token was not found');
        }
        const student = await this.studentRepository.findOne({
            where: {
                id: studentData.studentId,
            },
            relations: {
                experiences: true,
            },
        });
        if (!student) {
            throw new common_1.UnauthorizedException('User was not found');
        }
        const accessPayload = {
            studentId: student.id,
            email: student.email,
            role: student.roles,
        };
        const accessToken = await this.tokenService.generateAccessToken(accessPayload);
        const response = {
            accessToken: accessToken,
            refreshToken: refreshTokenCookie,
            student: student,
        };
        res.json(response);
    }
    async activate(link, res) {
        if (!link) {
            throw new common_1.BadRequestException('Link is invalid');
        }
        const student = await this.studentRepository.findOneBy({
            activateLink: link,
        });
        if (!student) {
            throw new common_1.BadRequestException('User was not found');
        }
        student.isActivated = true;
        await this.studentRepository.save(student);
        res.redirect(this.configService.getOrThrow('FRONT_END_URL'));
    }
    async findAll() {
        return this.studentRepository.find();
    }
    async findOne(id) {
        return this.studentRepository.findOne({
            where: {
                id,
            },
            relations: { experiences: true },
        });
    }
    async update(updateStudentDto, id) {
        const student = await this.studentRepository.findOne({
            where: {
                id,
            },
        });
        if (!student) {
            throw new common_1.BadRequestException('Student was not found');
        }
        Object.assign(student, {
            ...updateStudentDto,
        });
        return this.studentRepository.save(student);
    }
    async updateFile(updateStudentPhotoDto, id) {
        const student = await this.studentRepository.findOneBy({ id });
        if (!student) {
            throw new common_1.BadRequestException('Student was not found');
        }
        const { fileName } = await this.fileService.uploadFile(updateStudentPhotoDto.addFile, String(id));
        student.photo = fileName;
        return this.studentRepository.save(student);
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => tokenUser_service_1.TokenStudentService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tokenUser_service_1.TokenStudentService,
        email_service_1.EmailService,
        config_1.ConfigService,
        file_service_1.FileService,
        profession_service_1.ProfessionService,
        experience_service_1.ExperienceService])
], StudentService);
//# sourceMappingURL=student.service.js.map