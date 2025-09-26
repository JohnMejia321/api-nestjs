// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsOptional, IsString, IsEmail, Length } from 'class-validator';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(3, 50)
  username: string;

  @Column()
  @IsString()
  @Length(6, 100)
  password: string;

  @Column()
  @IsString()
  @Length(1, 100)
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 🔹 Campo del modelo original (sin relación todavía)
  @IsOptional()
  role?: Role;
}
