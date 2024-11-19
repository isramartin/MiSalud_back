import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { MedicoDto } from './dto/medicos.dto';
import { MedicosService } from './medicos.service';
import { Medico } from './entity/medicos.entity';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';


@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicoService: MedicosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMedicoDto: MedicoDto, @Request() req): Promise<Medico> {
    const userId = req.user.id; 
    return this.medicoService.create(createMedicoDto, userId);
  }

   @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Medico[]> {
    const userId = req.user.id;
    return this.medicoService.findAll(userId);
  }

   @UseGuards(JwtAuthGuard)
  @Get('list')
  async findAllNamesAndIds(@Request() req): Promise<Pick<Medico, 'id' | 'nombre'>[]> {
    const userId = req.user.id;
    return this.medicoService.findAllNamesAndIds(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('view')
  async findById(@Query('id') id: number, @Request() req): Promise<Medico> {
    const userId = req.user.id;
    return this.medicoService.findById(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(
    @Query('id') id: number,
    @Body() updateMedicoDto: Partial<MedicoDto>,
    @Request() req,
  ): Promise<Medico> {
    const userId = req.user.id;
    return this.medicoService.update(id, updateMedicoDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Query('id') id: number, @Request() req): Promise<{ message: string }> {
    const userId = req.user.id;
    await this.medicoService.delete(id, userId);
    return { message: 'Médico eliminado exitosamente' };
  }
  
}