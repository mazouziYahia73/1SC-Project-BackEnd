import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {whitelist : true }
 ));


 useContainer(app.select(AppModule), { fallbackOnErrors: true });
 app.enableCors()
  await app.listen(3000 , '192.168.1.40');
}
bootstrap();
