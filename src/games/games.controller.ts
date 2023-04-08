import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { Role, RoleEnum } from 'src/auth/role';
import { Public } from 'src/utils';
import { Game } from './games.entity';
import { GamesService } from './games.service';

export class GamesPayload {
    name: string;
    state: string;
    extTournamentId: string;
    maxTickets: number;
    ticketPrice: number;
}


@Controller('games')
export class GamesController {
    constructor(
        private gamesService: GamesService,
       ) { }

    @Get() 
    @Role(RoleEnum.ROLE_ADMIN, RoleEnum.ROLE_PLAYER)
    async findAll(@Res() res, @Req() req): Promise<Game[]> {
        const games = await this.gamesService.findAll()
        return res.status(HttpStatus.OK).json({
            error: false,
            games
        });
      }

    //   @Public()
      @Post('create')
      async createGame(@Res() res, @Body(ValidationPipe) payload: GamesPayload): Promise<any>  {
          const game = await this.gamesService.createGame(payload)
          return res.status(HttpStatus.OK).json({
              error: false,
              game
          });
      }

      @Get(':gameId')
      @Role(RoleEnum.ROLE_ADMIN)
      async findById(@Res() res, @Req() req, @Param() params): Promise<void> {
        const gameId = params.gameId
        const game = await this.gamesService.findOne(gameId)
        return res.status(HttpStatus.OK).json({
            error: false,
            game
        });
      }

}