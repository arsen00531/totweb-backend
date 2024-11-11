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
  TAccessUserPayload,
  TRefreshUserPayload,
} from 'src/token/types/payload.type';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly userRepository: Repository<Student>,
    @Inject(forwardRef(() => TokenStudentService))
    private readonly tokenService: TokenStudentService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateStudentDto) {
    const candidate = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    const password = await hash(createUserDto.password, 5);
    const activateUrl = v4();

    await this.emailService.sendMailSandBox({
      to: [createUserDto.email],
      link: `${this.configService.getOrThrow('API_URL')}/user/activate?link=${activateUrl}`,
    });

    const user = this.userRepository.save({
      ...createUserDto,
      activateLink: activateUrl,
      password: password,
    });

    return user;
  }

  async login(loginDto: LoginStudentDto, req: Request, res: Response) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });

    if (!user) {
      throw new BadRequestException('email or password are incorrect');
    }

    if (!user.isActivated) {
      throw new UnauthorizedException('email is not activated');
    }

    const isValidPassword = await compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('email or password are incorrect');
    }

    const accessPayload: TAccessUserPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken =
      await this.tokenService.generateAccessToken(accessPayload);
    const token = await this.tokenService.saveTokenLogin(
      user,
      req.headers['user-agent'],
    );

    const response = {
      accessToken: accessToken,
      refreshToken: token.refreshToken,
      user: user,
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
      tokenData.userId,
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

    const userData: TRefreshUserPayload =
      await this.tokenService.validateRefreshToken(refreshTokenCookie);
    const tokenFromDB = await this.tokenService.findOneByAgent(
      clientAgent,
      userData.userId,
    );

    if (!userData || !tokenFromDB) {
      throw new UnauthorizedException('Refresh token was not found');
    }

    const user = await this.userRepository.findOneBy({ id: userData.userId });

    if (!user) {
      throw new UnauthorizedException('User was not found');
    }

    const accessPayload: TAccessUserPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken =
      await this.tokenService.generateAccessToken(accessPayload);

    const response = {
      accessToken: accessToken,
      refreshToken: refreshTokenCookie,
      user: user,
    };

    res.json(response);
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Link is invalid');
    }

    const user = await this.userRepository.findOneBy({ activateLink: link });

    if (!user) {
      throw new BadRequestException('User was not found');
    }

    user.isActivated = true;

    return await this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
