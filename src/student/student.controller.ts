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
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { LoginStudentDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('student')
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}

  @Post('registration')
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateStudentDto) {
    return this.StudentService.create(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(
    @Body() loginDto: LoginStudentDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.StudentService.login(loginDto, req, res);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.StudentService.logout(req, res);
  }

  @Get('refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    return this.StudentService.refresh(req, res);
  }

  @Get('activate')
  activate(@Query('link') link: string) {
    return this.StudentService.activate(link);
  }

  @Get('findAll')
  findAll(@Req() req: Request) {
    console.log(req.headers['user-agent']);
    return this.StudentService.findAll();
  }
}
