import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';

export class VerificationTokenEntity {
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
  @ApiProperty({
    type: 'string',
  })
  userId: string | null;
  @ApiProperty({
    type: () => UserEntity,
    required: false,
    nullable: true,
  })
  user?: UserEntity | null;
}
