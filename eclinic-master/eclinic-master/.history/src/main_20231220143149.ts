import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.json({ limit: '10mb' }));
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000);

}
bootstrap();
