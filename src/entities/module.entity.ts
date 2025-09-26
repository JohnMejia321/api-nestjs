import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsOptional, IsString, IsBoolean, Length } from 'class-validator';


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
@IsOptional()
@IsBoolean()
isEnabled: boolean;


@Column({ nullable: true })
@IsOptional()
customAction?: string;


@Column({ nullable: true })
@IsOptional()
path?: string;


@Column({ nullable: true })
@IsOptional()
loadComponent?: string;


@Column({ nullable: true, type: 'text' })
@IsOptional()
description?: string;


@CreateDateColumn()
createdAt: Date;


@UpdateDateColumn()
updatedAt: Date;
}

