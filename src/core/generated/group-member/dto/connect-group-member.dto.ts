import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GroupMemberMemberIdGroupIdUniqueInputDto {
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

@ApiExtraModels(GroupMemberMemberIdGroupIdUniqueInputDto)
export class ConnectGroupMemberDto {
  @ApiProperty({
    type: GroupMemberMemberIdGroupIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GroupMemberMemberIdGroupIdUniqueInputDto)
  memberId_groupId: GroupMemberMemberIdGroupIdUniqueInputDto;
}
