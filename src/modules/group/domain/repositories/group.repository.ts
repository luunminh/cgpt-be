import { BaseRepository } from '@modules/misc/domain';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@system';

@Injectable()
export class GroupRepository extends BaseRepository<'group'> {
  constructor(ORM: DatabaseService) {
    super(ORM, 'group');
  }
}
