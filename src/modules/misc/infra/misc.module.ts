import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@system';
import * as useCases from '../applications/endpoints';

const applications = Object.values(useCases);
const endpoints = applications.filter((x) => x.name.endsWith('Endpoint'));
const handlers = applications.filter((x) => x.name.endsWith('Handler'));

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [...endpoints],
  providers: [...handlers],
})
export class MiscModule {}
