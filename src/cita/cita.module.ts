import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaController } from './cita.controller';
import { CitaService } from './cita.service';
import { Cita } from './entity/cita.entity';


@Module({
	imports: [TypeOrmModule.forFeature([Cita])],
	controllers: [CitaController],
	providers: [CitaService],
	exports: [CitaService],
})
export class CitaModule {}
