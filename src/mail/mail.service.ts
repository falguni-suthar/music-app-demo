import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { Messages } from 'src/helper/auth.messages';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class MailService {
     constructor(
          private mailerService: MailerService,
          private jwtService: JwtService,
          private authService: AuthService
     ) {}

     async sendUserConfirmation(createAuthDto: CreateAuthDto): Promise<any> {
          try {
               const { email, username } = createAuthDto;
               const payload: JwtPayload = { email };
               const token: string = await this.jwtService.sign(payload, { 
                    secret: process.env.JWT_SECRET,  
                    expiresIn: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME 
               });

               const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;               

               const sendMail = await this.mailerService.sendMail({
                    to: email,
                    subject: 'Welcome to Music world! confirm your email address.',
                    template: './confirmation',
                    context: {
                         name: username,
                         description: 'Click on the below link -',
                         url
                    }
               })

               if(!sendMail) {
                    throw new HttpException(Messages.sendEmailFailed, HttpStatus.BAD_GATEWAY);
               }
               return true;
               
          } catch (error) {
               throw error;
          }
     }

     public async confirmEmail(email: string): Promise<any> {
          const user = await this.authService.getByEmail(email);
          if (user.emailVerified) {
               throw new HttpException(Messages.emailAlreadyConfirm, HttpStatus.BAD_REQUEST);
          }
          return await this.authService.markEmailAsConfirmed(email);
     }

     public async decodeConfirmationToken(token: string): Promise<any> {
          try {
               const payload = await this.jwtService.verify(token, {
                    secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
               });

               if (typeof payload === 'object' && 'email' in payload) {
                    return payload.email;
               }

               throw new HttpException(Messages.badRequest, HttpStatus.BAD_REQUEST);
          } catch (error) {
               if (error?.name === 'TokenExpiredError') {
                    throw new HttpException(Messages.tokenExpired, HttpStatus.BAD_REQUEST);
               }
               throw new HttpException(Messages.badToken, HttpStatus.BAD_REQUEST);
          }
     }
}
