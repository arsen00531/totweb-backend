export interface MailService {
  /**
   * @description Send email
   */
  sendMail(content: object): Promise<void>;

  /**
   * @description Send email sandbox
   */
  sendMailSandBox(content: object): Promise<void>;
}
