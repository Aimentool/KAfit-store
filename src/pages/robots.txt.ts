import type { APIRoute } from 'astro';
import { getSiteConfig, getPublicBaseUrl } from '../../site.config.mjs';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const siteConfig = getSiteConfig();
  const siteUrl = site?.toString() || siteConfig.site;
  const sitemapUrl = new URL('sitemap.xml', getPublicBaseUrl(siteUrl, siteConfig.base)).toString();
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl}`].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
