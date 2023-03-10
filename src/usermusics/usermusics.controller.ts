import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsermusicsService } from './usermusics.service';
import { CreateUsermusicDto } from './dto/create-usermusic.dto';
import { UpdateUsermusicDto } from './dto/update-usermusic.dto';

@Controller('usermusics')
export class UsermusicsController {
  constructor(private readonly usermusicsService: UsermusicsService) {}

}
