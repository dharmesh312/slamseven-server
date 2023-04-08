import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class WalletCheckout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  checkoutRef: string;

  @Column()
  playerId: number;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  walletId: number;

  @Column()
  status: string;

  @Column()
  gameId: number;
}