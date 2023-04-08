import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Selection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gameId: number;

  @Column()
  ticketId: number;

  @Column()
  playerId: number;

  @Column({ nullable: true })
  role: string;

  @Column()
  gameParticipantId: number;

  @Column()
  type: string;

  @Column()
  position: number;

  @DeleteDateColumn()
  deletedAt?: Date;

}
