import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entity/cita.entity';
import { CreateCitaDto } from './dto/createCita.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear cita asociada al usuario logueado
  async create(createCitaDto: CreateCitaDto, userId: number): Promise<Cita> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    const cita = this.citaRepository.create({
      ...createCitaDto,
      user,
    });

    return this.citaRepository.save(cita);
  }

  // Obtener todas las citas del usuario logueado
  async findAll(userId: number): Promise<Cita[]> {
    return this.citaRepository.find({
      where: { user: { id: userId } },
    });
  }

  // Obtener una cita específica del usuario logueado
  async findById(id: number, userId: number): Promise<Cita> {
    const cita = await this.citaRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!cita) {
      throw new NotFoundException('Cita no encontrada o no pertenece al usuario');
    }
    return cita;
  }

  // Actualizar una cita del usuario logueado
  async update(
    id: number,
    updateCitaDto: CreateCitaDto,
    userId: number,
  ): Promise<Cita> {
    const cita = await this.findById(id, userId);

    Object.assign(cita, updateCitaDto);
    return this.citaRepository.save(cita);
  }

  // Eliminar una cita del usuario logueado
  async remove(id: number, userId: number): Promise<{ message: string }> {
    const cita = await this.findById(id, userId);

    await this.citaRepository.remove(cita);
    return {
      message: 'Cita eliminada correctamente',
    };
  }
}
