import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class WalletWithdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletId: number;

  @Column()
  playerId: number;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  adminId: number;

  @Column()
  paymentTxId: string;

  @Column()
  status: string;

}
