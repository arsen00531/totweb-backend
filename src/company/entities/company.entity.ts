import { CompanyToken } from 'src/token/entity/companyToken.entity';
import { Role } from 'src/student/entities/student.entity';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ unique: true })
  activateLink: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column('enum', { enum: Role, array: true, default: [Role.Company] })
  role: Role[];

  @Column()
  password: string;

  @OneToMany(() => CompanyToken, (companyToken) => companyToken.company, {
    onDelete: 'CASCADE',
  })
  companyToken: CompanyToken[];

  @OneToMany(() => Vacancy, (vacancy) => vacancy.company)
  vacancy: Vacancy[];
}
