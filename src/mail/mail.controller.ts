import { 
     Body, 
     ClassSerializerInterceptor, 
     Controller, 
     Param, 
     Post, 
     Req, 
     UseGuards, 
     UseInterceptors 
} from "@nestjs/common";
import ConfirmEmailDto from "./dto/confirmEmail.dto";
import { MailService } from "./mail.service";

@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
     constructor(
          private readonly mailService: MailService
     ) {}

     /**verify email */
     @Post('confirm')
     async confirm(@Body() confirmationData: ConfirmEmailDto): Promise<any> {
          const email = await this.mailService.decodeConfirmationToken(confirmationData.token);
          return await this.mailService.confirmEmail(email);
     }

}