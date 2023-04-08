import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsController } from './participants.controller';
import { Participant } from './participants.entity';
import { ParticipantsService } from './participants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [ParticipantsService],
  controllers: [ParticipantsController],
  exports: [TypeOrmModule],
})
export class ParticipantsModule {}