import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from './../models/database/User';
import Results from 'src/models/BaseModel/Results';
import { UserService } from 'src/services/user/user.service';
import Paginations from 'src/models/BaseModel/Paginations';
import { UpdateTodoDto } from './../models/viewmodel/UpdateUserDto';
import { CreateTodoDto } from './../models/viewmodel/CreateUserDto';
import SerachPara from 'src/models/BaseModel/SerachPara';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}  

  @Get('getall')
  async get(@Query() serachPara: SerachPara, @Res() res: Response) {
    const pagination = new Paginations<User>();
    
    pagination.perPage = serachPara.pageindex;
    pagination.page = serachPara.pagesize;
    if (serachPara.keyword != null) {
      pagination.condition = { username: { $regex: serachPara.keyword } };
    }
    const respo = await this.usersService.finds(pagination);
    res.status(HttpStatus.OK).json(respo);
  }
  @Get('getbyuse/:id')
  async find(@Param('id') id: string, @Res() res: Response) {
    const respo = await this.usersService.findOne(id);
    res.status(HttpStatus.OK).json(respo);
  }
  @Post('adduser')
  async create(@Body() createUserDto: CreateTodoDto, @Res() res: Response) {
    const respo = await this.usersService.create(createUserDto);
    res.status(HttpStatus.CREATED).json(respo);
  }
  @Put('edituser/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Res() res: Response,
  ) {
    const respo = await this.usersService.update(id, updateTodoDto);
    res.status(HttpStatus.OK).json(respo);
  }

  @Delete('deluser/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const respo = await this.usersService.remove(id);
    res.status(HttpStatus.OK).json(respo);
  }
}
