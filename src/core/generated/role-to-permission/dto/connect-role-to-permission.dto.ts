import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RoleToPermissionRoleIdPermissionIdUniqueInputDto {
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

@ApiExtraModels(RoleToPermissionRoleIdPermissionIdUniqueInputDto)
export class ConnectRoleToPermissionDto {
  @ApiProperty({
    type: RoleToPermissionRoleIdPermissionIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RoleToPermissionRoleIdPermissionIdUniqueInputDto)
  roleId_permissionId: RoleToPermissionRoleIdPermissionIdUniqueInputDto;
}
