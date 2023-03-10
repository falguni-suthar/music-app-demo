import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Messages } from "src/helper/auth.messages";
import { Repository } from "typeorm";
import { User } from "./entities/auth.entity";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends  PassportStrategy(Strategy) {
     constructor(
          @InjectRepository(User)
          private userRepository: Repository<User>,
     ) {
          super({
               secretOrKey: process.env.JWT_SECRET,
               jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
          });
     }

     async validate(payload: JwtPayload): Promise<User> {
          const { email } = payload;
          const user: User = await this.userRepository.findOneBy({ email });

          if(!user) {
               throw new HttpException(Messages.invalidUser, HttpStatus.UNAUTHORIZED);
          }
          return user;
     }
} 