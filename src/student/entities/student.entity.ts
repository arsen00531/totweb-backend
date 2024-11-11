import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  Student = 'student',
  Company = 'company',
  Admin = 'admin',
}

@Entity('users')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  activateLink: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column('enum', { enum: Role, array: true, default: [Role.Student] })
  role: Role[];

  @Column()
  password: string;
}
