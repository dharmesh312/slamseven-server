import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Player } from "src/players/players.entity";
import { PlayersService } from "src/players/players.service";


export interface JwtPayload {
    playerId: number,
    roleId: number,
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor(
  private playerService: PlayersService,
 ) {
  super({
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: 'SecretKey1234098756'
  })
 }

 async validate(payload: JwtPayload): Promise<any> {
  const { playerId } = payload;
  const player = await this.playerService.findOne( playerId )
  if (!player) {
   throw new UnauthorizedException();
  }
  return player;
 }
}

// export const GetPlayer = createParamDecorator((data: unknown, ctx: ExecutionContext): Player => {
//  const request = ctx.switchToHttp().getRequest();
//  return request.player;
// });