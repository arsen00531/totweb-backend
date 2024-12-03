import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/createStudent.dto';
import { compare, hash } from 'bcryptjs';
import { LoginStudentDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import { TokenStudentService } from 'src/token/tokenUser.service';
import {
  TAccessStudentPayload,
  TRefreshStudentPayload,
} from 'src/token/types/payload.type';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { FileService } from 'src/file/file.service';
import { UpdateStudentFileDto } from './dto/updateStudentFile.dto';
import { ProfessionService } from 'src/profession/profession.service';
import { ExperienceService } from 'src/experience/experience.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @Inject(forwardRef(() => TokenStudentService))
    private readonly tokenService: TokenStudentService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
    private readonly professionService: ProfessionService,
    private readonly experienceService: ExperienceService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const candidate = await this.studentRepository.findOneBy({
      email: createStudentDto.email,
    });

    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    const password = await hash(createStudentDto.password, 5);
    const activateUrl = v4();

    await this.emailService.sendMailSandBox({
      to: [createStudentDto.email],
      link: `${this.configService.getOrThrow('API_URL')}/student/activate?link=${activateUrl}`,
    });

    const student = this.studentRepository.save({
      ...createStudentDto,
      activateLink: activateUrl,
      password: password,
    });

    return student;
  }

  async login(loginDto: LoginStudentDto, req: Request, res: Response) {
    const student = await this.studentRepository.findOne({
      where: {
        email: loginDto.email,
      },
      relations: {
        experiences: true,
      },
    });

    if (!student) {
      throw new BadRequestException('email or password are incorrect');
    }

    if (!student.isActivated) {
      throw new UnauthorizedException('email is not activated');
    }

    const isValidPassword = await compare(loginDto.password, student.password);

    if (!isValidPassword) {
      throw new BadRequestException('email or password are incorrect');
    }

    const accessPayload: TAccessStudentPayload = {
      studentId: student.id,
      email: student.email,
      role: student.roles,
    };

    const accessToken =
      await this.tokenService.generateAccessToken(accessPayload);
    const token = await this.tokenService.saveTokenLogin(
      student,
      req.headers['user-agent'],
    );

    const response = {
      accessToken: accessToken,
      refreshToken: token.refreshToken,
      student: student,
    };

    res.cookie('refreshToken', token.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });
    res.json(response);

    return response;
  }

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const tokenData =
      await this.tokenService.validateRefreshToken(refreshToken);

    await this.tokenService.deleteOneByAgent(
      tokenData.clientAgent,
      tokenData.studentId,
    );

    res.clearCookie('refreshToken');
  }

  async refresh(req: Request, res: Response) {
    const cookies = req.cookies;
    const clientAgent = req.headers['user-agent'];

    if (!cookies.refreshToken) {
      throw new UnauthorizedException('Refresh token was not found');
    }

    const refreshTokenCookie = cookies.refreshToken;

    const studentData: TRefreshStudentPayload =
      await this.tokenService.validateRefreshToken(refreshTokenCookie);
    const tokenFromDB = await this.tokenService.findOneByAgent(
      clientAgent,
      studentData.studentId,
    );

    if (!studentData || !tokenFromDB) {
      throw new UnauthorizedException('Refresh token was not found');
    }

    const student = await this.studentRepository.findOne({
      where: {
        id: studentData.studentId,
      },
      relations: {
        experiences: true,
      },
    });

    if (!student) {
      throw new UnauthorizedException('User was not found');
    }

    const accessPayload: TAccessStudentPayload = {
      studentId: student.id,
      email: student.email,
      role: student.roles,
    };

    const accessToken =
      await this.tokenService.generateAccessToken(accessPayload);

    const response = {
      accessToken: accessToken,
      refreshToken: refreshTokenCookie,
      student: student,
    };

    res.json(response);
  }

  async activate(link: string, res: Response) {
    if (!link) {
      throw new BadRequestException('Link is invalid');
    }

    const student = await this.studentRepository.findOneBy({
      activateLink: link,
    });

    if (!student) {
      throw new BadRequestException('User was not found');
    }

    student.isActivated = true;

    await this.studentRepository.save(student);

    res.redirect(this.configService.getOrThrow('FRONT_END_URL'))
  }

  async findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    return this.studentRepository.findOne({
      where: {
        id,
      },
      relations: { experiences: true },
    });
  }

  async update(updateStudentDto: UpdateStudentDto, id: number) {
    const student = await this.studentRepository.findOne({
      where: {
        id,
      },
    });

    if (!student) {
      throw new BadRequestException('Student was not found');
    }

    Object.assign(student, {
      ...updateStudentDto,
    });

    return this.studentRepository.save(student);
  }

  async updateFile(updateStudentPhotoDto: UpdateStudentFileDto, id: number) {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) {
      throw new BadRequestException('Student was not found');
    }

    const { fileName } = await this.fileService.uploadFile(
      updateStudentPhotoDto.addFile,
      String(id),
    );

    student.photo = fileName;
    return this.studentRepository.save(student);
  }
}
