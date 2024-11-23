import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { Role } from 'src/student/entities/student.entity';
import { Roles } from 'src/student/decorators/role.decorator';
import { CreateResponseDto } from './dto/createResponse.dto';
import { StudentAuthGuard } from 'src/student/guards/studentAuth.guard';
import { StudentRoleGuard } from 'src/student/guards/studentRole.guard';
import { CompanyAuthGuard } from 'src/company/guards/companyAuth.guard';
import { CompanyRoleGuard } from 'src/company/guards/companyRole.guard';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Roles(Role.Student)
  @UseGuards(StudentAuthGuard, StudentRoleGuard)
  @Post('create')
  create(@Body() createResponseDto: CreateResponseDto) {
    return this.responseService.create(createResponseDto);
  }

  @Roles(Role.Company)
  @UseGuards(CompanyAuthGuard, CompanyRoleGuard)
  @Get('findAllCompany')
  getCompanyResponses(@Query('companyId', ParseIntPipe) companyId: number) {
    return this.responseService.getCompanyResponses(companyId);
  }

  @Roles(Role.Company)
  @UseGuards(CompanyAuthGuard, CompanyRoleGuard)
  @Get('findAllVacancy')
  getVacancyResponses(@Query('vacancyId', ParseIntPipe) vacancyId: number) {
    return this.responseService.getVacancyResponses(vacancyId);
  }

  @Roles(Role.Student)
  @UseGuards(StudentAuthGuard, StudentRoleGuard)
  @Get('findAllStudent')
  getStudentResponses(@Query('studentId', ParseIntPipe) studentId: number) {
    return this.responseService.getStudentResponses(studentId);
  }
}
