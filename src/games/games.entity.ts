import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  state: string;

  @Column()
  extTournamentId: string;

  @Column()
  maxTickets: number;

  @Column()
  ticketPrice: number;

}