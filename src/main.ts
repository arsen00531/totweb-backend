import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const origins: string = configService.getOrThrow('CORS_ORIGIN');

  app.use(cookieParser());
  app.enableCors({ origin: origins.split(','), credentials: true });

  await app.listen(5000);
}
bootstrap();
