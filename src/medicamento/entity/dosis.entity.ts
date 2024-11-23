import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Medicamento } from './medicamentos.entity';
import { User } from 'src/users/entity/user.entity';

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

  @Column({ default: 'desconocido' }) // Valor por defecto para evitar null
  momento_comida: string;

  @Column()
  cantidadP: number; // Cantidad de pastillas tomadas

  @Column({ default: false })
  suministrada: boolean; // Si se ha suministrado la dosis

  // @ManyToOne(() => User, (user) => user.dosis, { onDelete: 'CASCADE' }) // Relación con User
	// user: User;
}
