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
}
