import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../guards/jwt-strategy';  // Asegúrate de que la ruta sea correcta
import { UsersModule } from '../users/users.module'; // Módulo de usuarios
import { ConfigModule, ConfigService } from '@nestjs/config'; // Configuración para el JWT_SECRET

@Module({
  imports: [
    ConfigModule.forRoot(), // Asegúrate de que esto esté importado
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '120m' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
