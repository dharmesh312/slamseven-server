import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gameId: number;

  @Column()
  paymentType: string;

  @Column()
  paymentStatus: string;

  @Column({ nullable: true })
  paymentReference: string;

  @Column()
  price: number;

  @Column()
  playerId: number;

  @Column()
  status: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}

