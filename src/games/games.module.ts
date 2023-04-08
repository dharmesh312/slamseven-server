import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { Game } from './games.entity';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GamesService],
  controllers: [GamesController],
  exports: [TypeOrmModule],
})
export class GamesModule {}