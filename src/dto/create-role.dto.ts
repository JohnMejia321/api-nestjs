import { IsString, Length, IsOptional } from 'class-validator';
import { IsValidRoleName } from '../validators/role-name.validator';

export class CreateRoleDto {
  @IsString()
  @Length(2, 50)
  @IsValidRoleName()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}