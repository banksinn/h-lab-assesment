import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as express from 'express';
import * as compression from 'compression';
import { TrimStringPipe } from '@/pipes/trim-string.pipe';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalPipes(new TrimStringPipe());
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '6mb' }));
  const config = new DocumentBuilder()
    .setTitle('API Multilingual Product Documentation')
    .setDescription('The documentation which used by H-Lab Assesment')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documents', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      filter: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
