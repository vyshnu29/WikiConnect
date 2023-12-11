import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import * as serviceAccountKey from './config/serviceAccountKey.json';

function initializeFirebase() {
  const logger = new Logger('Firebase');
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccountKey as admin.ServiceAccount,
      ),
      storageBucket: `gs://${serviceAccountKey.project_id}.appspot.com`,
    });
    logger.log('Firebase initialized');
  } else {
    logger.log('Firebase already initialized');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get(Logger));
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Wiki Microservice')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document, {
    jsonDocumentUrl: '/api/docs/swagger.json',
    swaggerOptions: {
      url: '/api/docs/swagger.json',
      displayRequestDuration: true,
    },
  });

  app.enableCors({ origin: '*' });

  await app.listen(process.env.PORT || 8080);
}
initializeFirebase();
bootstrap().catch((err) => console.error(err));
