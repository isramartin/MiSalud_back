import { Controller, Get, Param, Delete, Post, Body, Put, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto} from './dto/createUser.dto';
import { UpdateUserDto} from './dto/updateUser.dto'; // Importa los DTOs
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
    @Get('user')
    async findOne(@Query('id') id: string): Promise<User> {
        const user = await this.usersService.findOne(+id); // Convertir id a number
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
  
    @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
    @Put('update')
    async update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(+id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
    @Delete('delete')
    async remove(@Query('id') id: string): Promise<void> {
        await this.usersService.delete(+id);
    }
}
