import { Agenda } from 'src/agenda/entity/agenda.entity';
import { Cita } from 'src/cita/entity/cita.entity';
import { Dosis } from 'src/medicamento/entity/dosis.entity';
import { Medicamento } from 'src/medicamento/entity/medicamentos.entity';
import { Medico } from 'src/medicos/entity/medicos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Medico, (medico) => medico.user) // Relación inversa
  medicos: Medico[];

  @OneToMany(() => Agenda, (agenda) => agenda.user) // Relación inversa
  agenda: Agenda[];

  @OneToMany(() => Cita, (cita) => cita.user) // Relación inversa
  cita: Cita[];

  @OneToMany(() => Medicamento, (medicamento) => medicamento.user) // Relación inversa
  medicamento: Medicamento[];

  // @OneToMany(() => Dosis, (dosis) => dosis.user) // Relación inversa
  // dosis: Medicamento[];
}
