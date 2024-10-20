import { ApiProperty } from '@nestjs/swagger';

export class PermissionGroupModel {
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
    nullable: true,
  })
  description: string | null;
}
