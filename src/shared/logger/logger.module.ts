import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { v4 as uuid_v4 } from 'uuid';
import { LoggerConfig, loggerConfig } from './logger.config';

const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  load: [loggerConfig.config],
  validationSchema: Joi.object({
    ...loggerConfig.schema,
  }),
  validationOptions: { abortEarly: true },
});

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [LoggerConfig],
      providers: [LoggerConfig],
      useFactory: async (config: LoggerConfig) => {
        return {
          pinoHttp: {
            level: config.level,
            useLevelLabels: true,
            genReqId: () => uuid_v4(),
            transport:
              process.env.NODE_ENV === 'local'
                ? { target: 'pino-pretty' }
                : undefined,
            redact: {
              paths: [
                'req.headers.cookie',
                "req.headers['x-api-key']",
                'req.headers.authorization',
                "req.headers['x-apigateway-event']",
                "req.headers['x-apigateway-context']",
              ],
              remove: true,
            },
          },
          exclude: [
            { method: RequestMethod.GET, path: '/health' },
            ...config.exclude,
          ],
        };
      },
    }),
  ],
})
export class LoggerModule {}
