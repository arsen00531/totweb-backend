import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('totweb')
    .setDescription('Документация запросов REST API')
    .setVersion('1.0.0')
    .addTag('arsen00531')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transform is recomended configuration for avoind issues with arrays of files transformations
    }),
  );

  await app.listen(process.env.PORT || process.env.NEST_PORT || 3000);
}
bootstrap();
