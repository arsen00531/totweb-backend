import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${ENV}`, ENV === 'development' ? '.env' : ''],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow('TYPEORM_URL'),
        synchronize: false,
        entities: [User],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
