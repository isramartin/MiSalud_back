import { Module } from '@nestjs/common';
import { MedicamentoController } from './medicamento.controller';
import { MedicamentoService } from './medicamento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicamento } from './entity/medicamentos.entity';
import { Dosis } from './entity/dosis.entity';
import { User } from 'src/users/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicamento, Dosis, User]) // Asegúrate de incluir ambas entidades aquí
  ],
  controllers: [MedicamentoController],
  providers: [MedicamentoService]
})
export class MedicamentoModule {}
