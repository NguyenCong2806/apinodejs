import { authvm } from './../../models/viewmodel/auth/authvm';
import { UserService } from './../user/user.service';
import { userlogin } from './../../models/viewmodel/auth/userlogin';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(data: userlogin): Promise<authvm> {
    const res = new authvm();
    // Check if user exists
    const filter = { username: data.username };
    const user = await this.usersService.findOneValue(filter);
    if (!user) throw new BadRequestException('Tài khoản không tồn tại!');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches) throw new BadRequestException('Nhập sai mật khẩu!');
    const payload = {
      userId: user.email,
      username: user.username,
      role: user.role,
    };

    res.message = 'Đăng nhập thành công';
    res.role = user.role;
    res.status = true;
    res.statuscode = 200;
    res.userid = user._id;
    res.username = user.username;
    res.accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE,
    });
    res.refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: process.env.JWT_EXPIRE_REFRESH,
    });
    return res;
  }

  async logout() {}

  hashData(data: string) {
    return argon2.hash(data);
  }
}
