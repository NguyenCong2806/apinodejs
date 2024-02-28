import { User } from './../models/database/User';
import { UserService } from 'src/services/user/user.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UserService);
    get(): Promise<Array<User>>;
}
