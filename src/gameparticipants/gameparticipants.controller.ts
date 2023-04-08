import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { Role, RoleEnum } from 'src/auth/role';
import { GameParticipant } from './gameparticipants.entity';
import { GameParticipantsService } from './gameparticipants.service';

export class GameParticipantPayload {
    id: number;
   gameId: number;
   participantId: number;
   participantCredits: number;
}


@Controller('gameparticipants')
export class GameParticipantsController {
    constructor(
        private gameParticpantsService: GameParticipantsService
       ) { }

    @Get(':gameId') 
    async findAll(@Res() res, @Param() params): Promise<GameParticipant[]> {
        const gameId = Number(params.gameId)
        const gameParticipants = await this.gameParticpantsService.findByGameId(gameId)
        return res.status(HttpStatus.OK).json({
            error: false,
            gameParticipants
        });
    }

    @Post('create')
    @Role(RoleEnum.ROLE_ADMIN)
    async createGameParticipants(@Res() res, @Body(ValidationPipe) payload: GameParticipantPayload[]): Promise<any>  {
        const gameParticipants = await this.gameParticpantsService.createGameParticipants(payload)
        return res.status(HttpStatus.OK).json({
            error: false,
            gameParticipants
        });
    }

    @Put('update')
    @Role(RoleEnum.ROLE_ADMIN)
    async updateGameParticipants(@Res() res, @Body(ValidationPipe) payload: GameParticipantPayload[]): Promise<any>  {
        const gameParticipants = await this.gameParticpantsService.updateGameParticipants(payload)
        return res.status(HttpStatus.OK).json({
            error: false,
            gameParticipants
        });
    }

}