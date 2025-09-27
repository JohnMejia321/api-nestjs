// permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsString, IsBoolean, Length } from 'class-validator';
import { Module } from './module.entity';
import { Link } from './link.entity';

@Entity({ name: 'permissions' })
export class Permission {

 @PrimaryGeneratedColumn('uuid')
 id: string;

  @Column()
  @IsString()
  @Length(1, 100)
  name: string;

  @Column()
  @IsString()
  @Length(1, 100)
  value: string;

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
  type?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 🔗 Un permiso pertenece a un módulo (opcional)
  @ManyToOne(() => Module, module => module.permissions, { eager: true, nullable: true })
  module?: Module;

  // 🔗 Un permiso puede pertenecer a un enlace (para permissions)
  @ManyToOne(() => Link, link => link.permissions, { nullable: true })
  link?: Link;

  // 🔗 Un permiso puede pertenecer a un enlace (para toolbar)
  @ManyToOne(() => Link, link => link.toolbar, { nullable: true })
  linkToolbar?: Link;
}
