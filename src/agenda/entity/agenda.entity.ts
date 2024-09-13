import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agenda')
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 50 }) 
  hora: string;

  @Column({ type: 'varchar', length: 100 }) 
  tipo: string;
}
