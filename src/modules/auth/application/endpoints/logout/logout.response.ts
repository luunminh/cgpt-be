import { ApiProperty } from '@nestjs/swagger';
import { AuthCredentials } from '../../../domain/value-objects';

export class LogoutResponse implements AuthCredentials {
  @ApiProperty({
    description: 'Access token',
    required: true,
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    required: true,
  })
  refreshToken: string;
}
