import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsOptional, IsString, Length } from 'class-validator';
import { Permission } from './permission.entity';
import {Module} from './module.entity';

@Entity({ name: 'links' })
export class Link {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(1, 100)
  name: string;

  @Column()
  @IsString()
  path: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  loadComponent?: string;

  @Column({ nullable: true, type: 'text' })
  @IsOptional()
  @IsString()
  description?: string;

  // 🔗 Un enlace puede tener muchos permisos
  @OneToMany(() => Permission, permission => permission.link)
  permissions: Permission[];

  // 🔗 Un enlace puede tener muchos permisos de toolbar
  @OneToMany(() => Permission, permission => permission.linkToolbar)
  toolbar: Permission[];

  // 🔗 Un enlace pertenece a un módulo
  @ManyToOne(() => Module, module => module.links, { eager: true })
  module: Module;
}