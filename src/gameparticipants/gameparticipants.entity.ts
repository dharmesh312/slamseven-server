import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gameId: number;
  
  @Column()
  participantId: number;

  @Column()
  participantCredits: number

}