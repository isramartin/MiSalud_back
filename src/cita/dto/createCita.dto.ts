import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCitaDto{
	@IsNotEmpty()
	@IsString()
	nombre_cita: string;

	@IsNotEmpty()
	@IsString()
	medico: string;

	@IsNotEmpty()
	@IsString()
	hora: string;

	@IsNotEmpty()
	@IsString()
	ubicacion_hospital: string;

	@IsNotEmpty()
	@IsString()
	notas: string;

}