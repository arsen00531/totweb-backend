import { CreateEmailDto } from './dto/createEmail.dto';
import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    constructor(configService: ConfigService);
    private transporter;
    sendMailSandBox(createEmailServerDto: CreateEmailDto): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
