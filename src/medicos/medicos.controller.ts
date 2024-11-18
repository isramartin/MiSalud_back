import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { MedicoDto } from './dto/medicos.dto';
import { MedicosService } from './medicos.service';
import { Medico } from './entity/medicos.entity';


@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicoService: MedicosService) {}

  @Post()
  async create(@Body() createMedicoDto: MedicoDto): Promise<Medico> {
    return this.medicoService.create(createMedicoDto);
  }

  @Get()
  async findAll(): Promise<Medico[]> {
    return this.medicoService.findAll();
  }

  @Get('list')
  async findAllNamesAndIds(): Promise<Pick<Medico, 'id' | 'nombre'>[]> {
    return this.medicoService.findAllNamesAndIds();
  }

  @Get('view')
  async findById(@Query('id') id: number): Promise<Medico> {
    if (!id) {
      throw new Error('El parámetro id es obligatorio');
    }
    return this.medicoService.findById(id);
  }

  @Put('update')
  async update(
    @Query('id') id: number,
    @Body() updateMedicoDto: Partial<MedicoDto>,
  ): Promise<Medico> {
    if (!id) {
      throw new Error('El parámetro id es obligatorio');
    }
    return this.medicoService.update(id, updateMedicoDto);
  }

  @Delete('delete')
  async delete(@Query('id') id: number): Promise<{ message: string }> {
    if (!id) {
      throw new Error('El parámetro id es obligatorio');
    }
    await this.medicoService.delete(id);
    return { message: 'Médico eliminado exitosamente' };
  }
  
}