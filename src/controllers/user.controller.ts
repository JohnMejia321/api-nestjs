import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { User } from '../entities/User.entity';
import { UserWithPermissions } from '../interfaces/user-permissions.interface';
import { PermissionGuard } from '../guards/permission.guard';
import { Permissions } from '../guards/permissions.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id/permissions')
  async getUserPermissions(@Param('id') id: string): Promise<UserWithPermissions> {
    return this.userService.getUserWithPermissions(id);
  }

  @Patch(':id/role')
  @UseGuards(PermissionGuard)
  @Permissions('admin') // Example permission type
  async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateUserRoleDto): Promise<User> {
    return this.userService.updateUserRole(id, updateRoleDto.roleId);
  }
}