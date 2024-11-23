import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { StudentModule } from 'src/student/student.module';
import { CompanyModule } from 'src/company/company.module';
import { TokenModule } from 'src/token/token.module';
import { VacancyModule } from 'src/vacancy/vacancy.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    StudentModule,
    CompanyModule,
    TokenModule,
    VacancyModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
