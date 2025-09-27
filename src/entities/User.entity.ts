import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsString, Length } from 'class-validator';
import { IsAllowedEmailDomain } from '../validators/email-domain.validator';
import { IsValidUsername } from '../validators/username.validator';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @Length(3, 50)
  @IsValidUsername()
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
  @IsAllowedEmailDomain()
  email: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 🔗 Relación: Muchos usuarios pueden tener un solo rol
  @ManyToOne(() => Role, role => role.users, { eager: true })
  role: Role;
}
