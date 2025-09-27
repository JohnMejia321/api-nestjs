import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { IsOptional, IsString, Length } from 'class-validator';
import { IsValidRoleName } from '../validators/role-name.validator';
import { User } from './User.entity';
import { Module } from './module.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  @Length(2, 50)
  @IsValidRoleName()
  name: string;

  @Column({ nullable: true, type: 'text' })
  @IsOptional()
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 🔗 Un rol puede estar asignado a muchos usuarios
  @OneToMany(() => User, user => user.role)
  users: User[];

  // 🔗 Un rol puede tener muchos módulos y un módulo puede pertenecer a muchos roles
  @ManyToMany(() => Module, module => module.roles, { eager: true })
  @JoinTable()
  modules: Module[];
}
