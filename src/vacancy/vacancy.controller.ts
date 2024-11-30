import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/createVacancy.dto';
import { Roles } from 'src/student/decorators/role.decorator';
import { Role } from 'src/student/entities/student.entity';
import { Request } from 'express';
import { FindAllQuery } from './query/findAll.query';
import { CompanyAuthGuard } from 'src/company/guards/companyAuth.guard';
import { CompanyRoleGuard } from 'src/company/guards/companyRole.guard';
import { UpdateVacancyDto } from './dto/updateVacancy.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @ApiOperation({ summary: 'Создание вакансии' })
  @Roles(Role.Company)
  @UseGuards(CompanyAuthGuard, CompanyRoleGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  create(@Body() createVacancyDto: CreateVacancyDto, @Req() req: Request) {
    return this.vacancyService.create(createVacancyDto, req);
  }

  @ApiOperation({ summary: 'Получение вакансий' })
  @UsePipes(new ValidationPipe())
  @Get('findAll')
  findAll(@Query() findAllQuery: FindAllQuery) {
    return this.vacancyService.findAll(findAllQuery);
  }

  @ApiOperation({ summary: 'Получение вакансии по id' })
  @Get('findOne')
  findOne(@Query('id', ParseIntPipe) id: number) {
    return this.vacancyService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление вакансии по id' })
  @Put('update')
  update(@Query('id', ParseIntPipe) id: number, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacancyService.update(id, updateVacancyDto);
  }

  @ApiOperation({ summary: 'Удаление вакансии по id' })
  @Delete('delete')
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.vacancyService.delete(id);
  }
}
