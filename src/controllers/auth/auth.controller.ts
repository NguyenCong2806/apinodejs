import { AuthService } from './../../services/auth/auth.service';
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }

}
