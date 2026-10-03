const rawBaseUrl = import.meta.env.BASE_URL || '/';

export const basePath = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;

const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

export const withBase = (url?: string | null): string => {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('#') || url.startsWith('//') || ABSOLUTE_URL_PATTERN.test(url)) return url;
  if (url === '/') return basePath;
  if (url.startsWith(basePath)) return url;

  const trimmed = url.replace(/^\/+/, '');
  return basePath === '/' ? `/${trimmed}` : `${basePath}${trimmed}`;
};
