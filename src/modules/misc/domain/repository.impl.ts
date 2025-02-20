import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DatabaseService } from '@system';

export class BaseRepository<
  K extends Exclude<keyof PrismaClient, symbol | `$${string}`>,
> {
  private readonly model!: K;

  constructor(
    private readonly prisma: DatabaseService,
    model: K,
  ) {
    this.model = model;
  }

  aggregate(...args: Parameters<PrismaClient[K]['aggregate']>) {
    return (this.prisma[this.model].aggregate as any)(...args);
  }

  count(...args: Parameters<PrismaClient[K]['count']>) {
    return (this.prisma[this.model].count as any)(...args);
  }

  create(...args: Parameters<PrismaClient[K]['create']>) {
    return (this.prisma[this.model].create as any)(...args);
  }

  createMany(...args: Parameters<PrismaClient[K]['createMany']>) {
    return (this.prisma[this.model].createMany as any)(...args);
  }

  delete(...args: Parameters<PrismaClient[K]['delete']>) {
    return (this.prisma[this.model].delete as any)(...args);
  }

  findFirst(...args: Parameters<PrismaClient[K]['findFirst']>) {
    return (this.prisma[this.model].findFirst as any)(...args);
  }

  findFirstOrThrow(...args: Parameters<PrismaClient[K]['findFirstOrThrow']>) {
    return (this.prisma[this.model].findFirstOrThrow as any)(...args);
  }

  findMany(...args: Parameters<PrismaClient[K]['findMany']>) {
    return (this.prisma[this.model].findMany as any)(...args);
  }

  findUnique(...args: Parameters<PrismaClient[K]['findUnique']>) {
    return (this.prisma[this.model].findUnique as any)(...args);
  }

  findUniqueOrThrow(...args: Parameters<PrismaClient[K]['findUniqueOrThrow']>) {
    return (this.prisma[this.model].findUniqueOrThrow as any)(...args);
  }

  update(...args: Parameters<PrismaClient[K]['update']>) {
    return (this.prisma[this.model].update as any)(...args);
  }

  updateMany(...args: Parameters<PrismaClient[K]['updateMany']>) {
    return (this.prisma[this.model].updateMany as any)(...args);
  }

  upsert(...args: Parameters<PrismaClient[K]['upsert']>) {
    return (this.prisma[this.model].upsert as any)(...args);
  }

  transaction<T>(handler: (trx: Prisma.TransactionClient) => Promise<T>) {
    return this.prisma.$transaction(handler);
  }
}
