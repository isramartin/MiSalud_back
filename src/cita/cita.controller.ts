import { Controller,Get, Post, Body, Param, Put, Delete, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/createCita.dto';
import { Cita } from './entity/cita.entity';
import { JwtAuthGuard } from 'guards/jwt-auth.guard'; // Importa el guard de JWT


@Controller('citas')
export class CitaController {
	constructor(private readonly citaService: CitaService){}

	@Post()
	async create(@Body() createCitaDto: CreateCitaDto): Promise<Cita>{
		return this.citaService.create(createCitaDto);
	}

	@UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
	@Get()
	async findAll(): Promise<Cita[]>{
		return this.citaService.findAll();
	}

	@UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
	@Get('view')
	async findById(@Query('id') id: number): Promise<Cita> {
	  console.log('Received ID:', id); // Agregar esta línea para depuración
	  if (!id) {
		throw new BadRequestException('Debe proporcionar un id para buscar.');
	  }
	  return this.citaService.findById(id);
	}

	@UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
	@Put('update')
	async update(@Param('id') id: number, @Body() updateCitaDto: CreateCitaDto): Promise<Cita>{
		return this.citaService.update(id, updateCitaDto);
	}

	@UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
	@Delete('delete')
	async remove(@Query('id') id: number): Promise<string>{
		return this.citaService.remove(id);
	}

}
