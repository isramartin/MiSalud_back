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
  BadRequestException,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/createAgenda.dto';
import { Agenda } from './entity/agenda.entity';
import { JwtAuthGuard } from 'guards/jwt-auth.guard'; // Importa el guard de JWT

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  async create(@Body() createAgendaDto: CreateAgendaDto): Promise<Agenda> {
    return this.agendaService.create(createAgendaDto);
  }

  @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
  @Get()
  async findAll(): Promise<Agenda[]> {
    return this.agendaService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
  @Get('view')
  async findById(@Query('id') id: number): Promise<Agenda> {
    console.log('Received ID:', id); // Agregar esta línea para depuración
    if (!id) {
      throw new BadRequestException('Debe proporcionar un id para buscar.');
    }
    return this.agendaService.findById(id);
  }

  @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
  @Put('update')
  async update(
    @Param('id') id: number,
    @Body() updateAgendaDto: CreateAgendaDto,
  ): Promise<Agenda> {
    return this.agendaService.update(id, updateAgendaDto);
  }

  @UseGuards(JwtAuthGuard) // Protege esta ruta con el guard de JWT
  @Delete('delete')
  async remove(@Query('id') id: number): Promise<string> {
    return this.agendaService.remove(id);
  }
}
