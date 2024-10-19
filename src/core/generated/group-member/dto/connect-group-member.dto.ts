import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GroupMemberMemberIdGroupIdUniqueInputModel {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  memberId: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  groupId: string;
}

@ApiExtraModels(GroupMemberMemberIdGroupIdUniqueInputModel)
export class ConnectGroupMemberModel {
  @ApiProperty({
    type: GroupMemberMemberIdGroupIdUniqueInputModel,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GroupMemberMemberIdGroupIdUniqueInputModel)
  memberId_groupId: GroupMemberMemberIdGroupIdUniqueInputModel;
}
