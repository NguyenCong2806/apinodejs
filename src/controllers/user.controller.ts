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
import { Controller, Get } from '@nestjs/common';
import Results from 'src/models/BaseModel/Results';
import { UserService } from 'src/services/user/user.service';
import Paginations from 'src/models/BaseModel/Paginations';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get('getall')
  async get(
    @Param('paginations') paginations: Paginations,
  ): Promise<Results<User>> {
    return this.usersService.finds(paginations);
  }
  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.service.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
