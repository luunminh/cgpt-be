import { ApiProperty } from '@nestjs/swagger';

export class VerificationTokenModel {
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
    type: 'string',
  })
  resource: string;
  @ApiProperty({
    type: 'string',
  })
  token: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  expiration: Date;
  @ApiProperty({
    type: 'boolean',
  })
  isVerified: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  isUsed: boolean;
}
