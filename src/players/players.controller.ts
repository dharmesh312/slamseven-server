import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Public } from 'src/utils';
import { Player } from './players.entity';
import { PlayersService } from './players.service';

export class SignupPayload {
    email: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    password: string;
}

export class LoginPayload {
    email: string;
    password: string;
}

@Controller('')
export class PlayersController {
    constructor(
        private playersService: PlayersService
       ) { }

    @Get() 
    async findAll(@Res() res,): Promise<Player[]> {
        const players = await this.playersService.findAll()
        return res.status(HttpStatus.OK).json({
            error: false,
            players
           });
      }

      @Public()
      @Post('signup')
      async createPlayer(@Res() res, @Body(ValidationPipe) payload: SignupPayload): Promise<any>  {
          const player = await this.playersService.create(payload)
          return res.status(HttpStatus.OK).json({
              error: false,
              player
          });
      }
  
      @Public()
    //   @UseGuards(AuthGuard('local'))
      @Post('login')
      async login(@Res() res, @Body(ValidationPipe) payload: LoginPayload): Promise<any> {
          const accessToken = await this.playersService.login(payload)
          return res.status(HttpStatus.OK).json({
              error: false,
              data: accessToken
          });
      }
  



}