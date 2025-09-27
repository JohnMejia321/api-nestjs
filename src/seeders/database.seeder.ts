import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Module as ModuleEntity } from '../entities/module.entity';
import { Permission } from '../entities/permission.entity';
import { Link } from '../entities/link.entity';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async seed() {
    // Check if data already exists
    const roleCount = await this.roleRepository.count();
    if (roleCount > 0) {
      console.log('Database already seeded');
      return;
    }

    console.log('Seeding database...');

    // Seed roles
    const adminRole = await this.roleRepository.save({
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'admin',
      description: 'Administrador con acceso completo',
    });

    const userRole = await this.roleRepository.save({
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'user',
      description: 'Usuario estándar',
    });

    // Seed modules
    const usersModule = await this.moduleRepository.save({
      name: 'Usuarios',
      value: 'users',
      color: '#FF5733',
      icon: 'user-icon',
      class: 'user-class',
      isEnabled: true,
      path: '/users',
      loadComponent: 'UserComponent',
      description: 'Módulo de gestión de usuarios',
    });

    const reportsModule = await this.moduleRepository.save({
      name: 'Reportes',
      value: 'reports',
      color: '#33FF57',
      icon: 'report-icon',
      class: 'report-class',
      isEnabled: true,
      path: '/reports',
      loadComponent: 'ReportComponent',
      description: 'Módulo de reportes',
    });

    // Seed permissions
    await this.permissionRepository.save([
      {
        name: 'Ver Usuarios',
        value: 'view_users',
        color: '#FF5733',
        icon: 'eye-icon',
        class: 'eye-class',
        isEnabled: true,
        type: 'read',
        module: usersModule,
      },
      {
        name: 'Crear Usuario',
        value: 'create_user',
        color: '#33FF57',
        icon: 'plus-icon',
        class: 'plus-class',
        isEnabled: true,
        type: 'write',
        module: usersModule,
      },
      {
        name: 'Ver Reportes',
        value: 'view_reports',
        color: '#3357FF',
        icon: 'chart-icon',
        class: 'chart-class',
        isEnabled: true,
        type: 'read',
        module: reportsModule,
      },
    ]);

    // Seed links
    await this.linkRepository.save([
      {
        name: 'Lista de Usuarios',
        path: '/users/list',
        loadComponent: 'UserListComponent',
        description: 'Ver lista de usuarios',
        module: usersModule,
      },
      {
        name: 'Crear Usuario',
        path: '/users/create',
        loadComponent: 'UserCreateComponent',
        description: 'Formulario para crear usuario',
        module: usersModule,
      },
      {
        name: 'Dashboard de Reportes',
        path: '/reports/dashboard',
        loadComponent: 'ReportDashboardComponent',
        description: 'Dashboard principal de reportes',
        module: reportsModule,
      },
    ]);

    // Associate roles with modules
    adminRole.modules = [usersModule, reportsModule];
    userRole.modules = [reportsModule];
    await this.roleRepository.save([adminRole, userRole]);

    console.log('Database seeded successfully');
  }
}