import { Body, Controller, Get, HttpStatus, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { Role, RoleEnum } from 'src/auth/role';
import { Public } from 'src/utils';
import { Participant } from './participants.entity';
import { ParticipantsService } from './participants.service';

export class ParticipantPayload {
    firstname: string;
    lastname: string;
    country: string;
    imageUrl: string;
    extId: string;
    tour: string;
}


@Controller('participants')
export class ParticipantsController {
    constructor(
        private particpantsService: ParticipantsService
       ) { }

    @Get() 
    @Role(RoleEnum.ROLE_ADMIN, RoleEnum.ROLE_PLAYER)
    async findAll(@Res() res,): Promise<Participant[]> {
        const players = await this.particpantsService.findAll()
        return res.status(HttpStatus.OK).json({
            error: false,
            players
        });
      }

      @Post('create')
      @Role(RoleEnum.ROLE_ADMIN)
      async createParticipants(@Res() res, @Body(ValidationPipe) payload: ParticipantPayload[]): Promise<any>  {
          const player = await this.particpantsService.createParticipants(payload)
          return res.status(HttpStatus.OK).json({
              error: false,
              player
          });
      }

}