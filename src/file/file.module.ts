import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { StudentModule } from 'src/student/student.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [forwardRef(() => StudentModule), TokenModule],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController],
})
export class FileModule {}
