import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LedgerModel {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  updatedById: string | null;
  @ApiProperty({
    type: 'number',
    format: 'double',
  })
  amount: Prisma.Decimal;
}
