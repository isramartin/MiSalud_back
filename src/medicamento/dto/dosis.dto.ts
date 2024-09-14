import { IsString, IsInt } from 'class-validator';

export class CreateDosisDto {
  @IsInt()
  numero_dosis: number;

  @IsString()
  hora_dosis: string; // Ej. "08:00", "14:00"

  @IsString()
  momento_comida: string; // Ej. "antes", "durante", "después"

}
