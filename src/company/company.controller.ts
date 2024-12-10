import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { LoginCompanyDto } from 'src/email/dto/login.dto';
import { Request, Response } from 'express';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { Roles } from 'src/student/decorators/role.decorator';
import { Role } from 'src/student/entities/student.entity';
import { CompanyAuthGuard } from './guards/companyAuth.guard';
import { CompanyRoleGuard } from './guards/companyRole.guard';

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
  activate(@Query('link') link: string, @Res() res: Response) {
    return this.companyService.activate(link, res);
  }

  @Roles(Role.Company)
  @UseGuards(CompanyAuthGuard, CompanyRoleGuard)
  @UsePipes(new ValidationPipe())
  @Put('update')
  update(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Query('id', ParseIntPipe) id: number,
  ) {
    return this.companyService.update(updateCompanyDto, id);
  }
}
