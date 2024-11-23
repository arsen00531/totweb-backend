import { Student } from 'src/student/entities/student.entity';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.responses, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @JoinColumn()
  @ManyToOne(() => Vacancy, {
    onDelete: 'CASCADE',
  })
  vacancy: Vacancy;
}
