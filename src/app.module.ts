import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { TokenModule } from './token/token.module';
import { Token } from './token/entity/token.entity';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

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
        synchronize: true ? ENV === 'development' : false,
        entities: [User, Token],
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('SMTP_HOST'),
          port: configService.getOrThrow('SMTP_PORT'),
          secure: false,
          auth: {
            user: configService.getOrThrow('SMTP_USER'),
            pass: configService.getOrThrow('SMTP_PASS'),
          },
        },
        template: {
          dir: __dirname + './template/notification',
          adapter: new PugAdapter({ inlineCssEnabled: true }),
          options: {
            strict: true,
          },
        },
      }),
    }),
    TokenModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
