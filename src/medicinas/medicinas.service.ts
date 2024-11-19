import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicina } from './entity/medicinas.entity';
import { CreateMedicinaDto } from './dto/medicinas.dto';
import { UpdateMedicinaDto } from './dto/updateMedicinas.dto';

@Injectable()
export class MedicinasService {
  constructor(
    @InjectRepository(Medicina)
    private readonly medicinaRepository: Repository<Medicina>,
  ) {}

  async crearMedicina(createMedicinaDto: CreateMedicinaDto): Promise<Medicina> {
    const medicina = this.medicinaRepository.create(createMedicinaDto);
    return this.medicinaRepository.save(medicina);
  }

  async obtenerMedicinas(): Promise<Medicina[]> {
    return this.medicinaRepository.find();
  }

  async actualizarMedicina(
    id: number,
    updateMedicinaDto: UpdateMedicinaDto,
  ): Promise<Medicina> {
    const medicina = await this.medicinaRepository.findOne({ where: { id } });
    if (!medicina) {
      throw new NotFoundException(`Medicina con ID ${id} no encontrada`);
    }

    Object.assign(medicina, updateMedicinaDto);
    return this.medicinaRepository.save(medicina);
  }

  async eliminarMedicina(id: number): Promise<void> {
    const medicina = await this.medicinaRepository.findOne({ where: { id } });
    if (!medicina) {
      throw new NotFoundException(`Medicina con ID ${id} no encontrada`);
    }

    await this.medicinaRepository.remove(medicina);
  }
}
