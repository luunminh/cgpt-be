import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GroupType } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateGroupRequestBody {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'A Group to travel the world',
  })
  @MaxLength(255)
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  avatarUrl?: string;

  @ApiProperty({
    example: 'FAMILY',
  })
  @IsNotEmpty()
  type: typeof GroupType;

  @ApiProperty({
    example: ['00000000-0000-0000-0000-000000000000'],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  members: string[];

  @ApiProperty({
    example: 'VN',
  })
  @IsString()
  @IsNotEmpty()
  lkCurrencyId: string;
}
