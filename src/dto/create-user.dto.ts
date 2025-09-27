import { IsString, Length, IsOptional, IsUUID } from 'class-validator';
import { IsAllowedEmailDomain } from '../validators/email-domain.validator';
import { IsValidUsername } from '../validators/username.validator';
import { IsStrongPassword } from '../validators/password.validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  @IsValidUsername()
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsAllowedEmailDomain()
  email: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsUUID()
  roleId: string;
}