import { ApiProperty } from '@nestjs/swagger';

export class ProfileModel {
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
    nullable: true,
  })
  phoneNumber: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  avatarUrl: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  qrUrl: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  address: string | null;
}
