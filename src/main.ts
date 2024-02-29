import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './Filter/AllExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
  console.log(
    'server runing',
    `http://localhost:${parseInt(process.env.PORT, 10) || 3000}`,
  );
}
bootstrap();
