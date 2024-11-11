import { ApiProperty } from '@nestjs/swagger';

export class GetContentsResponse {
  @ApiProperty({
    description: 'ID',
    example: '487971f1-018d-4973-bd50-4743bd716559',
  })
  id: string;

  @ApiProperty({
    description: 'Updated at',
    example: '2022-01-19T17:23:30.530Z',
  })
  updatedAt: Date;
}
