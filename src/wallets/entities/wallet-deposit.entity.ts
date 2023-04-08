import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WalletDeposit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  playerId: number;

  @Column()
  walletId: number;

  @Column()
  checkoutId: string;

  @Column() 
  paymentStatus: string;

  @Column()
  paymentTxId: string;

  @Column()
  depositType: string;

}