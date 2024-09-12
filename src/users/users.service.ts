import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto'; // Asegúrate de que el nombre del DTO coincida
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    // Método para encontrar un usuario por nombre de usuario (o email)
    async findByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email: username } });
    }

    // Crear un nuevo usuario
    async create(createUserDto: CreateUserDto): Promise<User> {
      const { contraseña, confirmarC, email, nombre, apellido, fechaN, sexo } = createUserDto;
    
      // Verificar si el correo electrónico ya existe
      const existingUser = await this.usersRepository.findOneBy({ email });
      if (existingUser) {
        throw new ConflictException('El correo electrónico ya está en uso');
      }
    
      // Validar la coincidencia de contraseñas
      if (contraseña && confirmarC && contraseña !== confirmarC) {
        throw new BadRequestException('Las contraseñas no coinciden');
      }
    
      // Verificar que todos los campos necesarios estén presentes
      if (!email || !nombre || !apellido || !fechaN || !sexo || !contraseña) {
        throw new BadRequestException('Faltan datos requeridos');
      }
    
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);
    
      // Crear y guardar el nuevo usuario
      const newUser = this.usersRepository.create({ ...createUserDto, contraseña: hashedPassword });
      return this.usersRepository.save(newUser);
    }

    async findById(id: number): Promise<User | null> {
      return this.usersRepository.findOneBy({ id });
    }
    
    // Obtener todos los usuarios
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

    // Encontrar un usuario por ID
    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    // Actualizar un usuario
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        await this.usersRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    // Eliminar un usuario
    async delete(id: number): Promise<void> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
