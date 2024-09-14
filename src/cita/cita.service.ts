import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entity/cita.entity';
import { CreateCitaDto } from './dto/createCita.dto';

@Injectable()
export class CitaService {
	constructor(
		@InjectRepository(Cita)
		private readonly citaRepository: Repository<Cita>,
		){}

	async create(createCitaDto: CreateCitaDto): Promise<Cita>{
		const cita = this.citaRepository.create(createCitaDto);
		return this.citaRepository.save(cita); 
	}

	async findAll(): Promise<Cita[]>{
		return this.citaRepository.find();
	}

	async findByName(nombre_cita: string): Promise<Cita[]>{
		return this.citaRepository.find({where: { nombre_cita } });
	}

	async findOne(id: number): Promise<Cita> {
    const cita = await this.citaRepository.findOne({ where: { id } });
    if (!cita) {
      throw new NotFoundException(`No se ha encontrado ninguna cita con la ID ${id}`);
    }
    return cita;
  }

	async update(id: number, updateCitaDto: CreateCitaDto): Promise<Cita>{
		const cita = await this.findOne(id);
		Object.assign(cita, updateCitaDto);
		return this.citaRepository.save(cita);
	}

	async remove(id: number): Promise<string>{
		const result = await this.citaRepository.delete(id);
		if(result.affected === 0){
			throw new NotFoundException(`No se encontra la cita con el ID ${id}`);
		}
		return `La cita con el ID ${id} se ha eliminado correctamente`;
	}
}