import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import jwt, { Secret, JwtPayload } from "jsonwebtoken";


@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneValue({
      username: { $gte: username },
    });
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    if (await bcrypt.compare(user.password, hash)) {
      throw new UnauthorizedException();
    }else{
        const accessToken = jwt.sign(
            { _id: user.email, name: user.username },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRE,
            }
          );
        const refreshToken = jwt.sign(
            { _id: user.email, name: user.username },
            process.env.JWT_SECRET_REFRESH,
            {
              expiresIn: process.env.JWT_EXPIRE_REFRESH,
            }
          );
    }
    // return result;
  }
}
