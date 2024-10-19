import { UserModule } from '@modules/user';
import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigFactory } from '@system';
import { DatabaseModule } from '@system/database';
import * as useCases from '../application/endpoints';
import { AuthService } from '../application/services';
import { CacheManagerAdapter, JwtAdapter } from '../domain/adapter';
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
    AuthStrategy,
    AuthService,
    ...handlers,
  ],
  exports: [],
})
export class AuthModule {}
