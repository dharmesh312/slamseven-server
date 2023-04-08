import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, ValidationPipe } from '@nestjs/common';
import { Role, RoleEnum } from 'src/auth/role';
import { GamesService } from 'src/games/games.service';
import { SelectionsPayload } from 'src/selections/selections.service';
import { Public } from 'src/utils';
import { Ticket } from './tickets.entity';
import { TicketsService } from './tickets.service';

export class TicketsPayload {
    id: number;
    name: string;
    gameId: number;
    paymentType: string;
    paymentStatus: string;
    paymentReference: string;
    price: number;
    playerId: number;
    status: string;
    selections: SelectionsPayload[];
}

export class UpdateTicketPayload {
    selections: SelectionsPayload[];
}

export class DeletePayload {
    id: number;
}

@Controller('tickets')
export class TicketController {
    constructor(
        private ticketsService: TicketsService,
        private gamesService: GamesService,
       ) { }

    @Get() 
    @Role(RoleEnum.ROLE_ADMIN)
    async findAll(@Res() res, @Req() req): Promise<Ticket[]> {
        const tickets = await this.ticketsService.findAll()
        return res.status(HttpStatus.OK).json({
            error: false,
            tickets
        });
    }

    @Get('game/:gameId') 
    @Role(RoleEnum.ROLE_PLAYER)
    async findByGameId(@Res() res, @Param() params, @Req() req): Promise<Ticket[]> {
        const playerId = req.user.id;
        const ticketsGameId = Number(params.gameId)
        const tickets = await this.ticketsService.findByGameId(ticketsGameId, playerId)
        return res.status(HttpStatus.OK).json({
            error: false,
            tickets
        });
    }



    @Post('create')
    @Role(RoleEnum.ROLE_PLAYER)
    async createTicket(@Res() res, @Body(ValidationPipe) payload: TicketsPayload, @Req() req): Promise<TicketsPayload>  {
        const playerId = req.user.id;
        const game = await this.gamesService.findOne(payload.gameId)
        payload.name = 'ENTRY'
        payload.paymentType = 'WALLET'
        payload.paymentStatus = 'NOTATTEMPTED'
        payload.price = game.ticketPrice;
        payload.status = 'UNPAID'
        const ticket = await this.ticketsService.createTicket({...payload, playerId, })
        return res.status(HttpStatus.OK).json({
            error: false,
            ticket
        });
    }



    @Put(':ticketId/update')
    @Role(RoleEnum.ROLE_PLAYER)
    async updateTicketSelections(@Res() res, @Body(ValidationPipe) payload: UpdateTicketPayload, @Param() params, @Req() req ): Promise<UpdateTicketPayload> {
        const playerId = req.user.id;
        const ticketId = Number(params.ticketId)
        const ticket = await this.ticketsService.findOne(ticketId)
        if(ticket && ticket.playerId != playerId) return res.status(HttpStatus.BAD_REQUEST);

        const updatedTicket = await this.ticketsService.updateTicketSelections(ticket, payload.selections)
        return res.status(HttpStatus.OK).json({
            error: false,
            updatedTicket
        });
    }

    @Delete(':ticketId')
    @Role(RoleEnum.ROLE_PLAYER)
    async deleteTicket(@Res() res, @Param() params, @Req() req ): Promise<UpdateTicketPayload> {
        const playerId = req.user.id;
        const ticketId = Number(params.ticketId)
        const ticket = await this.ticketsService.findOne(ticketId)
        if(ticket && ticket.playerId != playerId) return res.status(HttpStatus.BAD_REQUEST);
         await this.ticketsService.deleteTicket(ticketId)
        return res.status(HttpStatus.OK).json({
            error: false,
        });
    }
}