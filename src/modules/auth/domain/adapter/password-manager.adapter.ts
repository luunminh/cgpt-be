import { Injectable } from '@nestjs/common';
import { ConfigFactory } from '@system';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class PasswordManagerAdapter {
  private readonly saltRounds: number;

  constructor(private readonly config: ConfigFactory) {
    this.saltRounds = this.config.getSaltRounds();
  }

  async generate(data: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);

    return hash(data, salt);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return await compare(data, encrypted);
  }
}
