import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginPayload, SignupPayload } from './players.controller';
import { Repository } from 'typeorm';
import { Player } from './players.entity';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-strategy';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<Player[]> {
    return this.playersRepository.find();
  }

  findOne(id: number): Promise<Player> {
    return this.playersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<Player> {
    return this.playersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.playersRepository.delete(id);
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
   }

  async create(playerdata: SignupPayload): Promise<Player> {
    const { email, password, firstname, lastname, phoneNumber } = playerdata;

    const user = await this.findByEmail(email);
    if (!user) {
      const salt = await bcrypt.genSalt();
      const saltedPassword = await this.hashPassword(password, salt);

      const player = new Player();
      player.email = email;
      player.password = saltedPassword;
      player.roleId = 1;
      player.firstName = firstname;
      player.lastName = lastname;
      player.phoneNumber = phoneNumber;

      const createdPlayer = await this.playersRepository.save(player);
      // console.log(createdPlayer)
      return createdPlayer;
    } else {
     throw new ConflictException('Email Exists')
    }
  }

  async login(payload: LoginPayload): Promise<any> {
    const { email, password } = payload;
    const player = await this.findByEmail(email);
    if (player && await bcrypt.compare(password, player.password)) {
     const payload: JwtPayload = { playerId: player.id, roleId: player.roleId };
     const accessToken = await this.jwtService.sign(payload);
     return { accessToken }
    } else {
     throw new UnauthorizedException('Invalid Credentials')
    }
   }
}