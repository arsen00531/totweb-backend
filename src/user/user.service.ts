import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { compare, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const candidate = this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (!candidate) {
      throw new BadRequestException('User already exists');
    }

    const password = await hash(createUserDto.password, 5);

    const user = this.userRepository.save({
      ...createUserDto,
      password: password,
    });

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: loginDto.email });

    if (!user) {
      throw new BadRequestException('email or password are incorrect');
    }

    const isValidPassword = await compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('email or password are incorrect');
    }
  }
}
