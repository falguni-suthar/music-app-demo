import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SignInAuthDto {

     @IsBoolean()
     @IsNotEmpty()
     @ApiProperty()
     deviceType: boolean;

     @IsString()
     @ApiProperty()
     deviceId: string;

     @IsString()
     @ApiProperty()
     fcmToken: string;

     @IsString()
     @IsEmail()
     @ApiProperty()
     email: string;

     @IsString()
     @MinLength(6)
     @MaxLength(18)
     @ApiProperty({
          minimum: 6,
          maximum: 18
     })
     password: string;

}
