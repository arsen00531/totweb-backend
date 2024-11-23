import { Company } from 'src/company/entities/company.entity';
import { Student } from 'src/student/entities/student.entity';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company)
  company: Company;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Vacancy)
  vacancy: Vacancy;
}
