import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
  console.log(
    'server runing',
    `http://localhost:${parseInt(process.env.PORT, 10) || 3000}`,
  );
}
bootstrap();
