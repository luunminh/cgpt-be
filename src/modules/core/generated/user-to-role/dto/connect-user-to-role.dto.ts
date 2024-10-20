import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserToRoleUserIdRoleIdUniqueInputModel {
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

@ApiExtraModels(UserToRoleUserIdRoleIdUniqueInputModel)
export class ConnectUserToRoleModel {
  @ApiProperty({
    type: UserToRoleUserIdRoleIdUniqueInputModel,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserToRoleUserIdRoleIdUniqueInputModel)
  userId_roleId: UserToRoleUserIdRoleIdUniqueInputModel;
}
