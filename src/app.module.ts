import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/postgres.config';
import { MailModule } from './mail/mail.module';
import { CategoriesModule } from './categories/categories.module';
import { UsermusicsModule } from './usermusics/usermusics.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MailModule,
    CategoriesModule,
    CategoriesModule,
    UsermusicsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
