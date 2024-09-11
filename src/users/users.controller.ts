import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    create(@Body() createUserDto: Partial<User>): Promise<User> {
      return this.usersService.create(createUserDto);
    }
    
    @Get()
    findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
      return this.usersService.findOne(+id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.usersService.remove(+id);
    }
  }