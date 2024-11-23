import { CompanyToken } from 'src/token/entities/companyToken.entity';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

enum Role {
  Student = 'student',
  Company = 'company',
  Admin = 'admin',
}

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contactPerson: string;

  @Column()
  phone: string;

  @Column({ default: null })
  industry: string;

  @Column({ default: null })
  location: string;

  @Column({ default: null })
  size: string;

  @Column('varchar', { array: true, default: [] })
  aboutUs: string[];

  @Column({ default: null })
  contactEmail: string;

  @Column({ default: null })
  contactPhone: string;

  @Column({ default: null })
  site: string;

  @Column({ default: null })
  social: string;

  @Column('varchar', { array: true, default: [] })
  projects: string[];

  @Column('varchar', { array: true, default: [] })
  reviews: string[];

  @Column({ unique: true })
  activateLink: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column('enum', { enum: Role, array: true, default: [Role.Company] })
  roles: Role[];

  @Column()
  password: string;

  @OneToMany(() => CompanyToken, (companyToken) => companyToken.company, {
    onDelete: 'CASCADE',
  })
  companyTokens: CompanyToken[];

  @OneToMany(() => Vacancy, (vacancy) => vacancy.company, {
    onDelete: 'CASCADE',
  })
  vacancies: Vacancy[];
}
