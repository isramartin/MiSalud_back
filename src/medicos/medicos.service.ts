import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './entity/medicos.entity';
import { MedicoDto } from './dto/medicos.dto';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async create(createMedicoDto: MedicoDto): Promise<Medico> {
    // Verifica si el correo ya existe
    const existingMedico = await this.medicoRepository.findOne({
      where: { email: createMedicoDto.email },
    });

    if (existingMedico) {
      throw new ConflictException('El correo ya está en uso');
    }

    // Crea y guarda el nuevo médico
    const medico = this.medicoRepository.create(createMedicoDto);
    return this.medicoRepository.save(medico);
  }

  async findAll(): Promise<Medico[]> {
    return this.medicoRepository.find();
  }

  async findAllNamesAndIds(): Promise<Pick<Medico, 'id' | 'nombre'>[]> {
    return this.medicoRepository.find({
      select: ['id', 'nombre'], // Selecciona solo los campos id y nombre
    });
  }
  
  async findById(id: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) {
      throw new NotFoundException(`No se encontró un médico con el id ${id}`);
    }
    return medico;
  }

  async update(id: number, updateMedicoDto: Partial<MedicoDto>): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) {
      throw new NotFoundException(`No se encontró un médico con el id ${id}`);
    }

    Object.assign(medico, updateMedicoDto);
    return this.medicoRepository.save(medico);
  }

  async delete(id: number): Promise<void> {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) {
      throw new NotFoundException(`No se encontró un médico con el id ${id}`);
    }

    await this.medicoRepository.remove(medico);
  }


}
