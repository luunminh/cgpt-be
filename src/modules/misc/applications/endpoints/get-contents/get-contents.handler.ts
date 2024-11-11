import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DatabaseService } from '@system';
import { GetContentsQuery } from './get-contents.query';
import { GetContentsResponse } from './get-contents.response';

@QueryHandler(GetContentsQuery)
export class GetContentsHandler
  implements IQueryHandler<GetContentsQuery, GetContentsResponse[]>
{
  constructor(private readonly dbContext: DatabaseService) {}

  public async execute(
    query: GetContentsQuery,
  ): Promise<GetContentsResponse[]> {
    return await this.getContents(query.userId);
  }

  private async getContents(userId: string): Promise<GetContentsResponse[]> {
    return {} as any;
  }
}
