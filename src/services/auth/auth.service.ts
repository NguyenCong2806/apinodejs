import { authvm } from './../../models/viewmodel/auth/authvm';
import { UserService } from './../user/user.service';
import { userlogin } from './../../models/viewmodel/auth/userlogin';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async signIn(data: userlogin): Promise<authvm> {
    const res = new authvm();
    // Check if user exists
    const user = await this.usersService.findOneValue({
      username: { $gte: data.username },
    });

    if (!user) throw new BadRequestException('Tài khoản không tồn tại!');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches) throw new BadRequestException('Nhập sai mật khẩu!');
    const payload = { userId: 123, role: 'admin' };
    const secretKey = 'your-secret-key';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    console.log(token);

    res.message = 'Đăng nhập thành công';
    res.role = user.role;
    res.status = true;
    res.statuscode = 200;
    res.userid = user.id;
    res.username = user.username;
    res.accessToken = 'ầdasdfasdfasdfasdfasdfa4123123';
    // res.refreshToken = jwt.sign(
    //   { _id: user.email, name: user.username },
    //   process.env.JWT_SECRET_REFRESH,
    //   {
    //     expiresIn: process.env.JWT_EXPIRE_REFRESH,
    //   },
    // );
    return res;
  }

  async logout() {}

  hashData(data: string) {
    return argon2.hash(data);
  }
}
