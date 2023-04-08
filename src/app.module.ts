import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
const configService = new ConfigService();
import * as fs from 'fs';
import { PlayersHttpModule } from './players/players-http.module';
import { ParticipantsModule } from './participants/participants.module';
import { GamesModule } from './games/games.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/role';
import { TicketsModule } from './tickets/tickets.module';
import { GameParticipantsModule } from './gameparticipants/gameparticipants.module';
import { RazorpayModule } from './payments/razorpay.module';
import { WalletModule } from './wallets/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.development.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      url: configService.get('DATABASE_URL'),
      type: 'mysql',
      database: 'slamseven',
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
      ssl: {
        ca: fs.readFileSync('/etc/ssl/cert.pem')
      },
    }),
    PlayersHttpModule,
    ParticipantsModule,
    GamesModule,
    TicketsModule,
    RazorpayModule,
    GameParticipantsModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
