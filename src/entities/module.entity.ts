// module.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsOptional, IsString, IsBoolean, Length } from 'class-validator';
import { Permission } from './permission.entity';
import { Link } from './link.entity';

@Entity({ name: 'modules' })
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

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

  // 🔹 Campos del modelo original (sin relaciones aún)
  @IsOptional()
  permission?: Permission[];

  @IsOptional()
  links?: Link[];
}
