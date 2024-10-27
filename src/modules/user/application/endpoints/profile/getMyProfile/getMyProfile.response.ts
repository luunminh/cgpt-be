import { UserDto } from '@modules/user/application/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus, UserType } from '@prisma/client';

export class GetMyProfileQueryResponse
  implements Omit<UserDto, 'hashedPassword'>
{
  @ApiProperty({
    description: 'User ID',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
  @ApiProperty({
    description: 'Created at',
    type: 'string',
    format: 'date-time',
    example: '2021-09-01T00:00:00.000Z',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'Updated at',
    type: 'string',
    format: 'date-time',
    example: '2021-09-01T00:00:00.000Z',
  })
  updatedAt: Date;
  @ApiProperty({
    description: 'Updated by',
    type: 'string',
    nullable: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  updatedById: string | null;
  @ApiProperty({
    description: 'First name',
    type: 'string',
    example: 'John',
  })
  firstName: string;
  @ApiProperty({
    description: 'Last name',
    type: 'string',
    example: 'Doe',
  })
  lastName: string;
  @ApiProperty({
    description: 'Middle name',
    type: 'string',
    nullable: true,
    example: 'Smith',
  })
  middleName: string | null;
  @ApiProperty({
    description: 'Username',
    type: 'string',
    example: 'johndoe',
  })
  username: string;
  @ApiProperty({
    description: 'Email',
    type: 'string',
    example: 'abc@datahouse.com',
  })
  email: string;
  @ApiProperty({
    description: 'Full name',
    type: 'string',
    nullable: true,
    example: 'John Doe Smith',
  })
  fullName: string | null;
  @ApiProperty({
    description: 'Status',
    enum: UserStatus,
    example: 'ACTIVE',
  })
  status: UserStatus;
  @ApiProperty({
    description: 'User type',
    enum: UserType,
    example: 'USER',
  })
  userType: UserType;

  @ApiProperty({
    description: 'Roles',
    example: ['admin'],
  })
  roles: string[];

  @ApiProperty({
    description: 'Permissions',
    example: ['users.read'],
  })
  permissions: string[];

  @ApiProperty({
    description: 'Phone number',
    example: '+1234567890',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Address',
    example: '123 Street',
  })
  address: string;

  @ApiProperty({
    description: 'QR code URL',
    example: 'https://example.com/qr.png',
  })
  qrUrl: string;

  @ApiProperty({
    description: 'Avatar URL',
    example: 'https://example.com/avatar.png',
  })
  avatarUrl: string;
}
