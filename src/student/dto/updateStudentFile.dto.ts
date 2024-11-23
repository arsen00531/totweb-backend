import { IsOptional } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class UpdateStudentFileDto {
  @IsOptional()
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  addFile: MemoryStoredFile;
}
