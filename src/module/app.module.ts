import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app/app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user.module';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URL + process.env.DATABASE_NAME,
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
