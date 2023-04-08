import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { Role, RoleEnum } from 'src/auth/role';

export class WalletPayload {
    playerId: number;
    balance: number;
}


@Controller('wallet')
export class WalletController {
    constructor(

       ) { }

    // @Get() 
    // @Role(RoleEnum.ROLE_ADMIN, RoleEnum.ROLE_PLAYER)
    // async findAll(@Res() res, @Req() req): Promise<Game[]> {
    //     const games = await this.gamesService.findAll()
    //     return res.status(HttpStatus.OK).json({
    //         error: false,
    //         games
    //     });
    //   }
}