import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'description' })
  @Column()
  description: string;

  @ApiProperty({ description: 'price' })
  @Column({ nullable: true })
  price: string;

  @ApiProperty({ description: 'city' })
  @Column()
  city: string;

  @ApiProperty({ description: 'Graphic', type: () => [Graphic] })
  @Column('enum', { enum: Graphic, array: true, default: [Graphic.ALL] })
  graphic: Graphic[];

  @ApiProperty({ description: 'обязанности' })
  @Column('varchar', { array: true })
  duties: string[];

  @ApiProperty({ description: 'требования' })
  @Column('varchar', { array: true })
  requirements: string[];

  @ApiProperty({ description: 'условия' })
  @Column('varchar', { array: true })
  conditions: string[];

  @ApiProperty({ description: 'дата создания', type: Date })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'компания', type: Company })
  @ManyToOne(() => Company, (company) => company.vacancies, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @ApiProperty({ description: 'профессия', type: Profession })
  @ManyToOne(() => Profession, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profession: Profession;

  @ApiProperty({ description: 'отклики', type: Response })
  @JoinColumn()
  @OneToMany(() => Response, (response) => response.vacancy)
  responses: Response[];
}
