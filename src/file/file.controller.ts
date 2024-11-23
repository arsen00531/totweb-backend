import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { Roles } from 'src/student/decorators/role.decorator';
import { Role } from 'src/student/entities/student.entity';
import { StudentAuthGuard } from 'src/student/guards/studentAuth.guard';
import { StudentRoleGuard } from 'src/student/guards/studentRole.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Roles(Role.Student)
  @UseGuards(StudentAuthGuard, StudentRoleGuard)
  @Get('getFile')
  getFile(@Query('path') path: string) {
    return this.fileService.getFile(path);
  }
}
