import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SITE_URL } from '@offroad/shared';

const LOCAL_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
] as const;

function productionOriginsFromSiteUrl(): string[] {
  const origins = new Set<string>([SITE_URL]);

  try {
    const url = new URL(SITE_URL);
    const host = url.hostname.replace(/^www\./, '');

    origins.add(`${url.protocol}//${host}`);
    origins.add(`${url.protocol}//www.${host}`);
    origins.add(`${url.protocol}//admin.${host}`);
  } catch {
    /* ignore invalid SITE_URL */
  }

  return [...origins];
}

/** Allowed browser origins for CORS (web, admin, local dev). Override with CORS_ORIGINS. */
export function getCorsOrigins(): string[] {
  const fromEnv = process.env.CORS_ORIGINS?.split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (fromEnv?.length) {
    return [...new Set(fromEnv)];
  }

  return [...new Set([...LOCAL_ORIGINS, ...productionOriginsFromSiteUrl()])];
}

export function createCorsOptions(): CorsOptions {
  const allowed = getCorsOrigins();

  return {
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (allowed.includes(origin)) {
        callback(null, origin);
        return;
      }

      callback(new Error(`Origin "${origin}" is not allowed by CORS`), false);
    },
    credentials: true,
  };
}
