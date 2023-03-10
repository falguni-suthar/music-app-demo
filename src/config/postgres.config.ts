import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
     type: 'postgres',
     host: process.env.DB_HOST,
     port: parseInt(process.env.DB_PORT),
     database: process.env.DB_DATABASE,
     username: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD,
     entities: [__dirname + '/../**/*.entity{ .ts,.js}'],
     migrationsRun: false,
     synchronize: true
}