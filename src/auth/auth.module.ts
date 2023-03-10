import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => MailModule),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule, JwtStrategy]
})
export class AuthModule {}
