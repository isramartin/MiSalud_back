import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.agenda, { onDelete: 'CASCADE' }) // Relación con User
  user: User;
}
