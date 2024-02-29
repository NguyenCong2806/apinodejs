import { AuthService } from './../../services/auth/auth.service';
import { Module } from '@nestjs/common';
import { UsersModule } from '../user.module';
import { AuthController } from 'src/controllers/auth/auth.controller';

@Module({
    imports: [UsersModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
