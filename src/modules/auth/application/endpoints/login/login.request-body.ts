import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    description: 'Username',
    example: 'minh_luu',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'Abcd@1234',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
