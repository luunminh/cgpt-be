import { IRepository } from '@core/domain-base';
import { createInterfaceToken } from '@core/utils';
import { Prisma } from '@prisma/client';
import { UserEntity } from '@types';

export const UserRepositoryToken = createInterfaceToken('UserRepository');

export interface IUserRepository extends IRepository<UserEntity> {
  findByWhereConditions<T>({
    conditions,
    select,
  }: {
    conditions: Prisma.UserWhereInput;
    select: Prisma.UserSelect;
  }): Promise<T>;
}
