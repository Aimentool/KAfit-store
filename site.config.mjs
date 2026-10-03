const DEFAULT_SITE_URL = 'https://kafit-store.hu';
const DEFAULT_BUILD_BASE_PATH = '/';
const DEFAULT_DEV_BASE_PATH = '/';

const DEV_COMMAND_PATTERN = /\bdev\b/i;

export const normalizeBasePath = (value) => {
  if (typeof value !== 'string') return '/';

  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '/';

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
};

export const normalizeSiteUrl = (value) => {
  if (typeof value !== 'string' || !value.trim()) {
    return DEFAULT_SITE_URL;
  }

  try {
    return new URL(value.trim()).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
};

const isDevCommand = (env = process.env) => {
  if (env?.npm_lifecycle_event === 'dev') return true;

  if (Array.isArray(process.argv)) {
    return DEV_COMMAND_PATTERN.test(process.argv.join(' '));
  }

  return false;
};

export const getSiteConfig = (env = process.env) => {
  const site = normalizeSiteUrl(env?.SITE_URL);
  const fallbackBase = isDevCommand(env) ? DEFAULT_DEV_BASE_PATH : DEFAULT_BUILD_BASE_PATH;
  const base = normalizeBasePath(env?.BASE_PATH ?? fallbackBase);

  return { site, base };
};

export const getPublicBaseUrl = (site, base = '/') => {
  const normalizedSite = normalizeSiteUrl(site);
  const normalizedBase = normalizeBasePath(base);

  if (normalizedBase === '/') {
    return new URL('/', `${normalizedSite}/`).toString();
  }

  return new URL(`${normalizedBase.replace(/^\/+/, '')}/`, `${normalizedSite}/`).toString();
};

export const toPublicUrl = (pathname = '/', site, base = '/') => {
  const publicBaseUrl = getPublicBaseUrl(site, base);

  if (!pathname || pathname === '/') {
    return publicBaseUrl;
  }

  const normalizedPath = String(pathname).replace(/^\/+/, '');
  return new URL(normalizedPath, publicBaseUrl).toString();
};

export const toCanonicalUrl = (value, site) => {
  const normalizedSite = normalizeSiteUrl(site);
  const target = value instanceof URL ? new URL(value.toString()) : new URL(String(value), `${normalizedSite}/`);

  target.search = '';
  target.hash = '';

  if (target.pathname.endsWith('/index.html')) {
    target.pathname = target.pathname.slice(0, -'index.html'.length);
  }

  if (!/\.[a-z\d]+$/i.test(target.pathname) && !target.pathname.endsWith('/')) {
    target.pathname = `${target.pathname}/`;
  }

  return target.toString();
};
