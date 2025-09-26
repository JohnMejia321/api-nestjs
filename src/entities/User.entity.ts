import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';


@Entity({ name: 'users' })
export class User {
    
@PrimaryGeneratedColumn('uuid')
id: string;


@Column({ unique: true })
@IsString()
@Length(3, 30)
username: string;


@Column()
@Exclude()
@IsString()
@Length(6, 128)
password: string;


@Column({ nullable: true })
@IsOptional()
@IsString()
name?: string;


@Column({ nullable: true, unique: true })
@IsOptional()
@IsEmail()
email?: string;


@Column({ nullable: true })
@IsOptional()
@IsString()
avatar?: string;


@CreateDateColumn()
createdAt: Date;


@UpdateDateColumn()
updatedAt: Date;
}