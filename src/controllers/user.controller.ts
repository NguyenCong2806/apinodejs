import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './../models/database/User';
import Results from 'src/models/BaseModel/Results';
import { UserService } from 'src/services/user/user.service';
import Paginations from 'src/models/BaseModel/Paginations';
import { UpdateTodoDto } from './../models/viewmodel/UpdateUserDto';
import { CreateTodoDto } from './../models/viewmodel/CreateUserDto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('getall')
  async get(
    @Param('perPage') perPage: number,
    @Param('page') page: number,
  ): Promise<Results<User>> {
    const pagination = new Paginations();
    pagination.perPage = perPage | 1;
    pagination.page = page | 10;
    //pagination.field = null;
    return this.usersService.finds(pagination);
  }
  @Get('getbyuse/:id')
  async find(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
  @Post('adduser')
  async create(@Body() createUserDto: CreateTodoDto) {
    return await this.usersService.create(createUserDto);
  }
  @Put('edituser/:id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.usersService.update(id, updateTodoDto);
  }

  @Delete('deluser/:id')
  async delete(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
