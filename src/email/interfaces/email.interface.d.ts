export interface MailService {
    sendMail(content: object): Promise<void>;
    sendMailSandBox(content: object): Promise<void>;
}
