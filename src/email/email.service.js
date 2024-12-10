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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.getOrThrow('SMTP_HOST'),
            port: this.configService.getOrThrow('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.getOrThrow('SMTP_USER'),
                pass: this.configService.getOrThrow('SMTP_PASS'),
            },
        });
    }
    async sendMailSandBox(createEmailServerDto) {
        try {
            console.log("send main", createEmailServerDto);
            return await this.transporter.sendMail({
                from: '"Totweb 👻" <alialievaaliev@yandex.ru>',
                to: createEmailServerDto.to,
                subject: 'Подтвердите свою почту в totweb',
                html: `
          <head>
            <style>
                button {
                  outline:none;
                  background-color:#24a0ed;
                  border: none;
                  padding: 10px;
                  padding-left: 15px;
                  padding-right: 15px;
                }
                button:hover {
                  opacity: 0.9;
                }
                a {
                  text-decoration: none;
                }
            </style>
          </head>
          <body>
            <b>
              Добро пожаловать!
            </b>
            <br/>
            Пожалуйста подтвердите свою почту, перейдя по этой ссылке <a href=${createEmailServerDto.link}>Перейти</a>
          </body>
          `,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map