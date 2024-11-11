import { GroupType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupModel {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  updatedById?: string | null;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  groupName: string;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string | null;
  @ApiProperty({
    enum: GroupType,
  })
  @IsNotEmpty()
  groupType: GroupType;
}
