import { forwardRef, Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { StudentModule } from 'src/student/student.module';
import { TokenStudentService } from './tokenUser.service';
import { TokenCompanyService } from './tokenCompany.service';
import { CompanyModule } from 'src/company/company.module';
import { StudentToken } from './entities/studentToken.entity';
import { CompanyToken } from './entities/companyToken.entity';

@Module({
  imports: [
    forwardRef(() => StudentModule),
    forwardRef(() => CompanyModule),
    TypeOrmModule.forFeature([StudentToken, CompanyToken]),
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [TokenStudentService, TokenCompanyService],
  controllers: [TokenController],
  exports: [TokenStudentService, TokenCompanyService],
})
export class TokenModule {}
