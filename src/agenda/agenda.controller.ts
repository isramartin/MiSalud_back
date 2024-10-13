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
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/createAgenda.dto';
import { Agenda } from './entity/agenda.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'; // Importa el guard de JWT

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
  @Get('search')
  async findByName(@Query('nombre') nombre: string): Promise<Agenda[]> {
    return this.agendaService.findByName(nombre);
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
