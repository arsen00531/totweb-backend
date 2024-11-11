import { forwardRef, Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { EmailModule } from 'src/email/email.module';
import { TokenModule } from 'src/token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    EmailModule,
    forwardRef(() => TokenModule),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
