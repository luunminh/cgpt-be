import { RequestUser } from '../../dtos';

export class LogoutCommand {
  constructor(public readonly user: RequestUser) {}
}
