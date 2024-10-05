import { SystemModule } from '@modules/system';
import { Module } from '@nestjs/common';

@Module({
  imports: [SystemModule],
})
export class AppModule {}
