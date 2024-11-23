import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';
import { StudentModule } from 'src/student/student.module';
import { TokenModule } from 'src/token/token.module';
import { VacancyModule } from 'src/vacancy/vacancy.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Response]),
    StudentModule,
    TokenModule,
    VacancyModule,
    CompanyModule,
  ],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}
