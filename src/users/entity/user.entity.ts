import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  fechaN: Date;

  @Column()
  sexo: string;

  @Column({ unique: true })
  email: string;

  @Column()
  contraseña: string;

  @Column({ nullable: true })
  confirmarC?: string;
}
