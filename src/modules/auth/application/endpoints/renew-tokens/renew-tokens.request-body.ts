import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RenewTokensRequestBody {
  @ApiProperty({
    description: 'Refresh token',
    required: true,
  })
  @IsString()
  refreshToken: string;
}
