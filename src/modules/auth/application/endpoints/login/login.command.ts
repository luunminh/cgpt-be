import { LoginRequestBody } from './login.request-body';

export class LoginCommand {
  constructor(public readonly body: LoginRequestBody) {}
}
