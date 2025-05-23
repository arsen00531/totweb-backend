import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentService } from 'src/student/student.service';
import { Student } from 'src/student/entities/student.entity';
import { ConfigService } from '@nestjs/config';
import { StudentToken } from './entities/studentToken.entity';
import {
  TAccessStudentPayload,
  TRefreshStudentPayload,
} from './types/payload.type';

@Injectable()
export class TokenStudentService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(StudentToken)
    private readonly tokenRepository: Repository<StudentToken>,
    @Inject(forwardRef(() => StudentService))
    private readonly StudentService: StudentService,
    private readonly configService: ConfigService,
  ) {}

  async saveTokenLogin(
    student: Student,
    clientAgent: string,
  ): Promise<StudentToken> {
    const tokenDB = await this.tokenRepository.findOneBy({
      browser: clientAgent,
      student: { id: student.id },
    });

    if (!tokenDB) {
      const token = await this.createToken(student, clientAgent);
      return token;
    }

    const refreshPayload: TRefreshStudentPayload = {
      clientAgent: clientAgent,
      studentId: student.id,
      email: student.email,
      role: student.roles,
    };

    tokenDB.refreshToken = await this.generateRefreshToken(refreshPayload);

    return tokenDB;
  }

  async saveTokenRefresh(
    userId: number,
    refreshToken: string,
    clientAgent: string,
  ): Promise<StudentToken> {
    const user = await this.StudentService.findOne(userId);

    if (!user) {
      throw new BadRequestException('User was not found');
    }

    const tokenDB = await this.tokenRepository.findOneBy({
      browser: clientAgent,
    });

    if (!tokenDB) {
      await this.createToken(user, clientAgent);

      return tokenDB;
    }

    return tokenDB;
  }

  async createToken(user: Student, clientAgent: string) {
    const token = this.tokenRepository.create({
      student: user,
      browser: clientAgent,
    });

    const refreshPayload: TRefreshStudentPayload = {
      clientAgent: clientAgent,
      studentId: user.id,
      email: user.email,
      role: user.roles,
    };

    const refreshToken = await this.generateRefreshToken(refreshPayload);
    token.refreshToken = refreshToken;
    return await this.tokenRepository.save(token);
  }

  async validateAccessToken(token: string) {
    try {
      const userData = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_ACCESS_KEY'),
      });

      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const userData: TRefreshStudentPayload =
        await this.jwtService.verifyAsync(token, {
          secret: this.configService.getOrThrow('JWT_REFRESH_KEY'),
        });

      return userData;
    } catch (error) {
      return null;
    }
  }

  async generateAccessToken(payload: TAccessStudentPayload) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_LIVE'),
      secret: this.configService.getOrThrow('JWT_ACCESS_KEY'),
    });

    return token;
  }

  async generateRefreshToken(payload: TRefreshStudentPayload) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_LIVE'),
      secret: this.configService.getOrThrow('JWT_REFRESH_KEY'),
    });

    return token;
  }

  async findOne(id: number) {
    return this.tokenRepository.findOneBy({ id });
  }

  async findOneByAgent(clientAgent: string, userId: number) {
    return this.tokenRepository.findOneBy({
      browser: clientAgent,
      student: { id: userId },
    });
  }

  async deleteOneByAgent(clientAgent: string, userId: number) {
    return this.tokenRepository.delete({
      browser: clientAgent,
      student: { id: userId },
    });
  }
}
