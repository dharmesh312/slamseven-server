import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ParticipantPayload } from './participants.controller';
import { Participant } from './participants.entity';


@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private repository: Repository<Participant>,
  ) {}

  findAll(): Promise<Participant[]> {
    return this.repository.find();
  }

  findByPcptIds(partcipantIds): Promise<Participant[]> {
    return this.repository.find({ where: { id: In(partcipantIds) } })
  }

  findOne(id: number): Promise<Participant> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async createParticipants(payload: ParticipantPayload[]): Promise<Participant[]> {
    const pcpts = await this.repository.save(payload)
    return pcpts
  }
}