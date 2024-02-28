import { UserSchema } from './../models/database/User';
import { UsersRepository } from './../repository/user/UserRepository';
import { UserService } from './../services/user/user.service';
import { UsersController } from './user.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [
    UserService,
    { provide: 'IUserRepository', useClass: UsersRepository },
  ],
})
export class UsersModule {}
