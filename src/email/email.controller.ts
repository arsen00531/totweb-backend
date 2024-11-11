import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/createEmail.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UsePipes(new ValidationPipe())
  @Post('test')
  testEMail(@Body() createEmailServerDto: CreateEmailDto) {
    return this.emailService.sendMailSandBox(createEmailServerDto);
  }
}
