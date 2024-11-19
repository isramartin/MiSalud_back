import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('cita')
export class Cita{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50 })
	nombre_cita: string;

	@Column({	type:'varchar', length: 100	})
	medico: string;
	
	@Column({	type:'varchar', length: 50	})
	hora: string;

	@Column({	type:'varchar', length: 100	})
	ubicacion_hospital: string;

	@Column({	type:'varchar', length: 100	})
	notas: string;

	@ManyToOne(() => User, (user) => user.cita, { onDelete: 'CASCADE' }) // Relación con User
	user: User;
}