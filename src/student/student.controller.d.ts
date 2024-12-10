import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/createStudent.dto';
import { LoginStudentDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { UpdateStudentDto } from './dto/updateStudent.dto';
import { UpdateStudentFileDto } from './dto/updateStudentFile.dto';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    create(createUserDto: CreateStudentDto): Promise<{
        activateLink: string;
        password: string;
        firstName: string;
        lastName: string;
        email: string;
    } & import("./entities/student.entity").Student>;
    login(loginDto: LoginStudentDto, req: Request, res: Response): Promise<{
        accessToken: string;
        refreshToken: string;
        student: import("./entities/student.entity").Student;
    }>;
    logout(req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    activate(link: string, response: Response): Promise<void>;
    findAll(): Promise<import("./entities/student.entity").Student[]>;
    findOne(studentId: number): Promise<import("./entities/student.entity").Student>;
    update(updateStudentDto: UpdateStudentDto, id: number): Promise<import("./entities/student.entity").Student>;
    updateFile(updateStudentDto: UpdateStudentFileDto, id: number): Promise<import("./entities/student.entity").Student>;
}
