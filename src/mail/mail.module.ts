import { MailerModule } from '@nestjs-modules/mailer';
import { forwardRef, Global, Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailConfirmationController } from './mail.controller';
import * as dotenv from 'dotenv';
dotenv.config();


@Global()
@Module({
  imports: [ 
    forwardRef(() => AuthModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME
      }
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        },
      },
      defaults: {
        from: `"No reply" <${ process.env.MAIL_FROM }>`
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        }
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [EmailConfirmationController]
})
export class MailModule {}
