import { ApiProperty } from '@nestjs/swagger';
import { UserToRoleEntity } from '../../user-to-role/entities/user-to-role.entity';
import { RoleToPermissionEntity } from '../../role-to-permission/entities/role-to-permission.entity';

export class RoleEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  updatedById: string | null;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
  })
  displayName: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    type: 'boolean',
  })
  canBeUpdated: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  canBeDeleted: boolean;
  @ApiProperty({
    type: () => UserToRoleEntity,
    isArray: true,
    required: false,
  })
  users?: UserToRoleEntity[];
  @ApiProperty({
    type: () => RoleToPermissionEntity,
    isArray: true,
    required: false,
  })
  permissions?: RoleToPermissionEntity[];
}
