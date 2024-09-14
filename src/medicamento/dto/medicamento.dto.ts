import { IsString, IsInt, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDosisDto)
  dosis: CreateDosisDto[];
}
