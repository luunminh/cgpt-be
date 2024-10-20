import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RoleToPermissionRoleIdPermissionIdUniqueInputModel {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  roleId: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  @IsNotEmpty()
  @IsInt()
  permissionId: number;
}

@ApiExtraModels(RoleToPermissionRoleIdPermissionIdUniqueInputModel)
export class ConnectRoleToPermissionModel {
  @ApiProperty({
    type: RoleToPermissionRoleIdPermissionIdUniqueInputModel,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RoleToPermissionRoleIdPermissionIdUniqueInputModel)
  roleId_permissionId: RoleToPermissionRoleIdPermissionIdUniqueInputModel;
}
