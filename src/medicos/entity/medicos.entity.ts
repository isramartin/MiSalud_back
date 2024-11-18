import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  numeroTelefono: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  numeroCelular: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  numeroEmergencia: string;

  @Column({ type: 'text', nullable: true })
  direccion: string;
}
