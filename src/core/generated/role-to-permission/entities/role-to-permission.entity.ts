import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../../role/entities/role.entity';
import { PermissionEntity } from '../../permission/entities/permission.entity';

export class RoleToPermissionEntity {
  @ApiProperty({
    type: 'string',
  })
  roleId: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  permissionId: number;
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
    type: () => RoleEntity,
    required: false,
  })
  role?: RoleEntity;
  @ApiProperty({
    type: () => PermissionEntity,
    required: false,
  })
  permission?: PermissionEntity;
}
