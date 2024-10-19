import { RequestUser } from '@modules/auth/application/dtos';
import { NullableType } from 'joi';

export function extractJwtPayload(token: string): NullableType<RequestUser> {
  const jwtPayloadSerialized = token.split('.')[1];

  if (!jwtPayloadSerialized) {
    return null;
  }

  return JSON.parse(Buffer.from(jwtPayloadSerialized, 'base64').toString());
}
