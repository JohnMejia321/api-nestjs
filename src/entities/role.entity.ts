import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsOptional, IsString, Length } from 'class-validator';


@Entity({ name: 'roles' })
export class Role {
    
@PrimaryGeneratedColumn('uuid')
id: string;


@Column({ unique: true })
@IsString()
@Length(2, 50)
name: string;


@Column({ nullable: true, type: 'text' })
@IsOptional()
description?: string;


@CreateDateColumn()
createdAt: Date;


@UpdateDateColumn()
updatedAt: Date;
}