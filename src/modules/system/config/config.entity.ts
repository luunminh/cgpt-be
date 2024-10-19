export type Env = {
  APP_NAME: string;
  APP_PORT: number;

  NODE_ENV: string;

  API_PREFIX: string;
  API_VERSION: string;

  DATABASE_URL: string;

  JWT_SECRET: string;
  ACCESS_TOKEN_EXPIRATION: string;
  REFRESH_TOKEN_EXPIRATION: string;

  LOG_LEVEL: string;
  LOG_EXCLUDE: string;
};

export type EnvKey = keyof Env;

export enum EnvKeyEnum {
  APP_NAME = 'APP_NAME',
  APP_PORT = 'APP_PORT',

  NODE_ENV = 'NODE_ENV',

  API_PREFIX = 'API_PREFIX',
  API_VERSION = 'API_VERSION',

  DATABASE_URL = 'DATABASE_URL',

  JWT_SECRET = 'JWT_SECRET',
  ACCESS_TOKEN_EXPIRATION = 'ACCESS_TOKEN_EXPIRATION',
  REFRESH_TOKEN_EXPIRATION = 'REFRESH_TOKEN_EXPIRATION',

  LOG_LEVEL = 'LOG_LEVEL',
  LOG_EXCLUDE = 'LOG_EXCLUDE',
}

export type Environment =
  | 'local'
  | 'development'
  | 'test'
  | 'staging'
  | 'production';

export type LogLevel = 'error' | 'warn' | 'debug' | 'trace' | 'info';
