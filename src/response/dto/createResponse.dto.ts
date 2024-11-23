import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResponseDto {
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  vacancyId: number;
}
