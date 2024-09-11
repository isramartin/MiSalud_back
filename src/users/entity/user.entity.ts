import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios') // Asegúrate de que el nombre de la tabla coincida
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'date' })
  fechaN: Date;

  @Column({ type: 'char', length: 1 })
  sexo: string;

  @Column({ type: 'varchar', length: 255 })
  contraseña: string;

  @Column({ type: 'varchar', length: 255 })
  confirmarC: string;
}