import { AuthService } from '@modules/auth/application';
import {
  CacheManagerAdapter,
  JwtAdapter,
  PasswordManagerAdapter,
} from '@modules/auth/domain/adapter';
import { UserModule } from '@modules/user';
import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigFactory, DatabaseModule } from '@system';
import * as useCases from '../application/endpoints';
import {
  CacheManagerRepositoryToken,
  JwtRepositoryToken,
} from '../domain/repositories';
import { AuthStrategy } from '../infra/strategies';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [
    CqrsModule,
    DatabaseModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: (config: ConfigFactory) => ({
        secret: config.getJWTConfig(),
      }),
      inject: [ConfigFactory],
    }),
  ],
  controllers: [...endpoints],
  providers: [
    {
      provide: JwtRepositoryToken,
      useClass: JwtAdapter,
    },
    {
      provide: CacheManagerRepositoryToken,
      useClass: CacheManagerAdapter,
    },
    PasswordManagerAdapter,
    AuthStrategy,
    AuthService,
    ...handlers,
  ],
  exports: [PasswordManagerAdapter],
})
export class AuthModule {}
