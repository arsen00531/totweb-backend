import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  companyName: string;

  @IsEmail()
  @MinLength(3)
  @MaxLength(200)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  contactPerson: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
