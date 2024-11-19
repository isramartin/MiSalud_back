import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from 'src/users/entity/user.entity';

@Entity('medicina')
export class Medicina{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  unidad: string;

  @Column()
  total_unidades: number;
}
