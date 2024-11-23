import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CompanyToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: false })
  browser: string;

  @JoinColumn()
  @ManyToOne(() => Company, (company) => company.companyTokens, {
    onDelete: 'CASCADE',
  })
  company: Company;
}
