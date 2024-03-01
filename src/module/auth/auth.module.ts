import { RefreshTokenStrategy } from './../../utils/auth/strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './../../utils/auth/strategies/accessToken.strategy';
import { AuthService } from './../../services/auth/auth.service';
import { Module } from '@nestjs/common';
import { UsersModule } from '../user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/controllers/auth/auth.controller';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
