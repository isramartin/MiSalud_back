import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsDateString()
  @IsOptional()
  fechaN?: Date;

  @IsString()
  @IsOptional()
  sexo?: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  contraseña?: string;

  @IsString()
  @IsOptional()
  confirmarC?: string;
}
