import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaController } from './cita.controller';
import { CitaService } from './cita.service';
import { Cita } from './entity/cita.entity';
import { User } from 'src/users/entity/user.entity';


@Module({
	imports: [TypeOrmModule.forFeature([Cita, User])],
	controllers: [CitaController],
	providers: [CitaService],
	exports: [CitaService],
})
export class CitaModule {}
