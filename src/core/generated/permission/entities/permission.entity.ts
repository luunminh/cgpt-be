import { ApiProperty } from '@nestjs/swagger';
import { RoleToPermissionEntity } from '../../role-to-permission/entities/role-to-permission.entity';
import { PermissionGroupEntity } from '../../permission-group/entities/permission-group.entity';

export class PermissionEntity {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  id: number;
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
  resourceName: string;
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
  canCreate: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  canRead: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  canUpdate: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  canDelete: boolean;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  permissionGroupId: number | null;
  @ApiProperty({
    type: () => RoleToPermissionEntity,
    isArray: true,
    required: false,
  })
  roles?: RoleToPermissionEntity[];
  @ApiProperty({
    type: () => PermissionGroupEntity,
    required: false,
    nullable: true,
  })
  permissionGroup?: PermissionGroupEntity | null;
}
