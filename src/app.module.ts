import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MedicamentoModule } from './medicamento/medicamento.module';
import { AgendaModule } from './agenda/agenda.module';
import { User } from './users/entity/user.entity';
import { Auth } from './auth/entity/auth.entity';
import { Agenda } from './agenda/entity/agenda.entity'; // Incluye la entidad Agenda aquí

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno desde el archivo .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Auth, Agenda], // Incluye todas tus entidades aquí
      synchronize: true, // Solo en desarrollo
    }),
    UsersModule,
    AuthModule,
    MedicamentoModule,
    AgendaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  async onModuleInit() {
    this.logger.log('Conexión de base de datos exitosa');
  }
}
