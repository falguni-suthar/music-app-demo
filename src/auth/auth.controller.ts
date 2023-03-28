import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';

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

  @Get('user-list-pdf')
  async getAllUserPdf(@Res() res) {
    const buffer = await this.authService.secondExample();

    res.set({
      // pdf
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=pdf.pdf`,
      'Content-Length': buffer.length,
      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });

  res.end(buffer);
  }

}
