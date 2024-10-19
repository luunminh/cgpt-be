import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type SwaggerConfig = {
  /**
   * The NestJS application
   */
  app: INestApplication;

  /**
   * The configuration of the Swagger
   */
  configure: (builder: DocumentBuilder) => void;

  /**
   * The options of the Swagger
   */
  options: {
    /**
     * The path of the Swagger
     */
    path: string;

    /**
     * The title of the Swagger
     */
    apiVersion: string;

    /**
     * Enabled Delegation API Key
     */
    includeDelegation?: boolean;

    /**
     * Enabled Active Role API Key
     */
    includeActiveRole?: boolean;

    /**
     * Disabled Swagger
     */
    disabled?: boolean;
  };
};

const TITLE = 'Swagger API';
const DESCRIPTION = 'The Swagger API Documentation';

export const API_KEY_TAG = 'X-API-KEY';
export const DELEGATION_KEY_TAG = 'x-delegation-token';
export const ACTIVE_ROLE_KEY_TAG = 'x-active-role';

/**
 * Setup Swagger in the application
 *
 */
export const configureSwagger = ({
  app,
  configure,
  options,
}: SwaggerConfig) => {
  const builder = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(options.apiVersion)
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      name: 'access-token',
      bearerFormat: 'Bearer',
    });

  if (options?.includeDelegation) {
    builder.addApiKey(
      { type: 'apiKey', name: DELEGATION_KEY_TAG, in: 'header' },
      DELEGATION_KEY_TAG,
    );
  }

  if (options?.includeActiveRole) {
    builder.addSecurity(ACTIVE_ROLE_KEY_TAG, {
      in: 'header',
      type: 'apiKey',
      name: 'x-active-role',
    });
  }

  if (options?.disabled) {
    return;
  }

  configure(builder);

  const openApi = builder.build();
  const document = SwaggerModule.createDocument(app, openApi);

  SwaggerModule.setup(`${options.path}/swagger`, app, document, {
    swaggerOptions: {
      displayRequestDuration: true,
    },
  });
};
