import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamesPayload } from './games.controller';
import { Game } from './games.entity';


@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private repository: Repository<Game>,
  ) {}

  findAll(): Promise<Game[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Game> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

 async createGame(game: GamesPayload): Promise<Game> {
    const createdGame = await this.repository.save(game)
    return createdGame
 }
}