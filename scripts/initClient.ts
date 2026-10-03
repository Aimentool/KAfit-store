#!/usr/bin/env tsx

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { BrandSeed } from '../src/engine/theme/tokens/schema';

type JsonObject = Record<string, unknown>;

interface ClientConfig {
  clientId?: string;
  lang?: string[];
  brand?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    text?: string;
    muted?: string;
    surface?: string;
    border?: string;
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
    font?: string;
    uiFont?: string;
    monoFont?: string;
  };
  navbar?: {
    brand?: string;
    logoFile?: string;
  };
  hero?: {
    headline?: string;
    sub?: string;
    cta?: string;
    cta_link?: string;
    badge?: string;
    overlay?: 'dark' | 'light' | 'gradient-bottom' | 'gradient-top' | 'none';
    transition?: 'none' | 'fade' | 'wave' | 'diagonal' | 'curve';
    slots?: JsonObject;
    responsive?: JsonObject;
    media?: {
      video_settings?: JsonObject;
    };
  };
  footer?: {
    brand?: string;
    tagline?: string;
    email?: string;
    phone?: string;
    address?: string;
    privacy?: string;
    terms?: string;
    cookie?: string;
    social?: Record<string, string>;
  };
}

function readString(value: unknown, fallback: string, warnings: string[], label: string): string {
  if (typeof value !== 'string') {
    warnings.push(`[init:client] WARN: ${label} nem string, fallback: "${fallback}"`);
    return fallback;
  }

  const normalized = value.trim();
  if (normalized === '') {
    warnings.push(`[init:client] WARN: ${label} ures string, fallback: "${fallback}"`);
    return fallback;
  }

  return normalized;
}

function sanitizeClientId(rawId: unknown, warnings: string[]): string {
  const fallback = 'my-client';
  const base = readString(rawId, fallback, warnings, 'clientId').toLowerCase();
  const normalized = base.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (!normalized) {
    warnings.push(`[init:client] WARN: clientId ervenytelen, fallback: "${fallback}"`);
    return fallback;
  }
  return normalized;
}

function ensureDir(targetPath: string): void {
  fs.mkdirSync(targetPath, { recursive: true });
}

function writeJson(targetPath: string, value: unknown): void {
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
}

function readJsonFile<T>(targetPath: string): T {
  const raw = fs.readFileSync(targetPath, 'utf-8').replace(/^\uFEFF/, '');
  return JSON.parse(raw) as T;
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, patch: unknown): T {
  if (!isObject(base) || !isObject(patch)) {
    return (patch as T) ?? base;
  }

  const output: JsonObject = { ...(base as JsonObject) };
  for (const [key, patchValue] of Object.entries(patch)) {
    const baseValue = output[key];
    if (isObject(baseValue) && isObject(patchValue)) {
      output[key] = deepMerge(baseValue, patchValue);
    } else {
      output[key] = patchValue;
    }
  }
  return output as T;
}

function findFirstMatchingFile(
  fileNames: string[],
  baseNames: string[],
  extensions: string[]
): string | null {
  for (const baseName of baseNames) {
    for (const ext of extensions) {
      const candidate = `${baseName}${ext}`;
      const hit = fileNames.find((fileName) => fileName.toLowerCase() === candidate.toLowerCase());
      if (hit) return hit;
    }
  }
  return null;
}

function detectHeroAssets(clientId: string): {
  mediaLayer: JsonObject;
  socialProofLayer: JsonObject;
  summary: string;
} {
  const publicAssetsPath = path.resolve(`public/assets/clients/${clientId}`);
  const legacyAssetsPath = path.resolve(`src/assets/clients/${clientId}`);
  ensureDir(publicAssetsPath);

  if (fs.existsSync(legacyAssetsPath)) {
    const legacyFiles = fs.readdirSync(legacyAssetsPath);
    const publicFiles = fs.readdirSync(publicAssetsPath);
    if (publicFiles.length === 0 && legacyFiles.length > 0) {
      for (const fileName of legacyFiles) {
        fs.copyFileSync(path.join(legacyAssetsPath, fileName), path.join(publicAssetsPath, fileName));
      }
    }
  }

  const files = fs.readdirSync(publicAssetsPath);
  const imageExts = ['.jpg', '.jpeg', '.png', '.webp'];
  const desktopImage = findFirstMatchingFile(files, ['hero'], imageExts);
  const mobileImage = findFirstMatchingFile(files, ['heromobile'], imageExts);
  const mobileVideo = files.find((fileName) => fileName.toLowerCase() === 'heromobile.mp4') ?? null;
  const posterImage = findFirstMatchingFile(files, ['hero-poster'], imageExts);
  const videoFile = files.find((fileName) => fileName.toLowerCase() === 'hero.mp4') ?? null;

  const partnerLogos = files
    .filter((fileName) => /^partner-\d+\.(png|jpg|jpeg|webp)$/i.test(fileName))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => `/assets/clients/${clientId}/${fileName}`);

  const mediaLayer: JsonObject = {
    media: {
      type: videoFile ? 'video' : desktopImage ? 'image' : 'image',
      source_desktop: videoFile
        ? `/assets/clients/${clientId}/${videoFile}`
        : desktopImage
          ? `/assets/clients/${clientId}/${desktopImage}`
          : '/assets/hero.jpg',
      source_mobile: mobileVideo
        ? `/assets/clients/${clientId}/${mobileVideo}`
        : mobileImage
          ? `/assets/clients/${clientId}/${mobileImage}`
          : '',
      poster_image: videoFile && posterImage ? `/assets/clients/${clientId}/${posterImage}` : '',
      partner_logos: partnerLogos,
    },
  };

  const socialProofLayer: JsonObject =
    partnerLogos.length > 0
      ? {
          slots: {
            socialProof: {
              type: 'logos',
              text: '',
            },
          },
        }
      : {};

  const summary = `type=${(mediaLayer.media as JsonObject).type}, desktop=${String((mediaLayer.media as JsonObject).source_desktop)}, mobile=${String((mediaLayer.media as JsonObject).source_mobile || 'n/a')}, logos=${partnerLogos.length}`;
  return { mediaLayer, socialProofLayer, summary };
}

const configPath = path.resolve('client.config.ts');
if (!fs.existsSync(configPath)) {
  console.error('[init:client] x client.config.ts nem talalhato a projekt gyokereben.');
  process.exit(1);
}

const configModule = await import(pathToFileURL(configPath).href);
const config = (configModule.default ?? {}) as ClientConfig;
const warnings: string[] = [];

console.log('\n[init:client] > Feldolgozas kezdese...\n');

const clientId = sanitizeClientId(config.clientId, warnings);
const lang = readString(config.lang?.[0], 'hu', warnings, 'lang[0]');
const fontFamily = readString(config.brand?.font, 'sans-serif', warnings, 'brand.font');
const uiFontFamily = readString(config.brand?.uiFont, fontFamily, warnings, 'brand.uiFont');
const monoFontFamily = readString(config.brand?.monoFont, 'IBM Plex Mono', warnings, 'brand.monoFont');

const seed: BrandSeed = {
  color: {
    primary: readString(config.brand?.primary, '#5EEAD4', warnings, 'brand.primary'),
    secondary: readString(config.brand?.secondary, '#0F766E', warnings, 'brand.secondary'),
    accent: readString(config.brand?.accent, '#2DD4BF', warnings, 'brand.accent'),
    background: readString(config.brand?.background, '#050B10', warnings, 'brand.background'),
    text: readString(config.brand?.text, '#FFFFFF', warnings, 'brand.text'),
    muted: readString(config.brand?.muted, '#81A1A6', warnings, 'brand.muted'),
    surface: readString(config.brand?.surface, '#0d1a22', warnings, 'brand.surface'),
    border: readString(config.brand?.border, 'rgba(255,255,255,0.1)', warnings, 'brand.border'),
    success: readString(config.brand?.success, '#16A34A', warnings, 'brand.success'),
    warning: readString(config.brand?.warning, '#F59E0B', warnings, 'brand.warning'),
    error: readString(config.brand?.error, '#DC2626', warnings, 'brand.error'),
    info: readString(config.brand?.info, '#38BDF8', warnings, 'brand.info'),
  },
  font: {
    heading: fontFamily,
    body: fontFamily,
    ui: uiFontFamily,
    mono: monoFontFamily,
  },
  'type-scale': {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.375rem',
    display: 'clamp(2.6rem, 6vw, 4.75rem)',
  },
  'line-height': {
    tight: '1.1',
    normal: '1.6',
    relaxed: '1.75',
  },
  'font-weight': {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    'section-y': '5rem',
    'container-x': '1.5rem',
    'grid-gap': '1.5rem',
  },
  shadow: {
    sm: '0 1px 3px color-mix(in srgb, var(--color-background) 22%, transparent)',
    md: '0 10px 30px color-mix(in srgb, var(--color-background) 22%, transparent)',
    lg: '0 24px 80px color-mix(in srgb, var(--color-background) 58%, transparent)',
  },
  layout: {
    'container-max': '80rem',
    'content-max': '72rem',
    'narrow-max': '37.5rem',
    'section-gap': 'clamp(3rem, 8vw, 5rem)',
    'navbar-height': '5rem',
  },
  border: {
    width: '1px',
    'width-strong': '1.5px',
    'focus-ring-width': '3px',
  },
  motion: {
    'duration-fast': '180ms',
    duration: '300ms',
    'duration-slow': '520ms',
    easing: 'cubic-bezier(0.4,0,0.2,1)',
  },
  component: {
    button: {
      radius: 'var(--radius-full)',
      'padding-y': '0.8em',
      'padding-x': '1.5em',
      'font-size': 'var(--type-scale-base)',
      shadow: '0 10px 24px color-mix(in srgb, var(--color-background) 22%, transparent)',
      'primary-bg': 'var(--color-primary)',
      'primary-text': 'var(--color-background)',
      'secondary-bg': 'var(--color-secondary)',
      'secondary-text': 'var(--color-text)',
      'outline-bg': 'color-mix(in srgb, var(--color-surface) 70%, transparent)',
      'outline-text': 'var(--color-text)',
      'outline-border': 'var(--color-border)',
    },
    input: {
      radius: 'var(--radius-md)',
      'padding-y': '0.875rem',
      'padding-x': '0.95rem',
      background: 'var(--color-surface)',
      'background-focus': 'var(--color-background)',
      border: 'var(--color-border)',
      'border-focus': 'var(--color-primary)',
      placeholder: 'color-mix(in srgb, var(--color-muted) 78%, white 22%)',
      text: 'var(--color-text)',
      'error-background': 'color-mix(in srgb, var(--color-error) 12%, var(--color-background) 88%)',
      'error-border': 'var(--color-error)',
    },
    card: {
      radius: 'var(--radius-xl)',
      padding: '1.5rem',
      background: 'color-mix(in srgb, var(--color-surface) 78%, var(--color-background) 22%)',
      border: 'var(--color-border)',
      shadow: 'var(--shadow-md)',
    },
    badge: {
      radius: 'var(--radius-full)',
      'padding-y': '0.45rem',
      'padding-x': '0.95rem',
      background: 'color-mix(in srgb, var(--color-surface) 88%, transparent)',
      border: 'var(--color-border)',
      text: 'var(--color-text)',
    },
    navbar: {
      background: 'var(--color-background)',
      'menu-surface': 'color-mix(in srgb, var(--color-surface) 88%, transparent)',
      border: 'var(--color-border)',
      'link-text': 'var(--color-text)',
      'link-hover': 'var(--color-accent)',
      'cta-bg': 'var(--color-primary)',
      'cta-text': 'var(--color-background)',
    },
    footer: {
      background: 'var(--color-background)',
      text: 'var(--color-text)',
      accent: 'var(--color-accent)',
      border: 'var(--color-border)',
      'icon-surface': 'color-mix(in srgb, var(--color-surface) 70%, transparent)',
    },
    social: {
      'whatsapp-bg': '#25D366',
      'facebook-bg': '#1877F2',
      'email-bg': 'var(--color-primary)',
      text: '#FFFFFF',
      'hover-shadow': '0 6px 20px color-mix(in srgb, var(--color-background) 24%, transparent)',
    },
    hero: {
      'overlay-dark': 'color-mix(in srgb, var(--color-background) 56%, transparent)',
      'overlay-light': 'color-mix(in srgb, var(--color-text) 38%, transparent)',
      'overlay-gradient-strong': 'color-mix(in srgb, var(--color-background) 78%, transparent)',
      'countdown-background': 'color-mix(in srgb, var(--color-surface) 88%, transparent)',
      'countdown-border': 'var(--color-border)',
    },
  },
};

writeJson(path.resolve('src/engine/theme/tokens/brand.seed.json'), seed);
console.log('[init:client] OK brand.seed.json generalva');

const localePath = path.resolve(`src/locales/${lang}`);
ensureDir(localePath);

const navContent = {
  settings: {
    background: {
      use_global_theme: true,
      custom_color: 'var(--color-background)',
      transparency: { enable: true, opacity_percent: 80, blur_effect: 'backdrop-blur-md' },
    },
    behavior: { sticky: true, hide_on_scroll_down: true, show_on_scroll_up: true },
    layout: { width: '90%', padding_y: '15px', padding_x: '0px', content_alignment: 'justify-between' },
  },
  logo: {
    image_source: `/assets/clients/${clientId}/${readString(config.navbar?.logoFile, 'logo.svg', warnings, 'navbar.logoFile')}`,
    height_class: 'h-10',
    brand_text: {
      show: Boolean(config.navbar?.brand),
      mode: 'text',
      text: config.navbar?.brand ?? '',
      color_override: 'var(--color-text)',
    },
  },
  menu_items: [],
};
writeJson(path.join(localePath, 'navigation.json'), navContent);
console.log('[init:client] OK navigation.json generalva');

const heroDefaults = readJsonFile<JsonObject>(path.resolve('src/modules/hero/defaults.json'));
const { mediaLayer, socialProofLayer, summary } = detectHeroAssets(clientId);

let heroContent = deepMerge(heroDefaults, mediaLayer);
heroContent = deepMerge(heroContent, socialProofLayer);

const heroOverrides: JsonObject = {};
if (config.hero?.headline !== undefined) {
  heroOverrides.slots = deepMerge(heroOverrides.slots ?? {}, { title: { text: config.hero.headline } });
}
if (config.hero?.sub !== undefined) {
  heroOverrides.slots = deepMerge(heroOverrides.slots ?? {}, { subtitle: { text: config.hero.sub } });
}
if (config.hero?.cta !== undefined) {
  heroOverrides.slots = deepMerge(heroOverrides.slots ?? {}, { cta1: { text: config.hero.cta } });
}
if (config.hero?.cta_link !== undefined) {
  heroOverrides.slots = deepMerge(heroOverrides.slots ?? {}, { cta1: { link: config.hero.cta_link } });
}
if (config.hero?.badge !== undefined) {
  heroOverrides.slots = deepMerge(heroOverrides.slots ?? {}, { badge: { text: config.hero.badge } });
}
if (config.hero?.overlay) {
  heroOverrides.settings = deepMerge(heroOverrides.settings ?? {}, { overlay: config.hero.overlay });
}
if (config.hero?.transition) {
  heroOverrides.settings = deepMerge(heroOverrides.settings ?? {}, { transition: config.hero.transition });
}
if (config.hero?.media?.video_settings) {
  heroOverrides.media = deepMerge(heroOverrides.media ?? {}, {
    video_settings: config.hero.media.video_settings,
  });
}
if (isObject(config.hero?.slots)) {
  heroOverrides.slots = deepMerge(heroOverrides.slots ?? {}, config.hero?.slots);
}
if (isObject(config.hero?.responsive)) {
  heroOverrides.responsive = deepMerge(heroOverrides.responsive ?? {}, config.hero?.responsive);
}

heroContent = deepMerge(heroContent, heroOverrides);

writeJson(path.join(localePath, 'hero.json'), heroContent);
console.log(`[init:client] OK hero.json generalva (${summary})`);

const footerContent = {
  theme: {
    mode: 'dark',
    background: 'var(--color-background)',
    text: 'var(--color-text)',
    accent: 'var(--color-accent)',
  },
  brand: {
    name: config.navbar?.brand ?? config.footer?.brand ?? '',
    description: config.footer?.tagline ?? '',
  },
  contact: {
    address: config.footer?.address ?? '',
    email: config.footer?.email ?? '',
    phone: config.footer?.phone ?? '',
  },
  social: config.footer?.social ?? {},
  menu: [],
  legal: {
    privacyPath: config.footer?.privacy ?? '',
    termsPath: config.footer?.terms ?? '',
    cookiePath: config.footer?.cookie ?? '',
    poweredBy: { enabled: true, label: 'Weboldal: Aimentool', url: 'https://aimentool.com' },
  },
  poweredBy: true,
  systemStatus: false,
};
writeJson(path.join(localePath, 'footer.json'), footerContent);
console.log('[init:client] OK footer.json generalva');

const assetsPath = path.resolve(`public/assets/clients/${clientId}`);
ensureDir(assetsPath);
console.log(`[init:client] OK Assets mappa letrehozva: ${assetsPath}`);
console.log('[init:client]    -> Masold ide: logo.svg, hero.jpg vagy hero.mp4, opcionalisan heromobile.jpg vagy heromobile.mp4, hero-poster.jpg, partner-1.png');

if (warnings.length > 0) {
  console.log('\n[init:client] Figyelmeztetesek:');
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

console.log('\n[init:client] > tokens:build futtatas...');
try {
  execSync('npm run tokens:build', { stdio: 'inherit' });
} catch {
  console.error('[init:client] x tokens:build sikertelen');
  process.exitCode = 1;
}

console.log('\n[init:client] Kesz! Kovetkezo lepesek:');
console.log(`  1. Masold be az assets fajlokat: public/assets/clients/${clientId}/`);
console.log(`  2. Ellenorizd a generalt locale JSON-okat: src/locales/${lang}/`);
console.log('  3. npm run dev - elo preview');
console.log('  4. npm run build - vegleges build');
