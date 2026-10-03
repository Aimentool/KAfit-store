import type { APIRoute } from 'astro';
import { getSiteConfig, getPublicBaseUrl } from '../../site.config.mjs';

export const prerender = true;

const pageFiles = import.meta.glob('./**/*.{astro,md,mdx,html}');

const HTML_FILE_PATTERN = /\.(astro|md|mdx|html)$/i;
const buildLastmod = new Date().toISOString();

const fileToRoute = (filePath: string) => {
  const normalized = filePath.replace(/^\.\//, '');

  if (!HTML_FILE_PATTERN.test(normalized)) return null;

  const segments = normalized.split('/');
  if (
    segments.some((segment) => segment.startsWith('_') || segment.startsWith('[')) ||
    segments.some((segment) => segment === 'api')
  ) {
    return null;
  }

  let routePath = normalized.replace(HTML_FILE_PATTERN, '');

  if (routePath === '404' || routePath.endsWith('/404')) {
    return null;
  }

  if (routePath === 'index') {
    return '/';
  }

  routePath = routePath.replace(/\/index$/i, '/');
  return routePath.startsWith('/') ? routePath : `/${routePath}`;
};

const routeToUrl = (routePath: string, baseUrl: string) => {
  if (routePath === '/') {
    return baseUrl;
  }

  const normalizedPath = routePath.replace(/^\/+/, '');
  const pathname = normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;
  return new URL(pathname, baseUrl).toString();
};

export const GET: APIRoute = ({ site }) => {
  const siteConfig = getSiteConfig();
  const siteUrl = site?.toString() || siteConfig.site;
  const baseUrl = getPublicBaseUrl(siteUrl, siteConfig.base);

  const routes = [...new Set(Object.keys(pageFiles).map(fileToRoute).filter((route): route is string => Boolean(route)))]
    .sort((left, right) => left.localeCompare(right));

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) =>
      [
        '  <url>',
        `    <loc>${routeToUrl(route, baseUrl)}</loc>`,
        `    <lastmod>${buildLastmod}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        '    <priority>1.0</priority>',
        '  </url>',
      ].join('\n')
    ),
    '</urlset>',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
