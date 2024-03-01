import { UploadController } from '../../controllers/file/file.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UploadController],
})
export class FileModule {}
