import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { CreateMedicamentoDto } from './dto/medicamento.dto';
import { UpdateMedicamentoDto } from './dto/updateMediacamneto.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('medicamentos')
export class MedicamentoController {
  constructor(private readonly medicamentoService: MedicamentoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async crearMedicamento(@Body() medicamentodto: CreateMedicamentoDto) {
    return this.medicamentoService.crearMedicamento(medicamentodto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllMedicamentos() {
    return this.medicamentoService.obtenerMedicamentos();
  }

  @UseGuards(JwtAuthGuard)
  @Get('empaque')
  async findOneMedicamentoSimplePorId(@Query('id') id: number) {
    try {
      return await this.medicamentoService.obtenerMedicamentoSimplePorId(id);
    } catch (error) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('dosis')
  async findOneMedicamentoPorId(@Query('id') id: number) {
    return this.medicamentoService.obtenerMedicamentoPorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async actualizarMedicamento(
    @Query('id') id: number,
    @Body() medicamentoData: UpdateMedicamentoDto,
  ) {
    try {
      return await this.medicamentoService.actualizarMedicamento(
        id,
        medicamentoData,
      );
    } catch (error) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Query('id') id: number) {
    if (!id) {
      throw new BadRequestException('ID del medicamento no proporcionado');
    }
    if (isNaN(id)) {
      throw new BadRequestException('ID debe ser un número válido');
    }

    try {
      await this.medicamentoService.eliminarMedicamento(id);
      return { message: 'Medicamento eliminado correctamente' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
