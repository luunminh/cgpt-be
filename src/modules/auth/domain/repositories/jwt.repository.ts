import { UserEntity } from '@core/generated';
import { createInterfaceToken } from '@core/utils';
import { RequestUser } from '../../';
import { AuthCredentials } from '../../domain/value-objects';

export const JwtRepositoryToken = createInterfaceToken('JwtRepository');

export interface IJwtRepository {
  /**
   * Generate tokens for the user
   * @param user - Request User to generate tokens for
   * @param providedRefreshToken
   */
  generateTokens(
    user: UserEntity,
    providedRefreshToken?: string,
  ): Promise<AuthCredentials>;

  /**
   * Generate hash for the data
   * @param data
   */
  generateHash(data: string): Promise<string>;

  /**
   * Compare the data with the encrypted data
   * @param data
   * @param boolean
   */
  compare(data: string, encrypted: string): Promise<boolean>;

  /**
   * Mapping user to RequestUser (including necessary fields for token generation)
   * @param user
   * @returns RequestUser
   */
  mappingToReqUser(user: UserEntity): RequestUser;

  /**
   * Renew the tokens
   * @param token
   */
  renewTokens(token: string): Promise<AuthCredentials>;
}
