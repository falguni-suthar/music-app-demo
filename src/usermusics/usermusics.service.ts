import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Codes } from 'src/helper/codes';
import { musicMessages } from 'src/helper/user-music.messages';
import { Repository } from 'typeorm';
import { CreateUsermusicDto } from './dto/create-usermusic.dto';
import { UpdateUsermusicDto } from './dto/update-usermusic.dto';
import { Usermusic } from './entities/usermusic.entity';

@Injectable()
export class UsermusicsService {
     constructor(
          @InjectRepository(Usermusic)
          private userMusicRepository: Repository<Usermusic>
     ) {}

     async createMusic(userId: string, createMusicDto: CreateUsermusicDto, files: any): Promise<any> {
          try {
               const { name, duration } = createMusicDto;
               const music = new Usermusic()
               music.userId = userId;
               music.name = name;
               music.duration = duration;
               music.image = files.image[0].originalname;
               music.musicFile = files.musicFile[0].originalname;
               music.imageLocation = process.env.PROJECT_URL + files.image[0].path;
               music.musicLocation = process.env.PROJECT_URL + files.musicFile[0].path;

               const result = await this.userMusicRepository.save(music);

               if(!result) {
                    throw new HttpException(musicMessages.failedToCreate, HttpStatus.BAD_REQUEST);
               } else {
                    return {
                         statusCode: Codes.Success,
                         messages: musicMessages.createSuccess,
                         music
                    }
               }
              
          } catch (error) {
               throw error;
          }
     }
}
