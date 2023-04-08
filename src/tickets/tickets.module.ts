import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from 'src/games/games.module';
import { GamesService } from 'src/games/games.service';
import { SelectionsModule } from 'src/selections/selections.module';
import { SelectionsService } from 'src/selections/selections.service';
import { TicketController } from './tickets.controller';
import { Ticket } from './tickets.entity';
import { TicketsService } from './tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), SelectionsModule, GamesModule],
  providers: [SelectionsService, TicketsService, GamesService],
  controllers: [TicketController],
  exports: [TypeOrmModule],
})
export class TicketsModule {}