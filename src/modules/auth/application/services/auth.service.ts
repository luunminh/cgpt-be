import { UserEntity } from '@core/generated';
import { IUserRepository, UserRepositoryToken } from '@modules/user';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { ISignupDto } from '../..';
import { JwtAdapter } from '../../domain/adapter';
import {
  CacheManagerRepositoryToken,
  IAuthRepository,
  ICacheManagerRepository,
  JwtRepositoryToken,
} from '../../domain/repositories';
import { AuthCredentials } from '../../domain/value-objects';

@Injectable()
export class AuthService implements IAuthRepository {
  constructor(
    @Inject(JwtRepositoryToken)
    private jwtAdapter: JwtAdapter,
    @Inject(CacheManagerRepositoryToken)
    private cacheManager: ICacheManagerRepository,
    @Inject(UserRepositoryToken)
    private userRepository: IUserRepository,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepository.findByWhereConditions<UserEntity>({
      conditions: {
        username: username,
      },
      select: {
        profile: true,
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

    const isValidUser =
      !!user && (await this.jwtAdapter.compare(password, user.hashedPassword));

    if (!isValidUser) {
      throw new BadRequestException('Invalid Credentials, please try again!');
    }

    const tokens = await this.jwtAdapter.generateTokens(user);

    await this.cacheManager.save(
      user.id,
      this.jwtAdapter.mappingToReqUser(user).permissions,
    );

    return tokens;
  }

  async signup(body: ISignupDto): Promise<void> {
    const { username, email, firstName, lastName, password } = body;

    const foundUser = await this.userRepository.findByWhereConditions({
      conditions: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
      select: {},
    });

    if (foundUser) {
      throw new BadRequestException(
        'An account with this email or username already exists.',
      );
    }

    const hashedPassword = await this.jwtAdapter.generateHash(password);

    const payload = {
      username,
      email,
      firstName,
      lastName,
      hashedPassword,
    };

    await this.userRepository.insert({
      ...payload,
      userType: UserType.USER,
    } as any);
  }

  async logout(userId: string) {
    if (!userId) {
      throw new BadRequestException('Request User not found!');
    }

    return await this.cacheManager.clear(userId);
  }

  async renewToken(refreshToken: string): Promise<AuthCredentials> {
    const tokens = await this.jwtAdapter.renewTokens(refreshToken);

    if (!tokens) {
      throw new BadRequestException('Invalid refresh token');
    }

    return tokens;
  }
}
