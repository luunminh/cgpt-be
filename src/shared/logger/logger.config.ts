import { EnvKeyEnum } from '@config';
import { Inject, Injectable, RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { ConfigType, registerAs } from '@nestjs/config';
import Joi from 'joi';

const schema = Joi.object({
  [EnvKeyEnum.LOG_LEVEL]: Joi.string()
    .valid('trace', 'error', 'warn', 'debug', 'info')
    .default('info'),
  /**
   * e.g. GET::/health,POST::/network
   */
  [EnvKeyEnum.LOG_EXCLUDE]: Joi.string().optional(),
});

const config = registerAs('logger', () => ({
  level: process.env.LOG_LEVEL,
  exclude: process.env.LOG_EXCLUDE,
}));

export const loggerConfig = {
  config,
  schema,
};

@Injectable()
export class LoggerConfig {
  public readonly level: string;
  public readonly exclude: (string | RouteInfo)[];

  constructor(
    @Inject(config.KEY)
    config: ConfigType<typeof loggerConfig.config>,
  ) {
    this.level = config.level;
    this.exclude = (config.exclude || '')
      .split(',')
      .filter((x) => x)
      .map((x) => {
        const [method, path] = x.split('::');

        if (!method || !path) {
          throw new Error(
            `Invalid logger configuration. ${method} and ${path}.`,
          );
        }

        return {
          // eslint-disable-next-line security/detect-object-injection
          method: RequestMethod[method as keyof typeof RequestMethod],
          path: path,
        };
      });
  }
}
