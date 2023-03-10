import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor() {
          super({
               JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
               secretOrKey: process.env.JWT_SECRET
          })
     }

     async validate(payload: any) {
          return { userID: payload.sub, email: payload.email };
     }
}