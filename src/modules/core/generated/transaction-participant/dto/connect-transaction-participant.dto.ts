import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TransactionParticipantUserIdTransactionIdUniqueInputModel {
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

@ApiExtraModels(TransactionParticipantUserIdTransactionIdUniqueInputModel)
export class ConnectTransactionParticipantModel {
  @ApiProperty({
    type: TransactionParticipantUserIdTransactionIdUniqueInputModel,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TransactionParticipantUserIdTransactionIdUniqueInputModel)
  userId_transactionId: TransactionParticipantUserIdTransactionIdUniqueInputModel;
}
