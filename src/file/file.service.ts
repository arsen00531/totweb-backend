import { BadRequestException, Injectable } from '@nestjs/common';
import { access, mkdir, readFile, writeFile } from 'fs/promises';
import { MemoryStoredFile } from 'nestjs-form-data';
import { resolve } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FileService {
  private readonly basicPath: string = resolve(__dirname, '..', 'uploads');

  async getFile(filePath: string) {
    try {
      const file = await readFile(resolve(this.basicPath, filePath));

      return file;
    } catch (error) {
      throw new BadRequestException('file was not found');
    }
  }

  async uploadFile(file: MemoryStoredFile, fileDir: string) {
    try {
      if (!file) {
        throw new BadRequestException('File was not found');
      }
      const dirPath = resolve(this.basicPath, fileDir);

      await this.createDir(this.basicPath);
      await this.createDir(dirPath);

      const fileName = `${v4()}.jpg`;

      await writeFile(resolve(dirPath, fileName), file.buffer);

      return { fileDir, fileName };
    } catch (error) {
      console.log('File wasnt write', error);
      return { fileDir: '', fileName: '' };
    }
  }

  async createDir(path: string) {
    try {
      await access(path);
    } catch (error) {
      await mkdir(path);
    }
  }
}
