import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectionsPayload, SelectionsService } from 'src/selections/selections.service';
import { Repository } from 'typeorm';
import { TicketsPayload, UpdateTicketPayload } from './tickets.controller';
import { Ticket } from './tickets.entity';

export interface OrmSelection {
  name: string;
  gameId: number;
  ticketId: number;
  playerId: number;
  role: string;
  gameParticipantId: number;
  type: string;
  position: number;
}

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private repository: Repository<Ticket>,
    private selectionsService: SelectionsService,
  ) {}

  findAll(): Promise<Ticket[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Ticket> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByGameId(gameId: number, playerId: number): Promise<any[]> {
    const tickets = await this.repository.findBy({ gameId, playerId });
    const ticketIds = tickets.map(it => it.id)
    const allTicketSelections = await this.selectionsService.findByTicketIds(ticketIds);
    const ticketsWithSelections = [];
    tickets.map(ticket => {
      const selections = allTicketSelections.filter(sel => sel.ticketId === ticket.id) 
      ticketsWithSelections.push({ ...ticket, selections })
    })
    return ticketsWithSelections;
  }

  async createTicket(ticket: TicketsPayload): Promise<any> {
    const { selections, ...ormTicket} = ticket;
    const createdTicket = await this.repository.save(ormTicket)
    let createdSelections;

    if(createdTicket) {
      console.log(selections)
      const ormSelections: OrmSelection[] = [];
      selections.forEach(sel => {
        ormSelections.push({
          name: '',
          gameId: createdTicket.gameId,
          ticketId: createdTicket.id,
          playerId: createdTicket.playerId,
          role: sel.role,
          gameParticipantId: sel.gameParticipantId,
          type: "",
          position: sel.position
        })
      })
      createdSelections = await this.selectionsService.createSelections(ormSelections)
      console.log(createdSelections)
    }

    return {...createdTicket, selections: createdSelections}
  }

  async updateTicketSelections(ticket: Ticket, selections: SelectionsPayload[]): Promise<any> {

    const { gameId, playerId } = ticket;
    const ticketId = ticket.id;
    const ormSelections: OrmSelection[] = [];

    const deletedResponse = await this.selectionsService.deleteSelections(ticketId)
    console.log(deletedResponse)
    if(deletedResponse) {
      selections.forEach(sel => {
        ormSelections.push({
            name: '',
            gameId,
            ticketId,
            playerId,
            role: sel.role,
            gameParticipantId: sel.gameParticipantId,
            type: "",
            position: sel.position
        })
      })
    }
   
    const updatedSelections = await this.selectionsService.createSelections(ormSelections)
    return {...ticket, selections: updatedSelections }
  }

  async deleteTicket(ticketId) : Promise<any> {
    return this.repository.createQueryBuilder().softDelete().whereInIds(ticketId).execute();
  }
}