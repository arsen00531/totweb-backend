import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  lastName: string;

  @IsEmail()
  @MinLength(3)
  @MaxLength(200)
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  profession: string;
}
