import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto'; // Asegúrate de que el nombre del DTO coincida
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    private readonly saltRounds = 10;
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

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, this.saltRounds);

        // Encriptar la confirmación de la contraseña (aunque esto no es necesario)
        const hashedConfirmarC = await bcrypt.hash(confirmarC, this.saltRounds);

        // Crear y guardar el nuevo usuario
        const newUser = this.usersRepository.create({
            ...createUserDto,
            contraseña: hashedPassword,
            confirmarC: hashedConfirmarC // Aunque generalmente no se guarda en la base de datos
        });
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
        // Encuentra el usuario por ID
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Validar la coincidencia de contraseñas
        if (updateUserDto.contraseña && updateUserDto.confirmarC && updateUserDto.contraseña !== updateUserDto.confirmarC) {
            throw new BadRequestException('Las contraseñas no coinciden');
        }

        // Encriptar la contraseña si está presente en el DTO
        if (updateUserDto.contraseña) {
            updateUserDto.contraseña = await bcrypt.hash(updateUserDto.contraseña, this.saltRounds);
        }

        // Omite la confirmación de contraseña en el DTO para la actualización
        delete updateUserDto.confirmarC;

        // Actualiza el usuario en la base de datos
        await this.usersRepository.update(id, updateUserDto);

        // Retorna el usuario actualizado
        return this.findOne(id);
    }


    // Eliminar un usuario
    async delete(id: number): Promise<string> {
        const result = await this.usersRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        throw new BadRequestException( `User with ID ${id} was successfully deleted`);
    }
}
