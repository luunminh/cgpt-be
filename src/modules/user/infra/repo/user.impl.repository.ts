/* eslint-disable security/detect-object-injection */
import { CommandEntity } from '@core/domain-base';
import { MapRoleByUserType } from '@modules/user/domain';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, UserStatus } from '@prisma/client';
import {
  PaginatedApiResponseDto,
  Pagination,
  PaginationRequest,
} from '@shared/pagination';
import { DatabaseService } from '@system/database';
import { UserEntity } from '@types';
import { IUserRepository } from '../../domain/repositories';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private dbCtx: DatabaseService) {}

  async findById(id: string): Promise<UserEntity> {
    const user = await this.dbCtx.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    return user;
  }

  async findByKey({
    key,
    value,
  }: {
    key: keyof UserEntity;
    value: any;
  }): Promise<UserEntity> {
    const user = await this.dbCtx.user.findFirst({
      where: { [key]: value },
    });

    if (!user) {
      throw new BadRequestException(`User with key ${key} not found`);
    }

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.dbCtx.user.findMany();
  }

  async findAllPaginated(
    params: PaginationRequest,
    andWhereConditions: Prisma.Enumerable<Prisma.UserWhereInput>,
  ): Promise<PaginatedApiResponseDto<UserEntity>> {
    const { skip, take, order } = params;

    const [users, total] = await Promise.all([
      await this.dbCtx.user.findMany({
        skip,
        take,
        where: { AND: andWhereConditions },
        orderBy: this.getOrderBy(order),
      }),
      this.dbCtx.user.count({ where: { AND: andWhereConditions } }),
    ]);

    return Pagination.of({ take, skip }, total, users);
  }

  private getOrderBy(
    order?: string,
  ): Prisma.Enumerable<Prisma.UserOrderByWithRelationInput> {
    if (!order) {
      return {
        createdAt: Prisma.SortOrder.desc,
      };
    }

    const [field, direction] = order.split(':') as [string, Prisma.SortOrder];

    return {
      [field]: direction,
    };
  }

  async findAllByIds(ids: string[]): Promise<UserEntity[]> {
    return this.dbCtx.user.findMany({
      where: { id: { in: ids } },
    });
  }

  async existsById(id: string): Promise<boolean> {
    const user = await this.dbCtx.user.findFirst({
      where: { id },
    });

    return !!user;
  }

  async count(): Promise<number> {
    return this.dbCtx.user.count();
  }

  async insert(entity: CommandEntity<UserEntity>): Promise<UserEntity> {
    const {
      firstName,
      lastName,
      middleName,
      username,
      email,
      fullName,
      userType,
      hashedPassword,
      status = UserStatus.ACTIVE,
    } = entity || {};

    return this.transaction<UserEntity>(async (trx) => {
      const role = await trx.role.findFirst({
        where: {
          name: MapRoleByUserType[userType],
        },
      });

      return await this.dbCtx.user.create({
        data: {
          firstName,
          lastName,
          middleName,
          username,
          email,
          fullName,
          hashedPassword,
          userType,
          status,
          roles: {
            create: {
              roleId: role.id,
            },
          },
          profile: {
            create: {},
          },
        },
      });
    });
  }

  async insertMany(entities: UserEntity[]): Promise<void> {
    await this.dbCtx.user.createMany({
      data: entities,
    });
  }

  async update(entity: CommandEntity<UserEntity>): Promise<UserEntity> {
    const {
      id,
      firstName,
      lastName,
      middleName,
      username,
      email,
      fullName,
      hashedPassword,
      status,
      profile,
    } = entity;

    return this.dbCtx.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        middleName,
        username,
        email,
        fullName,
        hashedPassword,
        status,
        ...(profile && profile),
      },
    });
  }

  async updateMany(entities: CommandEntity<UserEntity[]>): Promise<void> {
    await this.dbCtx.user.updateMany({
      data: entities,
    });
  }

  async delete(entity: UserEntity): Promise<boolean> {
    const user = await this.dbCtx.user.delete({
      where: { id: entity.id },
    });

    return !!user;
  }

  async deleteById(id: string): Promise<boolean> {
    const user = await this.dbCtx.user.delete({
      where: { id },
    });

    return !!user;
  }

  async deleteAllByIds(ids: string[]): Promise<boolean> {
    const users = await this.dbCtx.user.deleteMany({
      where: { id: { in: ids } },
    });

    return !!users;
  }

  async transaction<T>(
    handler: (trx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T> {
    return this.dbCtx.$transaction(handler);
  }

  async findByWhereConditions<T = UserEntity>({
    conditions,
    select,
  }: {
    conditions: Prisma.UserWhereInput;
    select?: Prisma.UserSelect;
  }): Promise<T> {
    const user = await this.dbCtx.user.findFirst({
      where: conditions,
      ...(select && { include: select }),
    });

    return user as unknown as T;
  }
}
