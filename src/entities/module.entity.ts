// module.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { IsOptional, IsString, IsBoolean, Length } from 'class-validator';
import { Permission } from './permission.entity';
import { Link } from './link.entity';
import { Role } from './role.entity';

@Entity({ name: 'modules' })
export class Module {


  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(1, 100)
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  value?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  icon?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  class?: string;

  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isEnabled: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  customAction?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  path?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  loadComponent?: string;

  @Column({ nullable: true, type: 'text' })
  @IsOptional()
  @IsString()
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 🔗 Un módulo puede pertenecer a muchos roles y un rol puede tener muchos módulos
  @ManyToMany(() => Role, role => role.modules)
  roles: Role[];

  // 🔗 Un módulo puede tener muchos permisos
  @OneToMany(() => Permission, permission => permission.module)
  permissions: Permission[];

  // 🔗 Un módulo puede tener muchos enlaces
  @OneToMany(() => Link, link => link.module)
  links: Link[];

}
