import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './entity/medicos.entity';
import { MedicoDto } from './dto/medicos.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class MedicosService {
//   userRepository: any;
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createMedicoDto: MedicoDto, userId: number): Promise<Medico> {
    // Verifica que el usuario exista
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
  
    // Busca si ya existe un médico con el mismo email
    const existingMedico = await this.medicoRepository.findOne({
      where: { email: createMedicoDto.email, user: { id: userId } },
      relations: ['user'],
    });
    
    if (existingMedico) {
      throw new ConflictException('El correo ya está registrado para este usuario');
    }
    
  
    // Crea el médico asociado al usuario
    const medico = this.medicoRepository.create({
      ...createMedicoDto,
      user,
    });
  
    return this.medicoRepository.save(medico);
  }
  
  
  
  

  async findAll(userId: number): Promise<Medico[]> {
    return this.medicoRepository.find({
      where: { user: { id: userId } }, // Filtra por el usuario logueado
    });
  }


  async findAllNamesAndIds(userId: number): Promise<Pick<Medico, 'id' | 'nombre'>[]> {
    return this.medicoRepository.find({
      where: { user: { id: userId } },
      select: ['id', 'nombre'],
    });
  }
  
  async findById(id: number, userId: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!medico) {
      throw new NotFoundException('Médico no encontrado o no pertenece al usuario');
    }
    return medico;
  }

  async update(id: number, updateMedicoDto: Partial<MedicoDto>, userId: number): Promise<Medico> {
    // Verifica si el médico existe y pertenece al usuario
    const medico = await this.medicoRepository.findOne({
      where: { id, user: { id: userId } },
    });
  
    if (!medico) {
      throw new NotFoundException('Médico no encontrado o no pertenece al usuario');
    }
  
    // Verifica si el correo ya está en uso por otro médico del mismo usuario
    if (updateMedicoDto.email && updateMedicoDto.email !== medico.email) {
      const existingMedico = await this.medicoRepository.findOne({
        where: { email: updateMedicoDto.email, user: { id: userId } },
      });
  
      if (existingMedico) {
        throw new ConflictException('El correo ya está en uso para otro médico');
      }
    }

    Object.assign(medico, updateMedicoDto);
  
    return this.medicoRepository.save(medico);
  }
  async delete(id: number, userId: number): Promise<void> {
    const medico = await this.medicoRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!medico) {
      throw new NotFoundException('Médico no encontrado o no pertenece al usuario');
    }

    await this.medicoRepository.remove(medico);
  }


}
