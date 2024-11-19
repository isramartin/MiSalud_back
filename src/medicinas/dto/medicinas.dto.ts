import { IsString, IsInt, IsArray, ValidateNested, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateMedicinaDto {
  @IsString()
  nombre: string;

  @IsString()
  unidad: string;

  @IsInt()
  total_unidades: number;
}
