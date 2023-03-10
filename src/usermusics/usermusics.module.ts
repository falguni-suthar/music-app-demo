import { Module } from '@nestjs/common';
import { UsermusicsService } from './usermusics.service';
import { UsermusicsController } from './usermusics.controller';

@Module({
  controllers: [UsermusicsController],
  providers: [UsermusicsService]
})
export class UsermusicsModule {}
