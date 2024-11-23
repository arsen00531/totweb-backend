import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  workPlace: string;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @Column({ nullable: true })
  whatDo: string;

  @ManyToOne(() => Student, (student) => student.experiences)
  student: Student;
}
