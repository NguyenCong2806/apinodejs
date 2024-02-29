import { UserService } from '../user/user.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UserService);
    signIn(username: string, password: string): Promise<any>;
}
