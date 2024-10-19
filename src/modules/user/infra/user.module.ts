import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@system';
import { UserRepository } from '.';
import { UserRepositoryToken } from '../domain/repositories';

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [],
  providers: [
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
  ],
  exports: [UserRepositoryToken],
})
export class UserModule {}
