import { Module } from '@nestjs/common';
import { UsermusicsService } from './usermusics.service';
import { UsermusicsController } from './usermusics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usermusic } from './entities/usermusic.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { musicCategories } from './entities/music-categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usermusic]),
    TypeOrmModule.forFeature([musicCategories]), 
    AuthModule, 
    CategoriesModule
  ],
  controllers: [UsermusicsController],
  providers: [UsermusicsService]
})
export class UsermusicsModule {}
