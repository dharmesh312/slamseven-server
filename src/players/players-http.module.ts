
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt-strategy';

import { PlayersController } from './players.controller';
import { PlayersModule } from './players.module';
import { PlayersService } from './players.service';

@Module({
  imports: [PlayersModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
     }),
     JwtModule.register({
      secret: 'SecretKey1234098756',
      signOptions: {
       expiresIn: 2592000,
      }
     }),
   ],
  providers: [PlayersService, JwtStrategy],
  controllers: [PlayersController],
  exports: [JwtStrategy, PassportModule]
})
export class PlayersHttpModule {}
