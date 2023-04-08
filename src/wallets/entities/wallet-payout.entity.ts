import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WalletPayout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  playerId: number;

  @Column()
  currency: string;

  @Column()
  walletId: number;

  @Column()
  gameId: number;

  @Column()
  leaderboardId: number;

  @Column()
  ticketId: number;

  @Column()
  status: string;

  @Column()
  summary: string;
}