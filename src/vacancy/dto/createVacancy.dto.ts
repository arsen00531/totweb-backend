import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Graphic } from '../entities/vacancy.entity';

export class CreateVacancyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  price: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsArray()
  @IsEnum(Graphic, { each: true })
  graphic: Graphic[];

  @IsArray()
  @IsNotEmpty()
  duties: string[];

  @IsArray()
  @IsNotEmpty()
  requirements: string[];

  @IsArray()
  @IsNotEmpty()
  conditions: string[];

  @IsNumber()
  @IsNotEmpty()
  professionId: number;
}
