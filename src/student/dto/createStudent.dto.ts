import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @MinLength(3)
  @MaxLength(200)
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
