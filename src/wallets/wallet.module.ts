import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletCheckout } from './entities/wallet-checkout.entity';
import { WalletDeposit } from './entities/wallet-deposit.entity';
import { WalletPayout } from './entities/wallet-payout.entity';
import { WalletWithdrawal } from './entities/wallet-withdrawal.entity';
import { Wallet } from './entities/wallet.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, WalletDeposit, WalletCheckout, WalletWithdrawal, WalletPayout])],
  providers: [WalletService],
  controllers: [WalletController],
  exports: [TypeOrmModule],
})
export class WalletModule {}