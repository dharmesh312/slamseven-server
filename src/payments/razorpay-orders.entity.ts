import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class RazorpayOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column()
  entity: string;

  @Column()
  playerId: number;

  @Column()
  amount: number;

  @Column({ nullable: true})
  amountPaid: number;

  @Column({ nullable: true})
  amountDue: number;

  @Column()
  currency: string;

  @Column({ nullable: true})
  receipt: string;

  @Column({ nullable: true})
  status: string;

  @Column() 
  attempts: number;

  @Column({ nullable: true})
  createdAt: Date;

  @Column({ nullable: true})
  razorpayPaymentId: string;

  @Column({ nullable: true})
  razorpayOrderId: string;


  @Column({ nullable: true})
  razorpayPaymentSignature: string;
}
