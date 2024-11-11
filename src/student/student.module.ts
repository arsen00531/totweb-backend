import { forwardRef, Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { TokenModule } from 'src/token/token.module';
import { EmailModule } from 'src/email/email.module';
import { CompanyModule } from 'src/company/company.module';
import { StudentAuthGuard } from './guards/studentAuth.guard';
import { StudentRoleGuard } from './guards/studentRole.guard';

@Module({
  imports: [
    forwardRef(() => TokenModule),
    TypeOrmModule.forFeature([Student]),
    EmailModule,
    CompanyModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentAuthGuard, StudentRoleGuard],
  exports: [StudentService, StudentAuthGuard, StudentRoleGuard],
})
export class StudentModule {}
