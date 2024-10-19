import { CategoryGroupType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LKExpenseCategoryModel {
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
    enum: CategoryGroupType,
  })
  type: CategoryGroupType;
  @ApiProperty({
    type: 'string',
  })
  name: string;
}
