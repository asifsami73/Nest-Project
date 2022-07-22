import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { User } from 'src/database/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userController: UsersService) {}

  @Get('')
  getUsers(): Promise<User[]> {
    return this.userController.findAll();
  }
  @Post('')
  addNewUser(@Body() body): Promise<User> {
    return this.userController.inserOne(body);
  }
  @Get('/filter')
  filterUsers(@Query() body): Promise<User[]> {
    console.log('body', body);

    return this.userController.filterUsers(body);
  }
  @Get('/:id')
  getUserById(@Param('id') id): Promise<User> {
    return this.userController.findOne(id);
  }
  @Post('/:id')
  updateUserById(@Param('id') id, @Body() body): Promise<User> {
    return this.userController.updateOne(id, body);
  }
}
