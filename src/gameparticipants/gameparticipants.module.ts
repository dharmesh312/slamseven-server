import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from 'src/participants/participants.entity';
import { ParticipantsService } from 'src/participants/participants.service';
import { GameParticipantsController } from './gameparticipants.controller';
import { GameParticipant } from './gameparticipants.entity';
import { GameParticipantsService } from './gameparticipants.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameParticipant]), TypeOrmModule.forFeature([Participant])],
  providers: [GameParticipantsService, ParticipantsService],
  controllers: [GameParticipantsController],
  exports: [TypeOrmModule],
})
export class GameParticipantsModule {}