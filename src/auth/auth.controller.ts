import { Controller, Post, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'; // Importa el guard de JWT
import { AuthDto } from './dto/auth.dto'; // DTO para la autenticación


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const { email, contraseña } = authDto;
    const user = await this.authService.validateUser(email, contraseña);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)  // Protege la ruta con el guard JWT
  @Post('protected')
  getProtected(@Request() req) {
    return req.user; // Retorna la información del usuario del token JWT
  }
}
