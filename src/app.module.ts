import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration module global
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: +process.env.port,
      username: process.env.username,
      password: process.env.password,
      database: process.env.database,
      entities: [User],
      synchronize: true, // Solo para desarrollo
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
