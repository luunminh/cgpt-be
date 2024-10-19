import { RenewTokensRequestBody } from './renew-tokens.request-body';

export class RenewTokensCommand {
  constructor(public readonly body: RenewTokensRequestBody) {}
}
