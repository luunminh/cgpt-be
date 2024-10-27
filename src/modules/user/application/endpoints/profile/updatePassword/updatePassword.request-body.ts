import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordRequestBody {
  @ApiProperty({
    description: 'Old Password',
    example: 'Abcd@1234',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'New password',
    example: 'Abcd@12345',
  })
  @IsString()
  newPassword: string;
}
