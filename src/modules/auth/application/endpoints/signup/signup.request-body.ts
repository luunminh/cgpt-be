import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupRequestBody {
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
    description: 'First name',
    example: 'Minh',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Luu',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Email',
    example: 'minh_luu@datahouse.com',
    required: true,
    nullable: false,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
