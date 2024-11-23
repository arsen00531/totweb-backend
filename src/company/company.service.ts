import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { v4 } from 'uuid';
import { compare, hash } from 'bcryptjs';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { LoginCompanyDto } from 'src/email/dto/login.dto';
import { Request, Response } from 'express';
import { TokenCompanyService } from 'src/token/tokenCompany.service';
import {
  TAccessCompanyPayload,
  TRefreshCompanyPayload,
} from 'src/token/types/payload.type';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => TokenCompanyService))
    private readonly tokenService: TokenCompanyService,
  ) {}

  async registration(createCompanyDto: CreateCompanyDto) {
    const candidate = await this.companyRepository.findOneBy({
      email: createCompanyDto.email,
    });

    if (candidate) {
      throw new BadRequestException('Company already exists');
    }

    const password = await hash(createCompanyDto.password, 5);
    const activateUrl = v4();

    await this.emailService.sendMailSandBox({
      to: [createCompanyDto.email],
      link: `${this.configService.getOrThrow('API_URL')}/company/activate?link=${activateUrl}`,
    });

    const company = this.companyRepository.save({
      ...createCompanyDto,
      activateLink: activateUrl,
      password: password,
    });

    return company;
  }

  async login(loginDto: LoginCompanyDto, req: Request, res: Response) {
    const company = await this.companyRepository.findOneBy({
      email: loginDto.email,
    });

    if (!company) {
      throw new BadRequestException('email or password are incorrect');
    }

    if (!company.isActivated) {
      throw new UnauthorizedException('email is not activated');
    }

    const isValidPassword = await compare(loginDto.password, company.password);

    if (!isValidPassword) {
      throw new BadRequestException('email or password are incorrect');
    }

    const accessPayload: TAccessCompanyPayload = {
      companyId: company.id,
      email: company.email,
      role: company.roles,
    };

    const accessToken =
      await this.tokenService.generateAccessToken(accessPayload);

    const token = await this.tokenService.saveTokenLogin(
      company,
      req.headers['user-agent'],
    );

    const response = {
      accessToken: accessToken,
      refreshToken: token.refreshToken,
      company: company,
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
      tokenData.companyId,
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

    const companyData: TRefreshCompanyPayload =
      await this.tokenService.validateRefreshToken(refreshTokenCookie);
    const tokenFromDB = await this.tokenService.findOneByAgent(
      clientAgent,
      companyData.companyId,
    );

    if (!companyData || !tokenFromDB) {
      throw new UnauthorizedException('Refresh token was not found');
    }

    const company = await this.companyRepository.findOne({
      where: {
        id: companyData.companyId,
      },
      relations: {
        vacancies: true,
      },
    });

    if (!company) {
      throw new UnauthorizedException('User was not found');
    }

    const accessPayload: TAccessCompanyPayload = {
      companyId: company.id,
      email: company.email,
      role: company.roles,
    };

    const accessToken =
      await this.tokenService.generateAccessToken(accessPayload);

    const response = {
      accessToken: accessToken,
      refreshToken: refreshTokenCookie,
      company: company,
    };

    res.json(response);
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Link is invalid');
    }

    const company = await this.companyRepository.findOneBy({
      activateLink: link,
    });

    if (!company) {
      throw new BadRequestException('User was not found');
    }

    company.isActivated = true;

    return await this.companyRepository.save(company);
  }

  async findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    return this.companyRepository.findOneBy({ id });
  }

  async update(updateCompanyDto: UpdateCompanyDto, id: number) {
    const company = await this.companyRepository.findOneBy({ id });

    if (!company) {
      throw new BadRequestException('Company was not found');
    }

    Object.assign(company, {
      ...updateCompanyDto,
    });

    return this.companyRepository.save(company);
  }
}
