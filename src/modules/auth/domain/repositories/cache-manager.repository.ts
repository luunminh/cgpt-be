import { createInterfaceToken } from '@core/utils';

export const CacheManagerRepositoryToken = createInterfaceToken(
  'CacheManagerRepository',
);

export interface ICacheManagerRepository {
  /**
   * Generate a cache key
   * @param userId The user ID
   * @returns The cache key
   */
  get(userId: string): Promise<string[]>;

  /**
   * Save the permissions for the user
   * @param userId
   * @param permissions
   */
  save(userId: string, permissions: string[]): Promise<string[]>;

  /**
   *
   * @param userId
   */
  clear(userId: string): Promise<void>;
}
