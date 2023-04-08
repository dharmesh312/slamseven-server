import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletPayload } from './wallet.controller';


@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private repository: Repository<Wallet>,
  ) {}

  findAll(): Promise<Wallet[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Wallet> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

 async createWallet(wallet: WalletPayload): Promise<Wallet> {
    return await this.repository.save(wallet)
 }
}