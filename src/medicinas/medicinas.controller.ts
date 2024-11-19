import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    Query,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { MedicinasService } from './medicinas.service';
  import { CreateMedicinaDto } from './dto/medicinas.dto';
  import { UpdateMedicinaDto } from './dto/updateMedicinas.dto';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
  
  @Controller('medicamentos/medicinas')
  export class MedicinasController {
    constructor(private readonly medicinaService: MedicinasService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async crearMedicina(@Body() createMedicinaDto: CreateMedicinaDto) {
      return this.medicinaService.crearMedicina(createMedicinaDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async obtenerMedicinas() {
      return this.medicinaService.obtenerMedicinas();
    }
  
    @UseGuards(JwtAuthGuard)
    @Put('update')
    async actualizarMedicina(
      @Query('id') id: number,
      @Body() updateMedicinaDto: UpdateMedicinaDto,
    ) {
      if (!id) {
        throw new Error('El parámetro id es obligatorio');
      }
      return this.medicinaService.actualizarMedicina(id, updateMedicinaDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
  async eliminarMedicina(@Query('id') id: number) {
    if (!id) {
      throw new Error('El parámetro id es obligatorio');
    }
    await this.medicinaService.eliminarMedicina(id);
    return { message: 'Medicina eliminada correctamente' };
  }
  
  }
  