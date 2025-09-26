// permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsOptional, IsString, IsBoolean, Length } from 'class-validator';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

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
}
