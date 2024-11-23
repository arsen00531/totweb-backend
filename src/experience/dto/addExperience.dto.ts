import { IsNotEmpty, IsString } from 'class-validator';

export class AddExperienceDto {
  @IsString()
  @IsNotEmpty()
  workPlace: string;

  @IsString()
  @IsNotEmpty()
  profession: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  whatDo: string;
}
