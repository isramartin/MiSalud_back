import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}