import { Controller, Post, Body, Request, UseGuards, UnauthorizedException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'; // Importa el guard de JWT
import { AuthDto } from './dto/auth.dto'; // DTO para la autenticación
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.validateUser(createUserDto.email, createUserDto.contraseña);
    if (user) {
      const token = await this.authService.login(user);
      return res.json(token);
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}
