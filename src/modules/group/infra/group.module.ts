import { AuthModule } from '@modules/auth';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@system';
import * as useCases from '../application/endpoints';
import { GroupRepository } from '../domain';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [DatabaseModule, CqrsModule, AuthModule],
  controllers: [...endpoints],
  providers: [...handlers, GroupRepository],
  exports: [GroupRepository],
})
export class GroupModule {}
