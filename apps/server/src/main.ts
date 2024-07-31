import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {


  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT');

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'https://www.example.com',
      'https://app.example.com',
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
  });
  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });



  // somewhere in your initialization file
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(compression());
  app.use(helmet());


  await app.listen(3000);

  Logger.debug(`Server started on port ${PORT} with env ${process.env.NODE_ENV} and version ${process.env.npm_package_version}`);
}
bootstrap();
