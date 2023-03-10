import { PartialType } from '@nestjs/swagger';
import { CreateUsermusicDto } from './create-usermusic.dto';

export class UpdateUsermusicDto extends PartialType(CreateUsermusicDto) {}
