import { AuthModule } from '@modules/auth';
import { GroupModule } from '@modules/group';
import { MiscModule } from '@modules/misc';
import { SystemModule } from '@modules/system';
import { UserModule } from '@modules/user';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@system/database';

@Module({
  imports: [
    SystemModule,
    DatabaseModule,
    MiscModule,
    AuthModule,
    UserModule,
    GroupModule,
  ],
})
export class AppModule {}
