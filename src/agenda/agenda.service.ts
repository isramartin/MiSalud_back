import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from './entity/agenda.entity';
import { CreateAgendaDto } from './dto/createAgenda.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAgendaDto: CreateAgendaDto, userId: number): Promise<Agenda> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    const agenda = this.agendaRepository.create({
      ...createAgendaDto,
      user,
    });

    return this.agendaRepository.save(agenda);
  }

  async findAll(userId: number): Promise<Agenda[]> {
    return this.agendaRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findById(id: number, userId: number): Promise<Agenda> {
    const agenda = await this.agendaRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!agenda) {
      throw new NotFoundException('Agenda no encontrada o no pertenece al usuario');
    }
    return agenda;
  }
  
  // async findOne(id: number): Promise<Agenda> {
  //   const agenda = await this.agendaRepository.findOne({ where: { id } });
  //   if (!agenda) {
  //     throw new NotFoundException(`Agenda with ID ${id} not found`);
  //   }
  //   return agenda;
  // }

  async update(
    id: number,
    updateAgendaDto: CreateAgendaDto,
    userId: number,
  ): Promise<Agenda> {
    const agenda = await this.findById(id, userId);

    Object.assign(agenda, updateAgendaDto);
    return this.agendaRepository.save(agenda);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const agenda = await this.findById(id, userId);
  
    await this.agendaRepository.remove(agenda);
    return {
      message: `Agenda con el ID ${id} ha sido eliminada correctamente`,
    };
  }
}