import { LkCountryModel } from '@core/generated/lk-country/dto';
import { LKExpenseCategoryModel } from '@core/generated/lkexpense-category/dto';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryGroupType } from '@prisma/client';

export class GetContentsResponse {
  @ApiProperty({
    type: LkCountryModel,
    isArray: true,
  })
  countryOptions: LkCountryModel[];

  @ApiProperty({
    type: LKExpenseCategoryModel,
    isArray: true,
    example: {
      ENTERTAINMENT: [
        {
          id: 'string',
          createdAt: '2024-11-14T14:16:06.240Z',
          updatedAt: '2024-11-14T14:16:06.240Z',
          updatedById: 'string',
          type: 'ENTERTAINMENT',
          name: 'string',
        },
      ],
      FOOD: [
        {
          id: 'string',
          createdAt: '2024-11-14T14:16:06.240Z',
          updatedAt: '2024-11-14T14:16:06.240Z',
          updatedById: 'string',
          type: 'ENTERTAINMENT',
          name: 'string',
        },
      ],
    },
  })
  expenseCategoryOptions: Record<CategoryGroupType, LKExpenseCategoryModel[]>;
}
