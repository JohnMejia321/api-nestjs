import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsOptional, IsString, IsBoolean } from 'class-validator';


@Entity({ name: 'permissions' })
export class Permission {
    
@PrimaryGeneratedColumn()
id: number;


@Column()
@IsString()
name: string;


@Column({ nullable: true })
@IsOptional()
value?: string;


@Column({ nullable: true })
@IsOptional()
color?: string;


@Column({ nullable: true })
@IsOptional()
icon?: string;


@Column({ nullable: true })
@IsOptional()
class?: string;


@Column({ default: true })
@IsBoolean()
isEnabled: boolean;


@Column({ nullable: true })
@IsOptional()
customAction?: string;


@Column({ nullable: true })
@IsOptional()
type?: string;


@CreateDateColumn()
createdAt: Date;


@UpdateDateColumn()
updatedAt: Date;
}