import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MedicamentoModule } from './medicamento/medicamento.module';
import { AgendaModule } from './agenda/agenda.module';
import { CitaModule } from './cita/cita.module';
import { User } from './users/entity/user.entity';
import { Auth } from './auth/entity/auth.entity';
import { Agenda } from './agenda/entity/agenda.entity';
import { Cita } from './cita/entity/cita.entity';
import { Medicamento } from './medicamento/entity/medicamentos.entity';
import { Dosis } from './medicamento/entity/dosis.entity';
// Incluye la entidad aquí

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno desde el archivo .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [User, Auth, Agenda, Cita, Medicamento, Dosis], // Incluye todas tus entidades aquí
      ssl: {
        rejectUnauthorized: false, // Esto permite conexiones con certificados autofirmados o no verificados
      },
      synchronize: true, // Solo en desarrollo
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    MedicamentoModule,
    AgendaModule,
    CitaModule,
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
