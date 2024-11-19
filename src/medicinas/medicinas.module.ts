import { Module } from '@nestjs/common';
import { MedicinasController } from './medicinas.controller';
import { MedicinasService } from './medicinas.service';
import { Medicina } from './entity/medicinas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Medicina])],
  controllers: [MedicinasController],
  providers: [MedicinasService],
})
export class MedicinasModule {}
