import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { Role } from '../entities/role.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserWithPermissions } from '../interfaces/user-permissions.interface';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { RoleNotFoundException } from '../exceptions/role-not-found.exception';
import { DuplicateEntryException } from '../exceptions/duplicate-entry.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Validar que el rol existe
    const role = await this.roleRepository.findOne({ where: { id: createUserDto.roleId } });
    if (!role) {
      throw new RoleNotFoundException();
    }

    // Hashear password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crear usuario
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new DuplicateEntryException('El username o email ya existe');
      }
      throw error;
    }
  }

  async getUserWithPermissions(userId: string): Promise<UserWithPermissions> {
    // Traer usuario con rol, módulos, permisos y links
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'role',
        'role.modules',
        'role.modules.permissions',
        'role.modules.links',
        'role.modules.links.permissions',
        'role.modules.links.toolbar',
      ],
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    // Estructurar respuesta según las interfaces
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: {
        id: user.role.id,
        name: user.role.name,
        modules: user.role.modules.map(module => ({
          id: module.id,
          name: module.name,
          permissions: module.permissions.map(perm => ({
            id: perm.id,
            name: perm.name,
            value: perm.value,
          })),
          links: module.links.map(link => ({
            id: link.id,
            name: link.name,
            path: link.path,
            permissions: link.permissions?.map(perm => ({
              id: perm.id,
              name: perm.name,
              value: perm.value,
            })),
            toolbar: link.toolbar?.map(perm => ({
              id: perm.id,
              name: perm.name,
              value: perm.value,
            })),
          })),
        })),
      },
    };
  }

  async updateUserRole(userId: string, roleId: string): Promise<User> {
    // Validar que ambos existen
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UserNotFoundException();
    }

    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new RoleNotFoundException();
    }

    // Actualizar relación
    user.role = role;
    return await this.userRepository.save(user);
  }
}