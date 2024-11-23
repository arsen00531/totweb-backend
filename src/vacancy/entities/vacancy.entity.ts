import { Company } from 'src/company/entities/company.entity';
import { Profession } from 'src/profession/entities/profession.entity';
import { Response } from 'src/response/entities/response.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Graphic {
  ALL = 'all',
  GRAPHIC_FULLDAY = 'graphicFullDay',
  GRAPHIC_CHANGE = 'graphicChange',
  GRAPHIC_ELASTIC = 'graphicElastic',
  GRAPHIC_HOME = 'graphicHome',
}

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  price: string;

  @Column()
  city: string;

  @Column('enum', { enum: Graphic, array: true, default: [Graphic.ALL] })
  graphic: Graphic[];

  @Column('varchar', { array: true })
  duties: string[];

  @Column('varchar', { array: true })
  requirements: string[];

  @Column('varchar', { array: true })
  conditions: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Company, (company) => company.vacancies, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @ManyToOne(() => Profession, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profession: Profession;

  @JoinColumn()
  @OneToMany(() => Response, (response) => response.vacancy)
  responses: Response[];
}
