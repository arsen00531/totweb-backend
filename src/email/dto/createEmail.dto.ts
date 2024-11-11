import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmailDto {
  @IsArray()
  @IsNotEmpty()
  to: string[];

  @IsString()
  @IsNotEmpty()
  link: string;
}
