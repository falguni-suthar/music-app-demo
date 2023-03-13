import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UploadedFiles } from '@nestjs/common';
import { UsermusicsService } from './usermusics.service';
import { CreateUsermusicDto } from './dto/create-usermusic.dto';
import { UpdateUsermusicDto } from './dto/update-usermusic.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/entities/auth.entity';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Usermusic } from './entities/usermusic.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('music')
export class UsermusicsController {
  constructor(private readonly usermusicsService: UsermusicsService) {}

  @UseInterceptors(
    FileFieldsInterceptor(
    [
      { name: 'image', maxCount: 1 },
      { name: 'musicFile', maxCount: 1 },
    ],
    {
      storage: diskStorage({
        destination: 'src/usermusics/uploads',
        filename: (request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      })
    }
  ))

  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  @ApiBearerAuth('accesstoken')
  createMusic(
    @Body() createMusicDto: CreateUsermusicDto, 
    @getUser() user: User, 
    @UploadedFiles()
    files: { 
      image?: Express.Multer.File, 
      musicFile?: Express.Multer.File
    }
    ): Promise<any> {
      return this.usermusicsService.createMusic(user.id, createMusicDto, files);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/usermusic')
  @ApiBearerAuth('accesstoken')
  getUsersMusics(@getUser() user: User): Promise<any> {
    return this.usermusicsService.getUsersMusics(user.id);
  }

  @Get()
  getAllMusics(): Promise<any> {
    return this.usermusicsService.getAllMusics();
  }
}
