import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
    ) {}

    async create(userData: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(userData);
        return this.usersRepository.save(newUser);
      }
  
    async findAll(): Promise<User[]> {
        try {
          const users = await this.usersRepository.find();
          console.log('Usuarios encontrados:', users); // Este log te dirá si hay resultados o no
          return users;
        } catch (error) {
          console.error('Error fetching users:', error);
          throw new Error('Error fetching users');
        }
      }
      
  
    async findOne(id: number): Promise<User> {
      return this.usersRepository.findOneBy({ id });
    }
  
    async remove(id: number): Promise<void> {
      await this.usersRepository.delete(id);
    }
  }