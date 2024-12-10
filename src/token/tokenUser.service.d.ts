import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { StudentService } from 'src/student/student.service';
import { Student } from 'src/student/entities/student.entity';
import { ConfigService } from '@nestjs/config';
import { StudentToken } from './entities/studentToken.entity';
import { TAccessStudentPayload, TRefreshStudentPayload } from './types/payload.type';
export declare class TokenStudentService {
    private readonly jwtService;
    private readonly tokenRepository;
    private readonly StudentService;
    private readonly configService;
    constructor(jwtService: JwtService, tokenRepository: Repository<StudentToken>, StudentService: StudentService, configService: ConfigService);
    saveTokenLogin(student: Student, clientAgent: string): Promise<StudentToken>;
    saveTokenRefresh(userId: number, refreshToken: string, clientAgent: string): Promise<StudentToken>;
    createToken(user: Student, clientAgent: string): Promise<StudentToken>;
    validateAccessToken(token: string): Promise<any>;
    validateRefreshToken(token: string): Promise<TRefreshStudentPayload>;
    generateAccessToken(payload: TAccessStudentPayload): Promise<string>;
    generateRefreshToken(payload: TRefreshStudentPayload): Promise<string>;
    findOne(id: number): Promise<StudentToken>;
    findOneByAgent(clientAgent: string, userId: number): Promise<StudentToken>;
    deleteOneByAgent(clientAgent: string, userId: number): Promise<import("typeorm").DeleteResult>;
}
