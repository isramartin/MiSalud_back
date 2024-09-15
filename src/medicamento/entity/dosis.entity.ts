import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Medicamento } from './medicamentos.entity';

@Entity('dosis')
export class Dosis {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medicamento, medicamento => medicamento.dosis, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicamento_id' })
  medicamento: Medicamento;

  @Column()
  numero_dosis: number;

  @Column()
  hora_dosis: string; // ej. "08:00", "14:00"

  @Column()
  cantidadP: number; // Cantidad de pastillas tomadas

  @Column({ default: false })
  suministrada: boolean; // Si se ha suministrado la dosis

}
