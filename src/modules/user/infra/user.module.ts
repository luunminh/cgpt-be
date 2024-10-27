import { AuthModule } from '@modules/auth';
import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@system';
import { UserRepository } from '.';
import * as useCases from '../application/endpoints';
import { UserRepositoryToken } from '../domain/repositories';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [DatabaseModule, CqrsModule, forwardRef(() => AuthModule)],
  controllers: [...endpoints],
  providers: [
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
    ...handlers,
  ],
  exports: [UserRepositoryToken],
})
export class UserModule {}
