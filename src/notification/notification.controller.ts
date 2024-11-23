import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { Roles } from 'src/student/decorators/role.decorator';
import { Role } from 'src/student/entities/student.entity';
import { StudentAuthGuard } from 'src/student/guards/studentAuth.guard';
import { StudentRoleGuard } from 'src/student/guards/studentRole.guard';
import { CompanyAuthGuard } from 'src/company/guards/companyAuth.guard';
import { CompanyRoleGuard } from 'src/company/guards/companyRole.guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UsePipes(new ValidationPipe())
  @Roles(Role.Student)
  @UseGuards(StudentAuthGuard, StudentRoleGuard)
  @Post('create')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Roles(Role.Company)
  @UseGuards(CompanyAuthGuard, CompanyRoleGuard)
  @Get('findByCompany')
  findByCompany(@Query('companyId', ParseIntPipe) companyId: number) {
    return this.notificationService.findByCompany(companyId);
  }
}
