import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfessionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
