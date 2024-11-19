import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Put,
	Delete,
	Query,
	UseGuards,
	Request,
	BadRequestException,
  } from '@nestjs/common';
  import { CitaService } from './cita.service';
  import { CreateCitaDto } from './dto/createCita.dto';
  import { Cita } from './entity/cita.entity';
  import { JwtAuthGuard } from 'guards/jwt-auth.guard';
  
  @Controller('citas')
  export class CitaController {
	constructor(private readonly citaService: CitaService) {}
  
	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() createCitaDto: CreateCitaDto, @Request() req): Promise<Cita> {
	  const userId = req.user.id; // Obtén el ID del usuario logueado
	  return this.citaService.create(createCitaDto, userId);
	}
  
	@UseGuards(JwtAuthGuard)
	@Get()
	async findAll(@Request() req): Promise<Cita[]> {
	  const userId = req.user.id;
	  return this.citaService.findAll(userId);
	}
  
	@UseGuards(JwtAuthGuard)
	@Get('view')
	async findById(@Query('id') id: number, @Request() req): Promise<Cita> {
	  if (!id) {
		throw new BadRequestException('Debe proporcionar un id para buscar.');
	  }
	  const userId = req.user.id;
	  return this.citaService.findById(id, userId);
	}
  
	@UseGuards(JwtAuthGuard)
	@Put('update')
	async update(
	  @Query('id') id: number,
	  @Body() updateCitaDto: CreateCitaDto,
	  @Request() req,
	): Promise<Cita> {
	  const userId = req.user.id;
	  return this.citaService.update(id, updateCitaDto, userId);
	}
  
	@UseGuards(JwtAuthGuard)
	@Delete('delete')
	async remove(@Query('id') id: number, @Request() req): Promise<{ message: string }> {
	  const userId = req.user.id;
	  return this.citaService.remove(id, userId);
	}
  }
  