import { IsString, IsInt, IsArray, ValidateNested, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDosisDto } from './dosis.dto';

export class CreateMedicamentoDto {
  @IsString()
  nombre: string;

  @IsString()
  unidad: string;

  @IsString()
  @IsNotEmpty()
  frecuencia: string;

  @IsInt()
  numero_dosis: number;
  
  @IsInt()
  total_unidades: number;

  @IsInt()
  unidades_restantes: number;

  @IsInt()
  @Min(0, { message: 'El valor de unidades mínimas debe ser mayor o igual a 0' })
  unidades_min: number; // Nuevo campo para controlar el stock mínimo

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDosisDto)
  dosis: CreateDosisDto[];
}
