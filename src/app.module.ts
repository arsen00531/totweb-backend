import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/entities/student.entity';
import { TokenModule } from './token/token.module';
import { EmailModule } from './email/email.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { CompanyModule } from './company/company.module';
import { Vacancy } from './vacancy/entities/vacancy.entity';
import { Company } from './company/entities/company.entity';
import { ProfessionModule } from './profession/profession.module';
import { Profession } from './profession/entities/profession.entity';
import { StudentToken } from './token/entities/studentToken.entity';
import { CompanyToken } from './token/entities/companyToken.entity';
import { NotificationModule } from './notification/notification.module';
import { ResponseModule } from './response/response.module';
import { Notification } from './notification/entities/notification.entity';
import { Response } from './response/entities/response.entity';
import { FileModule } from './file/file.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ExperienceModule } from './experience/experience.module';
import { Experience } from './experience/entities/experience.entity';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    StudentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${ENV}`, ENV === 'development' ? '.env' : ''],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow('TYPEORM_URL'),
        synchronize: true ? ENV === 'development' : false,
        entities: [
          Student,
          StudentToken,
          CompanyToken,
          Vacancy,
          Company,
          Profession,
          Notification,
          Response,
          Experience,
        ],
      }),
    }),
    NestjsFormDataModule.config({ isGlobal: true }),
    TokenModule,
    EmailModule,
    VacancyModule,
    CompanyModule,
    ProfessionModule,
    NotificationModule,
    ResponseModule,
    FileModule,
    ExperienceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
