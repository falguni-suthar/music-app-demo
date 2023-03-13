import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Codes } from 'src/helper/codes';
import { musicMessages } from 'src/helper/user-music.messages';
import { Repository } from 'typeorm';
import { CreateUsermusicDto } from './dto/create-usermusic.dto';
import { UpdateUsermusicDto } from './dto/update-usermusic.dto';
import { musicCategories } from './entities/music-categories.entity';
import { Usermusic } from './entities/usermusic.entity';

@Injectable()
export class UsermusicsService {
          @InjectRepository(Usermusic)
          private userMusicRepository: Repository<Usermusic>;
          @InjectRepository(musicCategories)
          private musicCategoriesRepo: Repository<musicCategories>;
          createQueryBuilder: any;

     async createMusic(userId: string, createMusicDto: CreateUsermusicDto, files: any): Promise<any> {
          try {
               const { name, duration, categories, artists } = createMusicDto;
               const music = new Usermusic()
               music.userId = userId;
               music.name = name;
               music.duration = duration;
               music.image = files.image[0].originalname;
               music.musicFile = files.musicFile[0].originalname;
               music.imageLocation = process.env.PROJECT_URL + files.image[0].path;
               music.musicLocation = process.env.PROJECT_URL + files.musicFile[0].path;

               const result = await this.userMusicRepository.save(music);

               if(result) {
                    const categoryArray = categories.split(',')

                    for(var i=0; i<categoryArray.length; i++) {

                         const catData = this.musicCategoriesRepo.create({
                              musicId : result.id,
                              categoryId : categoryArray[i],
                         })
                         await this.musicCategoriesRepo.save(catData);
                    }



                    const query = this.musicCategoriesRepo.createQueryBuilder('Usermusic');
                    query.where({ musicId: result.id })
                    const categoryData = await query.getMany();

                    return {
                         statusCode: Codes.Success,
                         messages: musicMessages.createSuccess,
                         musicData: {
                              id: result.id,
                              userId: result.userId,
                              name: result.name,
                              duration: result.duration,
                              image: result.image,
                              imageLocation: result.imageLocation,
                              musicFile: result.musicFile,
                              musicLocation: result.musicLocation,
                              categoryData
                         }
                    }
               }
               throw new HttpException(musicMessages.failedToCreate, HttpStatus.BAD_REQUEST);
              
          } catch (error) {
               throw error;
          }
     }

     async getUsersMusics(userId: string): Promise<any> {
          try {
               const query = this.userMusicRepository.createQueryBuilder('Usermusic');
               query.where({ userId })

               const musics = await query.getMany();

               if(!musics) {
                    throw new HttpException(musicMessages.failedToFetch, HttpStatus.BAD_REQUEST);
               }

               return {
                    statusCode: Codes.Success,
                    message: musicMessages.usersMusicFetched,
                    musics
               }
          } catch (error) {
               throw error;
          }
     }

     async getAllMusics(): Promise<any> {
          try {
               const musics = await this.userMusicRepository.find({ order: { id: "DESC" } });

               if(!musics) {
                    throw new HttpException(musicMessages.failedToFetch, HttpStatus.BAD_REQUEST);
               }

               return {
                    statusCode: Codes.Success,
                    message: musicMessages.usersMusicFetched,
                    musics
               }
          } catch (error) {
               throw error;
          }
     }
}
