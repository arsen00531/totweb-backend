import {
  IsArray,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Graphic } from '../entities/vacancy.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllQuery {
  @ApiProperty({ example: 1, description: 'страницы пагинации' })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 1, description: 'кол-во страниц' })
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @ApiProperty({ example: "text", description: 'поиск по title' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ example: "text", description: 'поиск по city' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: [Graphic.GRAPHIC_CHANGE], description: 'поиск по city' })
  @IsArray()
  @IsEnum(Graphic, { each: true })
  @IsOptional()
  graphic?: Graphic[];

  @ApiProperty({ example: [1, 2], description: 'ids' })
  @IsArray()
  @IsOptional()
  professionIds: number[];
}
