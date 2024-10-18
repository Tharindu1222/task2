import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific configuration
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from your frontend URL
    methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  // Increase request size limits
  app.use(bodyParser.json({ limit: '10mb' }));  // Allow JSON payloads up to 10MB
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Allow URL-encoded data up to 10MB

  await app.listen(3000);
}
bootstrap();
