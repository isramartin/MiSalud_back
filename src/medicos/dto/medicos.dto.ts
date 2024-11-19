import { IsNotEmpty, IsString, IsEmail, IsOptional, Length, Matches } from 'class-validator';

export class MedicoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{10,15}$/, { message: 'El número de teléfono debe tener entre 10 y 15 dígitos.' })
  numeroTelefono?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{10,15}$/, { message: 'El número de celular debe tener entre 10 y 15 dígitos.' })
  numeroCelular?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{10,15}$/, { message: 'El número de emergencia debe tener entre 10 y 15 dígitos.' })
  numeroEmergencia?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500, { message: 'La dirección no puede superar los 500 caracteres.' })
  direccion?: string;
}
