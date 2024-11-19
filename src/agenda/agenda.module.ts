import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';
import { Agenda } from './entity/agenda.entity';
import { User } from 'src/users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda, User])],
  controllers: [AgendaController],
  providers: [AgendaService],
  exports: [AgendaService], 
})
export class AgendaModule {}
