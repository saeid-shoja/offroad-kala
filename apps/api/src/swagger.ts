import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SITE_NAME_FA } from '@offroad/shared';

export const SWAGGER_PATH = 'docs';
export const SWAGGER_BEARER_KEY = 'access-token';

export function setupSwagger(app: INestApplication): void {
  if (process.env.SWAGGER_ENABLED === 'false') {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle(`${SITE_NAME_FA} API`)
    .setDescription('REST API for the Jeepo web storefront and admin panel.')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      SWAGGER_BEARER_KEY,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_PATH, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
