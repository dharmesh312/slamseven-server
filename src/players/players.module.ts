import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  exports: [TypeOrmModule],
})
export class PlayersModule {}