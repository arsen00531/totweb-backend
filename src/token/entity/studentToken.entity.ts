import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: false })
  browser: string;

  @ManyToOne(() => Student)
  student: Student;
}
