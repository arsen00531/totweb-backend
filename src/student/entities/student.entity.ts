import { Experience } from 'src/experience/entities/experience.entity';
import { Response } from 'src/response/entities/response.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Role {
  Student = 'student',
  Company = 'company',
  Admin = 'admin',
}

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: null })
  university: string;

  @Column({ default: null })
  lastYear: number;

  @Column({ default: null })
  contactEmail: string;

  @Column({ default: null })
  contactPhone: string;

  @Column('varchar', { array: true, default: [] })
  keySkills: string[];

  @Column('varchar', { array: true, default: [] })
  preferredFields: string[];

  @Column('varchar', { array: true, default: [] })
  locationPreferences: string[];

  @Column({ unique: true })
  activateLink: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column('enum', { enum: Role, array: true, default: [Role.Student] })
  roles: Role[];

  @Column()
  password: string;

  @Column({ default: null })
  photo: string;

  @Column({ default: null })
  profession: string;

  @JoinColumn()
  @OneToMany(() => Response, (response) => response.student)
  responses: Response[];

  @JoinColumn()
  @OneToMany(() => Experience, (experience) => experience.student)
  experiences: Experience[];
}
