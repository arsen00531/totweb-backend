import { Module } from '@nestjs/common';
import { ProfessionController } from './profession.controller';
import { ProfessionService } from './profession.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profession } from './entities/profession.entity';
import { TokenModule } from 'src/token/token.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profession]), TokenModule, CompanyModule],
  controllers: [ProfessionController],
  providers: [ProfessionService],
  exports: [ProfessionService],
})
export class ProfessionModule {}
