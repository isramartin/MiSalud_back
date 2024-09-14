import { IsString, IsInt, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDosisDto } from './dosis.dto';// Importar el DTO de dosis

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDosisDto) // Transformar cada item en un objeto CreateDosisDto
  readonly dosis?: CreateDosisDto[];
}
