import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from './entity/medicamentos.entity';
import { Dosis } from './entity/dosis.entity';
import { CreateMedicamentoDto } from './dto/medicamento.dto';
import { UpdateMedicamentoDto } from './dto/updateMediacamneto.dto';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private medicamentoRepository: Repository<Medicamento>,
    @InjectRepository(Dosis)
    private dosisRepository: Repository<Dosis>,
  ) {}

  async crearMedicamento(
    createMedicamentoDto: CreateMedicamentoDto,
  ): Promise<Medicamento> {
    const {
      nombre,
      unidad,
      frecuencia,
      numero_dosis,
      total_unidades,
      unidades_restantes,
      unidades_min,
      dosis,
    } = createMedicamentoDto;

    // Crear la entidad de medicamento
    const medicamento = this.medicamentoRepository.create({
      nombre,
      unidad,
      frecuencia,
      numero_dosis,
      total_unidades,
      unidades_restantes,
      unidades_min,
    });

    const savedMedicamento = await this.medicamentoRepository.save(medicamento);

    // Procesar las dosis y asignar `suministrada` como `false` por defecto si no se proporciona
    if (dosis && dosis.length > 0) {
      const dosisArray = dosis.map((dosisItem) =>
        this.dosisRepository.create({
          ...dosisItem,
          medicamento: savedMedicamento,
          suministrada: dosisItem.suministrada ?? false, // Establecer `suministrada` a `false` si es `undefined`
        }),
      );
      await this.dosisRepository.save(dosisArray);
    }

    return savedMedicamento;
  }

  async obtenerMedicamentos(): Promise<Medicamento[]> {
    return this.medicamentoRepository.find({ relations: ['dosis'] });
  }

  async obtenerMedicamentoPorId(id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
      relations: ['dosis'],
    });

    if (!medicamento) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }

    return medicamento;
  }

  async obtenerMedicamentoSimplePorId(id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
    });

    if (!medicamento) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }

    return medicamento;
  }

  //aqui el nuvo update
  async actualizarMedicamento(
    id: number,
    updateMedicamentoDto: UpdateMedicamentoDto,
  ): Promise<Medicamento> {
    console.log(`Actualizando medicamento con ID: ${id}`);
  
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
      relations: ['dosis'],
    });
  
    if (!medicamento) {
      console.error(`Medicamento con ID ${id} no encontrado`);
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }
  
    // Actualizar propiedades del medicamento
    Object.assign(medicamento, updateMedicamentoDto);
  
    // Procesar dosis actualizadas
    if (updateMedicamentoDto.dosis) {
      updateMedicamentoDto.dosis.forEach((dosisDto) => {
        const dosisExistente = medicamento.dosis.find(
          (d) =>
            d.numero_dosis === dosisDto.numero_dosis &&
            d.hora_dosis === dosisDto.hora_dosis,
        );
  
        if (dosisExistente) {
          // Mostrar información para depuración
          console.log(`Dosis existente:`, dosisExistente);
          console.log(`Dosis DTO:`, dosisDto);
  
          // Si la dosis es suministrada y antes no lo estaba, actualizar unidades_restantes
          console.log(`dosisDto.suministrada: ${dosisDto.suministrada}`);
          console.log(`dosisExistente.suministrada: ${dosisExistente.suministrada}`);
  
          if (dosisDto.suministrada && dosisExistente.suministrada) {
            console.log(
              `Actualizando unidades_restantes: ${medicamento.unidades_restantes} - ${dosisDto.cantidadP}`,
            );
            medicamento.unidades_restantes -= dosisDto.cantidadP;
            console.log(
              `Unidades restantes actualizadas: ${medicamento.unidades_restantes}`,
            );
          }
  
          // Actualizar la dosis existente
          dosisExistente.suministrada = dosisDto.suministrada;
          dosisExistente.cantidadP = dosisDto.cantidadP;
        }
      });
    }
  
    // Comprobar si unidades_restantes es menor o igual a unidades_min
    if (medicamento.unidades_restantes <= medicamento.unidades_min) {
      // Aquí podrías agregar la lógica de notificación si es necesario
    }
  
    // Guardar los cambios en la base de datos
    const updatedMedicamento = await this.medicamentoRepository.save(medicamento);
    console.log(`Medicamento después de guardar:`, updatedMedicamento);
    return updatedMedicamento;
  }

  async eliminarMedicamento(id: number): Promise<void> {
    if (!id) {
      throw new BadRequestException('ID del medicamento no proporcionado');
    }

    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
    });
    if (!medicamento) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }

    try {
      // Elimina las dosis asociadas
      await this.dosisRepository.delete({ medicamento: { id } });
      // Luego elimina el medicamento
      await this.medicamentoRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(
        'No se pudo eliminar el medicamento. Puede estar siendo utilizado.',
      );
    }
  }
}
