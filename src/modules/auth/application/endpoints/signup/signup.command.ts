import { SignupRequestBody } from './signup.request-body';

export class SignupCommand {
  constructor(public readonly body: SignupRequestBody) {}
}
