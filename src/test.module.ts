import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AppModule } from './app.module';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [

        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'skateboard3',
            database: 'prueba2',
            entities: [User],
            synchronize: true,
        }),

        TypeOrmModule.forFeature([User]),
        UserModule
    ],
  
})
export class TestModule {}
