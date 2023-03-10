import { Module } from '@nestjs/common';
import { UsermusicsService } from './usermusics.service';
import { UsermusicsController } from './usermusics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usermusic } from './entities/usermusic.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usermusic]), AuthModule],
  controllers: [UsermusicsController],
  providers: [UsermusicsService]
})
export class UsermusicsModule {}
