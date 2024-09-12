import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    contraseña: string;
}