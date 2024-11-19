import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgendaDto {
  id: number
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  hora: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;
}
