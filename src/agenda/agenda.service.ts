import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from './entity/agenda.entity';
import { CreateAgendaDto } from './dto/createAgenda.dto';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
  ) {}

  async create(createAgendaDto: CreateAgendaDto): Promise<Agenda> {
    const agenda = this.agendaRepository.create(createAgendaDto);
    return this.agendaRepository.save(agenda);
  }

  async findAll(): Promise<Agenda[]> {
    return this.agendaRepository.find();
  }

  async findByName(nombre: string): Promise<Agenda[]> {
    return this.agendaRepository.find({ where: { nombre } });
  }

  async findOne(id: number): Promise<Agenda> {
    const agenda = await this.agendaRepository.findOne({ where: { id } });
    if (!agenda) {
      throw new NotFoundException(`Agenda with ID ${id} not found`);
    }
    return agenda;
  }

  async update(id: number, updateAgendaDto: CreateAgendaDto): Promise<Agenda> {
    const agenda = await this.findOne(id);
    Object.assign(agenda, updateAgendaDto);
    return this.agendaRepository.save(agenda);
  }

  async remove(id: number): Promise<string> {
    const result = await this.agendaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Agenda with ID ${id} not found`);
    }
    return `Agenda con la ${id} a sido eliminado correctamente`;
  }
}