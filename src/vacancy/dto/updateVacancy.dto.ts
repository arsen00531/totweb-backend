import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Graphic } from '../entities/vacancy.entity';

export class UpdateVacancyDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsArray()
  @IsEnum(Graphic, { each: true })
  @IsOptional()
  graphic: Graphic[];

  @IsArray()
  @IsOptional()
  duties: string[];

  @IsArray()
  @IsOptional()
  requirements: string[];

  @IsArray()
  @IsOptional()
  conditions: string[];

  @IsNumber()
  @IsOptional()
  professionId: number;
}
