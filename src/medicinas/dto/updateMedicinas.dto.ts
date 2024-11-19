import { IsString, IsInt, IsOptional, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';


export class UpdateMedicinaDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsString()
  readonly unidad?: string;

  @IsOptional()
  @IsInt()
  readonly total_unidades?: number;

}
