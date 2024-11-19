import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateDosisDto {
  @IsInt()
  numero_dosis: number;

  @IsString()
  hora_dosis: string; // Ej. "08:00", "14:00"

  @IsString()
  momento_comida: string; // Ej. "antes", "durante", "después"
  
  @IsInt()
  cantidadP: number; // Cantidad de pastillas tomadas en esa dosis

  @IsBoolean()
  suministrada: boolean; // Si la dosis fue suministrada
}
