import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressModule } from './user_address/user_address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: false,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      ssl: process.env.DB_SSL === 'true',
      extra:
        process.env.DB_SSL === 'true'
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : {},
    }),
    UsersModule,
    UserAddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
