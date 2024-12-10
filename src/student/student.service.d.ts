import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/createStudent.dto';
import { LoginStudentDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { TokenStudentService } from 'src/token/tokenUser.service';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { FileService } from 'src/file/file.service';
import { UpdateStudentFileDto } from './dto/updateStudentFile.dto';
import { ProfessionService } from 'src/profession/profession.service';
import { ExperienceService } from 'src/experience/experience.service';
export declare class StudentService {
    private readonly studentRepository;
    private readonly tokenService;
    private readonly emailService;
    private readonly configService;
    private readonly fileService;
    private readonly professionService;
    private readonly experienceService;
    constructor(studentRepository: Repository<Student>, tokenService: TokenStudentService, emailService: EmailService, configService: ConfigService, fileService: FileService, professionService: ProfessionService, experienceService: ExperienceService);
    create(createStudentDto: CreateStudentDto): Promise<{
        activateLink: string;
        password: string;
        firstName: string;
        lastName: string;
        email: string;
    } & Student>;
    login(loginDto: LoginStudentDto, req: Request, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
        student: Student;
    }>;
    logout(req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    activate(link: string, res: Response): Promise<void>;
    findAll(): Promise<Student[]>;
    findOne(id: number): Promise<Student>;
    update(updateStudentDto: UpdateStudentDto, id: number): Promise<Student>;
    updateFile(updateStudentPhotoDto: UpdateStudentFileDto, id: number): Promise<Student>;
}
