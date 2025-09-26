// link.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsOptional, IsString, Length } from 'class-validator';
import { Permission } from './permission.entity';

@Entity({ name: 'links' })
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

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

  // 🔹 Campos del modelo original (sin relaciones todavía)
  @IsOptional()
  permission?: Permission[];

  @IsOptional()
  toolbar?: Permission[];
}
