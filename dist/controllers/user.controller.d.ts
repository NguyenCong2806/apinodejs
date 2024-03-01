import { Response } from 'express';
import { UserService } from 'src/services/user/user.service';
import { UpdateTodoDto } from '../models/viewmodel/user/UpdateUserDto';
import { CreateTodoDto } from '../models/viewmodel/user/CreateUserDto';
import SerachPara from 'src/models/BaseModel/SerachPara';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UserService);
    get(serachPara: SerachPara, res: Response): Promise<void>;
    find(id: string, res: Response): Promise<void>;
    create(createUserDto: CreateTodoDto, res: Response): Promise<void>;
    update(id: string, updateTodoDto: UpdateTodoDto, res: Response): Promise<void>;
    changpassword(id: string, updateTodoDto: UpdateTodoDto, res: Response): Promise<void>;
    delete(id: string, res: Response): Promise<void>;
}
