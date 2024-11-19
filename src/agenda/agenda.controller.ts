import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Put,
  Delete,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/createAgenda.dto';
import { Agenda } from './entity/agenda.entity';
import { JwtAuthGuard } from 'guards/jwt-auth.guard'; // Importa el guard de JWT

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createAgendaDto: CreateAgendaDto,
    @Request() req,
  ): Promise<Agenda> {
    const userId = req.user.id; // Obtiene el ID del usuario logueado
    return this.agendaService.create(createAgendaDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Agenda[]> {
    const userId = req.user.id;
    return this.agendaService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('view')
  async findById(@Query('id') id: number, @Request() req): Promise<Agenda> {
    if (!id) {
      throw new BadRequestException('Debe proporcionar un id para buscar.');
    }
    const userId = req.user.id;
    return this.agendaService.findById(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(
    @Query('id') id: number,
    @Body() updateAgendaDto: CreateAgendaDto,
    @Request() req,
  ): Promise<Agenda> {
    const userId = req.user.id;
    return this.agendaService.update(id, updateAgendaDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async remove(@Query('id') id: number, @Request() req): Promise<{ message: string }> {
    const userId = req.user.id;
    return this.agendaService.remove(id, userId);
  }
}
