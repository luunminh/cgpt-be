import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserToRoleUserIdRoleIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  roleId: string;
}

@ApiExtraModels(UserToRoleUserIdRoleIdUniqueInputDto)
export class ConnectUserToRoleDto {
  @ApiProperty({
    type: UserToRoleUserIdRoleIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserToRoleUserIdRoleIdUniqueInputDto)
  userId_roleId: UserToRoleUserIdRoleIdUniqueInputDto;
}
