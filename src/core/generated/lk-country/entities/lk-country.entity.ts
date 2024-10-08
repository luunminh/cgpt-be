import { ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from '../../group/entities/group.entity';

export class LkCountryEntity {
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
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'string',
  })
  currencyCode: string;
  @ApiProperty({
    type: 'string',
  })
  currencySymbol: string;
  @ApiProperty({
    type: () => GroupEntity,
    isArray: true,
    required: false,
  })
  groups?: GroupEntity[];
}
