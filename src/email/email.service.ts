import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateEmailDto } from './dto/createEmail.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  private transporter = nodemailer.createTransport({
    host: this.configService.getOrThrow('SMTP_HOST'),
    port: this.configService.getOrThrow('SMTP_PORT'),
    secure: false,
    auth: {
      user: this.configService.getOrThrow('SMTP_USER'),
      pass: this.configService.getOrThrow('SMTP_PASS'),
    },
  });

  async sendMailSandBox(createEmailServerDto: CreateEmailDto) {
    try {
      return await this.transporter.sendMail({
        from: '"Totweb 👻" <alialievaaliev@yandex.ru>', // sender address
        to: createEmailServerDto.to, // list of receivers
        subject: 'Подтвердите свою почту в totweb', // Subject line
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
          `, // html body
      });
    } catch (error) {
      console.log(error)
    }
  }
}
