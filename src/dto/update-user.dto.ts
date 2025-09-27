import { IsString, Length, IsOptional, IsUUID } from 'class-validator';
import { IsAllowedEmailDomain } from '../validators/email-domain.validator';
import { IsValidUsername } from '../validators/username.validator';
import { IsStrongPassword } from '../validators/password.validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @IsValidUsername()
  username?: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsAllowedEmailDomain()
  email?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsUUID()
  roleId?: string;
}