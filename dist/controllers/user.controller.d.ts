import { User } from './../models/database/User';
import Results from 'src/models/BaseModel/Results';
import { UserService } from 'src/services/user/user.service';
import { UpdateTodoDto } from './../models/viewmodel/UpdateUserDto';
import { CreateTodoDto } from './../models/viewmodel/CreateUserDto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UserService);
    get(perPage: number, page: number): Promise<Results<User>>;
    find(id: string): Promise<User>;
    create(createUserDto: CreateTodoDto): Promise<boolean>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
