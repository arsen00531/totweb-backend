import {
  IsArray,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Graphic } from '../entities/vacancy.entity';

export class FindAllQuery {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsArray()
  @IsEnum(Graphic, { each: true })
  @IsOptional()
  graphic?: Graphic[];

  @IsArray()
  @IsOptional()
  professionIds: number[];
}
