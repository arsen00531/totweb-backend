import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  Executor = 'executor',
  Consumer = 'consumer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column({ enum: ['executor', 'consumer'], default: 'executor' })
  role: Role;

  @Column()
  password: string;
}
