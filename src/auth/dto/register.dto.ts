import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
