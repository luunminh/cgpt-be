import { Prisma } from '@prisma/client';
import { PaginatedApiResponseDto, PaginationRequest } from '@shared/pagination';

export type CommandEntity<T> = Omit<
  T,
  'createdAt' | 'updatedAt' | 'updatedById' | 'id'
> & { id?: string };

export interface IRepository<Entity> {
  findById(id: string): Promise<Entity>;
  findByKey({ key, value }: { key: keyof Entity; value: any }): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findAllByIds(ids: string[]): Promise<Entity[]>;
  findAllPaginated<T = any>(
    params: PaginationRequest,
    andWhereConditions?: Prisma.Enumerable<T>,
  ): Promise<PaginatedApiResponseDto<Entity>>;
  existsById(id: string): Promise<boolean>;
  count(): Promise<bigint | number>;

  insert(entity: CommandEntity<Entity>): Promise<void> | Promise<Entity>;
  insertMany(
    entities: CommandEntity<Entity>[],
  ): Promise<void> | Promise<Entity[]>;

  update(entity: CommandEntity<Entity>): Promise<void> | Promise<Entity>;
  updateMany(
    entities: CommandEntity<Entity>[],
  ): Promise<void> | Promise<Entity[]>;

  delete(entity: Entity): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  deleteAllByIds(ids: string[]): Promise<boolean>;

  transaction<T>(
    handler: (trx: Prisma.TransactionClient) => Promise<T>,
  ): Promise<T>;
}
