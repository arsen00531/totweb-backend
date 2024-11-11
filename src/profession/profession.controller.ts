import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { CreateProfessionDto } from './dto/createProfession.dto';
import { Roles } from 'src/student/decorators/role.decorator';
import { Role } from 'src/student/entities/student.entity';
import { CompanyAuthGuard } from 'src/company/guards/companyAuth.guard';
import { CompanyRoleGuard } from 'src/company/guards/companyRole.guard';

@Controller('profession')
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Roles(Role.Admin)
  @UseGuards(CompanyAuthGuard, CompanyRoleGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  create(@Body() createProfessionDto: CreateProfessionDto) {
    return this.professionService.create(createProfessionDto);
  }

  @Get('findAll')
  findAll() {
    return this.professionService.findAll();
  }
}
