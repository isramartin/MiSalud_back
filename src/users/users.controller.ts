import { Controller, Get, Param, Delete, Post, Body, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto} from './dto/createUser.dto';
import { UpdateUserDto} from './dto/UpdateUser.dto'; // Importa los DTOs
import { JwtAuthGuard } from 'guards/jwt-auth.guard'; // Importa el guard de JWT
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
    
    @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
    @Get() 
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
  
    @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(+id);
    }
  
    @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(+id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.delete(+id);
    }
}
