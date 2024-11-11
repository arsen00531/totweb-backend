import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
