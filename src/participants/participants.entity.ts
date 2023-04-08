import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ unique: true })
  extId: string;

  @Column()
  tour: string;

}