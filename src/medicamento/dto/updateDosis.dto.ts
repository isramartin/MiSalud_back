import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class updateDosisDto {
  @IsOptional()
  @IsInt()
  numero_dosis: number;

  @IsOptional()
  @IsString()
  hora_dosis: string; // Ej. "08:00", "14:00"

  // @IsOptional()
  // @IsString()
  // momento_comida: string; // Ej. "antes", "durante", "después"
  
  @IsOptional()
  @IsInt()
  cantidadP: number; // Cantidad de pastillas tomadas en esa dosis

  @IsOptional()
  @IsBoolean()
  suministrada: boolean; // Si la dosis fue suministrada
  id: any;
}
