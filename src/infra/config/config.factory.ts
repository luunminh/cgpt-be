import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isBooleanString } from 'class-validator';
import { Env, Environment, EnvKey, EnvKeyEnum } from './config.entity';

@Injectable()
export class ConfigFactory {
  constructor(private readonly configService: ConfigService<Env>) {}

  private getNumber(key: EnvKey): number {
    const value = Number(this.get(key));

    if (isNaN(value)) {
      throw new Error(key + ' environment variable is not a number');
    }

    return value;
  }

  private getBoolean(key: EnvKey): boolean {
    const value = this.get(key).toLowerCase();

    if (!isBooleanString(value)) {
      throw new Error(`${key} environment variable is not a boolean`);
    }

    return value === 'true';
  }

  private getString(key: EnvKey): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private get(key: EnvKey): string {
    const value = this.configService.get(key);

    if (!value) {
      throw new Error(`Missing key: ${key} in environment setup`);
    }

    return value;
  }

  getPort() {
    return this.getNumber(EnvKeyEnum.APP_PORT);
  }

  getAppName() {
    return this.getString(EnvKeyEnum.APP_NAME);
  }

  getAPIVersion() {
    return this.getString(EnvKeyEnum.API_VERSION);
  }

  getAPIPrefix() {
    return this.getString(EnvKeyEnum.API_PREFIX);
  }

  getACExpiration() {
    return this.getNumber(EnvKeyEnum.ACCESS_TOKEN_EXPIRATION);
  }

  getRExpiration() {
    return this.getNumber(EnvKeyEnum.REFRESH_TOKEN_EXPIRATION);
  }

  getJWTConfig() {
    return this.getString(EnvKeyEnum.JWT_SECRET);
  }

  getEnv(): Environment {
    return this.getString(EnvKeyEnum.NODE_ENV) as Environment;
  }
}
