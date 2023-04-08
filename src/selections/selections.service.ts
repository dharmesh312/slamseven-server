import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrmSelection } from 'src/tickets/tickets.service';
import { In, Repository } from 'typeorm';
import { Selection } from './selections.entity';

export interface SelectionsPayload {
  id: number;
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
export class SelectionsService {
  constructor(
    @InjectRepository(Selection)
    private repository: Repository<Selection>,
  ) {}

  findAll(): Promise<Selection[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Selection> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  findByGameId(gameId: number): Promise<Selection[]> {
    return this.repository.findBy({ gameId })
  }

  findByTicketIds(ticketIds: number[]): Promise<Selection[]> {
    return this.repository.find({ where : { ticketId: In(ticketIds) }})
  }

  async createSelections(selections: OrmSelection[]): Promise<Selection[]> {
    const createdSelection = await this.repository.save(selections)
    return createdSelection
  }

  async deleteSelections(ticketId: number): Promise<any> {
    const selections = await this.repository.find({ where: { ticketId }})
    const selectionIds = selections.map(sel => sel.id)
    return this.repository.createQueryBuilder().softDelete().whereInIds(selectionIds).execute();
  }
}