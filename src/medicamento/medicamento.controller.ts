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
  Request 
} from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { CreateMedicamentoDto } from './dto/medicamento.dto';
import { UpdateMedicamentoDto } from './dto/updateMediacamneto.dto';
import { JwtAuthGuard } from 'guards/jwt-auth.guard'; // Importa el guard de JWT

@Controller('medicamentos')
export class MedicamentoController {
  constructor(private readonly medicamentoService: MedicamentoService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async crearMedicamento(
    @Body() medicamentodto: CreateMedicamentoDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.medicamentoService.crearMedicamento(medicamentodto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllMedicamentos(@Request() req) {
    const userId = req.user.id;
    return this.medicamentoService.obtenerMedicamentos(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('empaque')
  async findOneMedicamentoSimplePorId(@Query('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.medicamentoService.obtenerMedicamentoSimple(id, userId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('dosis')
  async findOneMedicamentoPorId(@Query('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.medicamentoService.obtenerMedicamento(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async actualizarMedicamento(
    @Query('id') id: number,
    @Body() medicamentoData: UpdateMedicamentoDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.medicamentoService.actualizarMedicamento(id, medicamentoData, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Query('id') id: number, @Request() req) {
    const userId = req.user.id;
    if (!id) {
      throw new BadRequestException('ID del medicamento no proporcionado');
    }
    return this.medicamentoService.eliminarMedicamento(id, userId);
  }
}
