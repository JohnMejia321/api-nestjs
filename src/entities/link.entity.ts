import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';


@Entity({ name: 'links' })
export class Link {

@PrimaryGeneratedColumn()
id: number;


@Column()
@IsString()
name: string;


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