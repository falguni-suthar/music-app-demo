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

  @ApiBody({
    required: true,
    type: "multipart/form-data",
    schema: {
      type: "object",
      properties: {
        image: {
          type: "string",
          format: "binary",
        },
        musicFile: {
          type: "string",
          format: "binary"
        },
        name: {
          type: "string"
        },
        duration: {
          type: "string",
          format: "time"
        }
      },
    },
  })
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
    ) {
      return this.usermusicsService.createMusic(user.id, createMusicDto, files);
  }
}
