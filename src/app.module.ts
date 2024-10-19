import { AuthModule } from '@modules/auth';
import { SystemModule } from '@modules/system';
import { UserModule } from '@modules/user';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@system/database';

@Module({
  imports: [SystemModule, DatabaseModule, AuthModule, UserModule],
})
export class AppModule {}
