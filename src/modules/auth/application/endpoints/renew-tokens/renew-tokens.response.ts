import { AuthCredentials } from '../../../domain/value-objects';

export class RenewTokensResponse implements AuthCredentials {
  accessToken: string;
  refreshToken: string;
}
