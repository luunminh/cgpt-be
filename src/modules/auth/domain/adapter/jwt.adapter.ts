import { UserEntity } from '@core/generated';
import { RequestUser } from '@modules/auth/application';
import {
  CacheManagerRepositoryToken,
  ICacheManagerRepository,
  IJwtRepository,
} from '@modules/auth/domain/repositories';
import { AuthCredentials } from '@modules/auth/domain/value-objects';
import { extractJwtPayload } from '@modules/auth/infra/utils';
import { IUserRepository, UserRepositoryToken } from '@modules/user';
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigFactory } from '@system/config';

@Injectable()
export class JwtAdapter implements IJwtRepository {
  private readonly accessTokenExpiresIn: number;
  private readonly refreshTokenExpiresIn: number;

  constructor(
    @Inject(CacheManagerRepositoryToken)
    private readonly cacheManager: ICacheManagerRepository,
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly config: ConfigFactory,
    private readonly jwtService: JwtService,
  ) {
    this.accessTokenExpiresIn = this.config.getACExpiration();
    this.refreshTokenExpiresIn = this.config.getRFExpiration();
  }

  async generateTokens(
    user: UserEntity,
    providedRefreshToken?: string,
  ): Promise<AuthCredentials> {
    const formattedUser = this.mappingToReqUser(user);

    const accessToken = await this.jwtService.signAsync(formattedUser, {
      expiresIn: this.accessTokenExpiresIn,
    });

    const refreshToken = providedRefreshToken
      ? providedRefreshToken
      : await this.jwtService.signAsync(formattedUser, {
          expiresIn: this.refreshTokenExpiresIn,
        });

    return { accessToken, refreshToken };
  }

  async renewTokens(token: string): Promise<AuthCredentials> {
    try {
      const reqUser = await this.jwtService.verifyAsync<RequestUser>(token);

      const user = await this.userRepository.findByWhereConditions<UserEntity>({
        conditions: { id: reqUser.id },
        select: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    select: {
                      permission: {
                        select: {
                          displayName: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      const [tokens] = await Promise.all([
        this.generateTokens(user, token),
        this.cacheManager.save(
          reqUser.id,
          this.mappingToReqUser(user).permissions,
        ),
      ]);

      return tokens;
    } catch (error) {
      Logger.log(error);
      const jwtPayload = extractJwtPayload(token);

      if (!jwtPayload) {
        throw new UnauthorizedException('INVALID_TOKEN_FORMAT');
      }

      await this.cacheManager.clear(jwtPayload.id);

      throw new UnauthorizedException('LOGOUT_REQUIRED');
    }
  }

  mappingToReqUser(user: UserEntity): RequestUser {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles?.map((r) => r.role.displayName),
      permissions: user?.roles.flatMap((r) =>
        r.role.permissions.map((p) => p.permission.displayName),
      ),
    };
  }
}
