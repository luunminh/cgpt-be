import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TransactionParticipantUserIdTransactionIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  transactionId: string;
}

@ApiExtraModels(TransactionParticipantUserIdTransactionIdUniqueInputDto)
export class ConnectTransactionParticipantDto {
  @ApiProperty({
    type: TransactionParticipantUserIdTransactionIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TransactionParticipantUserIdTransactionIdUniqueInputDto)
  userId_transactionId: TransactionParticipantUserIdTransactionIdUniqueInputDto;
}
