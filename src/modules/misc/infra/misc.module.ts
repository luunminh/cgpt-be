import { Module } from '@nestjs/common';
import { DatabaseModule } from '@system';

@Module({
  imports: [DatabaseModule],
  providers: [],
  exports: [],
})
export class MiscModule {}
