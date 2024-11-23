import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  companyName: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  contactPerson: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  industry: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  size: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  aboutUs: string[];

  @IsString()
  @IsOptional()
  contactEmail: string;

  @IsString()
  @IsOptional()
  contactPhone: string;

  @IsString()
  @IsOptional()
  site: string;

  @IsString()
  @IsOptional()
  social: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  projects: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  reviews: string[];
}
