import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgendaDto {
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
