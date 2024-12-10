import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/createEmail.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    testEMail(createEmailServerDto: CreateEmailDto): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
