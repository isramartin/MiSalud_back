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
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(Medicamento)
    private medicamentoRepository: Repository<Medicamento>,
    @InjectRepository(Dosis)
    private dosisRepository: Repository<Dosis>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async crearMedicamento(
    createMedicamentoDto: CreateMedicamentoDto,
    userId: number,
  ): Promise<Medicamento> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }
  
    // Asocia las dosis al medicamento directamente usando cascade
    const medicamento = this.medicamentoRepository.create({
      ...createMedicamentoDto,
      user,
      dosis: createMedicamentoDto.dosis.map((dosisItem, index) => ({
        ...dosisItem,
        numero_dosis: index + 1, // Generar numero_dosis automáticamente
      })),
    });
  
    return this.medicamentoRepository.save(medicamento); // cascade guardará las dosis automáticamente
  }
  
  
  

  async obtenerMedicamentos(userId: number): Promise<Medicamento[]> {
    return this.medicamentoRepository.find({
      where: { user: { id: userId } },
      relations: ['dosis'],
    });
  }

  async obtenerMedicamento(id: number, userId: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['dosis'],
    });

    if (!medicamento) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }

    return medicamento;
  }

  async obtenerMedicamentoSimple(id: number, userId: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!medicamento) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }

    return medicamento;
  }

  async actualizarMedicamento(
    id: number,
    updateMedicamentoDto: UpdateMedicamentoDto,
    userId: number,
  ): Promise<Medicamento> {
    console.log(`Actualizando medicamento con ID: ${id}`);
  
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id, user: { id: userId } }, // Filtra por ID de usuario
      relations: ['dosis'],
    });
  
    if (!medicamento) {
      console.error(`Medicamento con ID ${id} no encontrado o no pertenece al usuario`);
      throw new NotFoundException(
        `Medicamento con ID ${id} no encontrado o no pertenece al usuario`,
      );
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
      console.log(
        `ALERTA: Las unidades restantes (${medicamento.unidades_restantes}) son menores o iguales al mínimo (${medicamento.unidades_min}).`,
      );
      // Aquí se agrega enviar notificación
    }
  
    // Guardar los cambios en la base de datos
    const updatedMedicamento = await this.medicamentoRepository.save(medicamento);
    console.log(`Medicamento después de guardar:`, updatedMedicamento);
    return updatedMedicamento;
  }
  

  async eliminarMedicamento(id: number, userId: number): Promise<{ message: string }> {
    const medicamento = await this.obtenerMedicamento(id, userId);

    await this.dosisRepository.delete({ medicamento: { id } });
    await this.medicamentoRepository.remove(medicamento);

    return { message: 'Medicamento eliminado correctamente' };
  }
}
