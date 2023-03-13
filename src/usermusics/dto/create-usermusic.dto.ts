import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUsermusicDto {

     @ApiProperty({ type: 'string', format: 'binary' })
     image: any;

     @ApiProperty({ type: 'string', format: 'binary' })
     musicFile: any;

     @IsString()
     @ApiProperty()
     name: string;

     @IsString()
     @ApiProperty({ type: 'string', format: 'time'})
     duration: string;

     @IsString()
     @ApiProperty({ type: [String] })
     categories: string;

     @IsString()
     @ApiProperty({ type: [String] })
     artists: string;

}
