import { ConfigFactory } from '@config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { ICacheManagerRepository } from '../repositories/cache-manager.repository';

@Injectable()
export class CacheManagerAdapter implements ICacheManagerRepository {
  private readonly ttl: number;
  private static CACHE_KEY = 'RK';

  private static generateKey(userId: string) {
    return `${CacheManagerAdapter.CACHE_KEY}-${userId}`;
  }

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private config: ConfigFactory,
  ) {
    this.ttl = this.config.getRFExpiration();
  }

  async get(userId: string): Promise<string[]> {
    const rights: string[] | undefined = await this.cacheManager.get<
      string[] | undefined
    >(CacheManagerAdapter.generateKey(userId));
    return rights ?? [];
  }

  async save(userId: string, permissions: string[]): Promise<string[]> {
    return await this.cacheManager.set(
      CacheManagerAdapter.generateKey(userId),
      permissions.map((p) => p),
      this.ttl,
    );
  }

  async clear(userId: string): Promise<void> {
    await this.cacheManager.del(CacheManagerAdapter.generateKey(userId));
  }
}
