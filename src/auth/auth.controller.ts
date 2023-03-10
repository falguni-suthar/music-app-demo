import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('/signup')
  async signUp(@Body() createAuthDto: CreateAuthDto): Promise<any> {
    const user = await this.authService.signUp(createAuthDto);
    await this.mailService.sendUserConfirmation(createAuthDto);
    return user;
  }
  
  @Post('/signin')
  signIn(@Body() signinAuthDto: SignInAuthDto ): Promise<any> {
    return this.authService.signIn(signinAuthDto);
  }

}
