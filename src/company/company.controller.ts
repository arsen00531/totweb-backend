import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { LoginCompanyDto } from 'src/email/dto/login.dto';
import { Request, Response } from 'express';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UsePipes(new ValidationPipe())
  @Post('registration')
  registration(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.registration(createCompanyDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  login(
    @Body() loginDto: LoginCompanyDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.companyService.login(loginDto, req, res);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.companyService.logout(req, res);
  }

  @Get('refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    return this.companyService.refresh(req, res);
  }

  @Get('activate')
  activate(@Query('link') link: string) {
    return this.companyService.activate(link);
  }
}
