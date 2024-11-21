import { IsString, IsInt, IsOptional, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDosisDto } from './dosis.dto';// Importar el DTO de dosis
import { updateDosisDto } from './updateDosis.dto';

export class UpdateMedicamentoDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsString()
  readonly unidad?: string;

  @IsString()
  @IsOptional()
  frecuencia?: string;

  @IsInt()
  @IsOptional()
  numero_dosis?: number;

  @IsOptional()
  @IsInt()
  readonly total_unidades?: number;

  @IsOptional()
  @IsInt()
  readonly unidades_restantes?: number;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'El valor de unidades mínimas debe ser mayor o igual a 0' })
  readonly unidades_min?: number; // Nuevo campo para controlar el stock mínimo
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => updateDosisDto) // Transformar cada item en un objeto CreateDosisDto
  readonly dosis?: updateDosisDto[];
}
