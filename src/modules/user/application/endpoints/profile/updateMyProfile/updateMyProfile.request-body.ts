import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, Matches, MaxLength } from 'class-validator';

export class UpdateMyProfileRequestBody {
  @ApiProperty({
    description: 'Email',
    example: 'minh_luu@datahouse.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'First Name',
    maxLength: 50,
    example: 'Brita',
  })
  @Matches('^[A-Za-z ]+$', '', {
    message: 'First name must be alphabetical',
  })
  @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  firstName: string;

  @ApiProperty({
    description: 'Last Name',
    maxLength: 50,
    example: 'Brita',
  })
  @Matches('^[A-Za-z ]+$', '', {
    message: 'Last name must be alphabetical',
  })
  @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  lastName: string;

  @ApiPropertyOptional({
    description: 'Middle Name',
    maxLength: 50,
    example: 'Brita',
  })
  @IsOptional()
  @Matches('^[A-Za-z ]+$', '', {
    message: 'Middle name must be alphabetical',
  })
  @MaxLength(50, { message: 'Middle name cannot exceed 50 characters' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  middleName?: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '+639123456789',
  })
  @Matches('^[+][0-9]+$', '', {
    message: 'Phone number must be in international format',
  })
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    description: 'Address',
    example: '123 Main St.',
  })
  @IsOptional()
  @MaxLength(255, { message: 'Address cannot exceed 255 characters' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  address: string;

  @ApiPropertyOptional({
    description: 'QR Url',
    example: 'https://example.com/qr.png',
  })
  @IsOptional()
  @MaxLength(255, { message: 'QR URL cannot exceed 255 characters' })
  qrUrl?: string;

  @ApiPropertyOptional({
    description: 'Avatar Url',
    example: 'https://example.com/avatar.png',
  })
  @IsOptional()
  @MaxLength(255, { message: 'Avatar URL cannot exceed 255 characters' })
  avatarUrl?: string;
}
