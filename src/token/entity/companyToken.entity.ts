import { Company } from 'src/company/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: false })
  browser: string;

  @ManyToOne(() => Company, (company) => company.companyToken)
  company: Company;
}
