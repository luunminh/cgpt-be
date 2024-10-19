import {
  ConfigFactory,
  HEADER_TIMEOUT,
  JSON_LIMIT,
  SERVER_ALIVE_TIMEOUT,
} from '@config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GlobalExceptionFilter } from '@shared/filters';
import { TimeoutInterceptor } from '@shared/interceptors';
import { configureSwagger } from '@system/swagger';
import compression from 'compression';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = app.get(ConfigFactory);
  const logger = new Logger();

  const { env, name, prefix, port, version } = (() => ({
    env: config.getEnv(),
    port: config.getPort(),
    name: config.getAppName(),
    prefix: config.getAPIPrefix(),
    version: config.getAPIVersion(),
  }))();

  const isProduction = env === 'production';

  app.use(helmet());
  app.use(compression());
  app.use(json({ limit: JSON_LIMIT }));
  app.use(urlencoded({ extended: true }));

  app.enableCors();
  app.enableVersioning();

  app.useGlobalFilters(
    new GlobalExceptionFilter({ includeSensitive: !isProduction }),
  );

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix(prefix);

  /**
   * Setup Swagger in the application
   */
  configureSwagger({
    app,
    options: {
      path: prefix,
      apiVersion: version,
      disabled: isProduction,
    },
    configure: (builder) =>
      builder.setTitle(`${name} - ${env}`).setDescription(name),
  });

  const server = await app.listen(port, () => {
    const memUsage = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);
    const cpuUsage = process.cpuUsage().user / 1000;

    logger.log(`Server running on ${port} in ${env} mode`);
    logger.log(`Memory usage: ${memUsage} MB - CPU usage: ${cpuUsage}%`);
  });

  server.keepAliveTimeout = SERVER_ALIVE_TIMEOUT;
  server.headersTimeout = HEADER_TIMEOUT;

  const url = await app.getUrl();
  logger.log(`Application is running on: ${url}`);
  logger.log(`Swagger running on ${url}${prefix}/swagger`);
}
bootstrap();
