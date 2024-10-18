import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific configuration
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from your frontend URL
    methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  await app.listen(3000);
}
bootstrap();
