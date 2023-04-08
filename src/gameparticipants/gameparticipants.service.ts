import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from 'src/participants/participants.entity';
import { ParticipantsService } from 'src/participants/participants.service';
import { Repository } from 'typeorm';
import { GameParticipantPayload } from './gameparticipants.controller';
import { GameParticipant } from './gameparticipants.entity';

interface GamePcpt {
  id: number;
  gameId: number;
  participantId: number;
  participantCredits: number;
  pcptInfo : Participant
}

@Injectable()
export class GameParticipantsService {
  constructor(
    @InjectRepository(GameParticipant)
    private repository: Repository<GameParticipant>,
    private partcipantsService: ParticipantsService,
  ) {}

  findAll(): Promise<GameParticipant[]> {
    return this.repository.find();
  }

  async findByGameId(gameId) : Promise<GamePcpt[]> {
    const gamePcpts = await this.repository.findBy({ gameId });
    const pcptIds = gamePcpts.map(it => it.participantId);
    const pcpts = await this.partcipantsService.findByPcptIds(pcptIds)
    const pcptPlayers = [];
    gamePcpts.map(gp => {
      const pcptInfo = pcpts.find(it => it.id === gp.participantId)
      pcptPlayers.push({ ...gp, pcptInfo })
    })
    return pcptPlayers
  }

  findOne(id: number): Promise<GameParticipant> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async createGameParticipants(payload: GameParticipantPayload[]): Promise<GameParticipant[]> {
    const pcpts = await this.repository.save(payload)
    return pcpts
  }

  async updateGameParticipants(payload : GameParticipantPayload[]) :Promise<GameParticipant[]> {
    await this.repository.upsert(payload, [ 'id' ])
    const pcpts = await this.repository.find();
    return pcpts
  }
}