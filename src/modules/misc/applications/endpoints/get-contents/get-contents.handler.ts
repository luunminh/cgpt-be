import { LKExpenseCategoryModel } from '@core/generated';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryGroupType, Prisma } from '@prisma/client';
import { DatabaseService } from '@system';
import { GetContentsQuery } from './get-contents.query';
import { GetContentsResponse } from './get-contents.response';

@QueryHandler(GetContentsQuery)
export class GetContentsHandler
  implements IQueryHandler<GetContentsQuery, GetContentsResponse>
{
  constructor(private readonly dbContext: DatabaseService) {}

  public async execute(query: GetContentsQuery): Promise<GetContentsResponse> {
    return await this.getContents(query.userId);
  }

  private async getContents(userId: string): Promise<GetContentsResponse> {
    const [countryOptions, expenseCategoryOptions] = await Promise.all([
      this.dbContext.lkCountry.findMany({
        orderBy: [
          {
            id: Prisma.SortOrder.asc,
          },
        ],
      }),
      this.dbContext.lKExpenseCategory.findMany({
        orderBy: [
          {
            type: Prisma.SortOrder.asc,
          },
        ],
      }),
    ]);

    return {
      countryOptions,
      expenseCategoryOptions: this.mapExpenseCategory(expenseCategoryOptions),
    };
  }

  private mapExpenseCategory(ecs: LKExpenseCategoryModel[]) {
    const groupRecords = ecs.reduce(
      (acc, record) => {
        if (!acc[record.type]) {
          acc[record.type] = [];
        }

        acc[record.type].push(record);
        return acc;
      },
      {} as Record<CategoryGroupType, LKExpenseCategoryModel[]>,
    );

    return groupRecords;
  }
}
