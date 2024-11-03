import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { compare, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { TokenService } from 'src/token/token.service';
import { TAccessPayload, TRefreshPayload } from 'src/token/types/payload.type';
import { Request, Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => TokenService))
    private readonly tokenService: TokenService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const candidate = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    const password = await hash(createUserDto.password, 5);

    const user = this.userRepository.save({
      ...createUserDto,
      password: password,
    });

    return user;
  }

  async login(loginDto: LoginDto, req: Request, res: Response) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });

    if (!user) {
      throw new BadRequestException('email or password are incorrect');
    }

    const isValidPassword = await compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('email or password are incorrect');
    }

    const accessPayload: TAccessPayload = {
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
    console.log(cookies);

    if (!cookies.refreshToken) {
      throw new UnauthorizedException('Refresh token was not found');
    }

    const refreshTokenCookie = cookies.refreshToken;

    const userData: TRefreshPayload =
      await this.tokenService.validateRefreshToken(refreshTokenCookie);
    const tokenFromDB = await this.tokenService.findOneByAgent(
      clientAgent,
      userData.userId,
    );
    console.log(userData, tokenFromDB);

    if (!userData || !tokenFromDB) {
      throw new UnauthorizedException('Refresh token was not found');
    }

    const user = await this.userRepository.findOneBy({ id: userData.userId });

    if (!user) {
      throw new UnauthorizedException('User was not found');
    }

    const accessPayload: TAccessPayload = {
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

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
