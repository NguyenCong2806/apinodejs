import { authvm } from './../../models/viewmodel/auth/authvm';
import { UserService } from './../user/user.service';
import { userlogin } from './../../models/viewmodel/auth/userlogin';
export declare class AuthService {
    private usersService;
    constructor(usersService: UserService);
    signIn(data: userlogin): Promise<authvm>;
    logout(): Promise<void>;
    hashData(data: string): Promise<string>;
}
