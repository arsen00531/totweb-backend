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
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { LoginStudentDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { UpdateStudentFileDto } from './dto/updateStudentFile.dto';
import { Roles } from './decorators/role.decorator';
import { Role } from './entities/student.entity';
import { StudentAuthGuard } from './guards/studentAuth.guard';
import { StudentRoleGuard } from './guards/studentRole.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('registration')
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateStudentDto) {
    return this.studentService.create(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(
    @Body() loginDto: LoginStudentDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.studentService.login(loginDto, req, res);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.studentService.logout(req, res);
  }

  @Get('refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    return this.studentService.refresh(req, res);
  }

  @Get('activate')
  activate(@Query('link') link: string) {
    return this.studentService.activate(link);
  }

  @Get('findAll')
  findAll() {
    return this.studentService.findAll();
  }

  @Get('findOne')
  findOne(@Query('studentId', ParseIntPipe) studentId: number) {
    return this.studentService.findOne(studentId);
  }

  @Roles(Role.Student)
  @UseGuards(StudentAuthGuard, StudentRoleGuard)
  @UsePipes(new ValidationPipe())
  @FormDataRequest()
  @Put('update')
  update(
    @Body() updateStudentDto: UpdateStudentDto,
    @Query('id', ParseIntPipe) id: number,
  ) {
    return this.studentService.update(updateStudentDto, id);
  }

  @Roles(Role.Student)
  @UseGuards(StudentAuthGuard, StudentRoleGuard)
  @UsePipes(new ValidationPipe())
  @FormDataRequest()
  @Put('updateFile')
  updateFile(
    @Body() updateStudentDto: UpdateStudentFileDto,
    @Query('id', ParseIntPipe) id: number,
  ) {
    return this.studentService.updateFile(updateStudentDto, id);
  }
}
