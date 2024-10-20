import { ConfigFactory } from '@config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RequestUser } from '../../application';
import {
  CacheManagerRepositoryToken,
  ICacheManagerRepository,
} from '../../domain';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigFactory,
    @Inject(CacheManagerRepositoryToken)
    private cacheManager: ICacheManagerRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getJWTConfig(),
    });
  }

  async validate(payload: RequestUser): Promise<RequestUser> {
    const isValid = await this.isValidCache(payload.id);

    if (!isValid) {
      throw new UnauthorizedException('Unauthorized');
    }

    return payload;
  }

  /**
   * Whatever when we update user permission, we need to remove cache to forced user to re-login,
   * and in-case the old token still valid, we need to check the cache to make sure the user is still valid
   * @param userId
   * @returns
   */
  private async isValidCache(userId: string) {
    const permissions = await this.cacheManager.get(userId);

    const hasExit = permissions.length > 0;
    return hasExit;
  }
}
