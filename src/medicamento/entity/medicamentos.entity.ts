import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Dosis } from './dosis.entity';

@Entity('medicamento')
export class Medicamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  unidad: string;

  @Column()
  frecuencia: string;

  @Column()
  numero_dosis: number;

  @Column()
  total_unidades: number;

  @Column()
  unidades_restantes: number;

  @Column({ nullable: false })
  unidades_min: number; // Campo para las unidades mínimas

  @OneToMany(() => Dosis, dosis => dosis.medicamento, { cascade: true })
  dosis: Dosis[];
}
