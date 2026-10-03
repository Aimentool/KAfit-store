import { z } from 'zod';

const tokenValue = z.string().min(1);

const scaleRatioSchema = z.enum(['minor-second', 'major-third', 'perfect-fifth']);
const trackingSchema = z.enum(['tight', 'normal', 'wide']);
const headingTransformSchema = z.enum(['normal', 'uppercase']);
const surfaceShadowSchema = z.enum(['none', 'soft-drop', 'hard-offset', 'neon-glow']);
const surfaceBlurSchema = z.enum(['none', 'sm', 'lg']);
const surfaceBorderWidthSchema = z.enum(['0px', '1px', '2px', '4px']);
const textureSchema = z.enum(['none', 'noise', 'grid', 'mesh']);
const iconStyleSchema = z.enum(['line-light', 'line-bold', 'solid', 'duotone']);
const containerWidthSchema = z.enum(['800px', '1200px', '1440px', '100%']);
const gridGapSchema = z.enum(['1rem', '2rem', '4rem']);

const legacyColorSchema = z
  .object({
    primary: tokenValue,
    secondary: tokenValue,
    accent: tokenValue,
    background: tokenValue,
    text: tokenValue,
    muted: tokenValue,
    surface: tokenValue,
    border: tokenValue,
    success: tokenValue,
    warning: tokenValue,
    error: tokenValue,
    info: tokenValue,
  })
  .passthrough();

const legacyFontSchema = z
  .object({
    heading: tokenValue,
    body: tokenValue,
    ui: tokenValue,
    mono: tokenValue,
  })
  .passthrough();

const legacyBrandSeedSchema = z
  .object({
    color: legacyColorSchema,
    font: legacyFontSchema,
    'type-scale': z
      .object({
        xs: tokenValue,
        sm: tokenValue,
        base: tokenValue,
        lg: tokenValue,
        xl: tokenValue,
        display: tokenValue,
      })
      .passthrough(),
    'line-height': z
      .object({
        tight: tokenValue,
        normal: tokenValue,
        relaxed: tokenValue,
      })
      .passthrough(),
    'font-weight': z
      .object({
        regular: tokenValue,
        medium: tokenValue,
        semibold: tokenValue,
        bold: tokenValue,
      })
      .passthrough(),
    radius: z
      .object({
        sm: tokenValue,
        md: tokenValue,
        lg: tokenValue,
        xl: tokenValue,
        full: tokenValue,
      })
      .passthrough(),
    spacing: z
      .object({
        xs: tokenValue,
        sm: tokenValue,
        md: tokenValue,
        lg: tokenValue,
        xl: tokenValue,
        'section-y': tokenValue,
        'container-x': tokenValue,
        'grid-gap': tokenValue,
      })
      .passthrough(),
    shadow: z
      .object({
        sm: tokenValue,
        md: tokenValue,
        lg: tokenValue,
      })
      .passthrough(),
    layout: z
      .object({
        'container-max': tokenValue,
        'content-max': tokenValue,
        'narrow-max': tokenValue,
        'section-gap': tokenValue,
        'navbar-height': tokenValue,
      })
      .passthrough(),
    border: z
      .object({
        width: tokenValue,
        'width-strong': tokenValue,
        'focus-ring-width': tokenValue,
      })
      .passthrough(),
    motion: z
      .object({
        'duration-fast': tokenValue,
        duration: tokenValue,
        'duration-slow': tokenValue,
        easing: tokenValue,
      })
      .passthrough(),
    component: z
      .object({
        button: z
          .object({
            radius: tokenValue,
            'padding-y': tokenValue,
            'padding-x': tokenValue,
            'font-size': tokenValue,
            shadow: tokenValue,
            'primary-bg': tokenValue,
            'primary-text': tokenValue,
            'secondary-bg': tokenValue,
            'secondary-text': tokenValue,
            'outline-bg': tokenValue,
            'outline-text': tokenValue,
            'outline-border': tokenValue,
          })
          .passthrough(),
        input: z
          .object({
            radius: tokenValue,
            'padding-y': tokenValue,
            'padding-x': tokenValue,
            background: tokenValue,
            'background-focus': tokenValue,
            border: tokenValue,
            'border-focus': tokenValue,
            placeholder: tokenValue,
            text: tokenValue,
            'error-background': tokenValue,
            'error-border': tokenValue,
          })
          .passthrough(),
        card: z
          .object({
            radius: tokenValue,
            padding: tokenValue,
            background: tokenValue,
            border: tokenValue,
            shadow: tokenValue,
          })
          .passthrough(),
        badge: z
          .object({
            radius: tokenValue,
            'padding-y': tokenValue,
            'padding-x': tokenValue,
            background: tokenValue,
            border: tokenValue,
            text: tokenValue,
          })
          .passthrough(),
        navbar: z
          .object({
            background: tokenValue,
            'menu-surface': tokenValue,
            border: tokenValue,
            'link-text': tokenValue,
            'link-hover': tokenValue,
            'cta-bg': tokenValue,
            'cta-text': tokenValue,
          })
          .passthrough(),
        footer: z
          .object({
            background: tokenValue,
            text: tokenValue,
            accent: tokenValue,
            border: tokenValue,
            'icon-surface': tokenValue,
          })
          .passthrough(),
        social: z
          .object({
            'whatsapp-bg': tokenValue,
            'facebook-bg': tokenValue,
            'email-bg': tokenValue,
            text: tokenValue,
            'hover-shadow': tokenValue,
          })
          .passthrough(),
        hero: z
          .object({
            'overlay-dark': tokenValue,
            'overlay-light': tokenValue,
            'overlay-gradient-strong': tokenValue,
            'countdown-background': tokenValue,
            'countdown-border': tokenValue,
          })
          .passthrough(),
      })
      .passthrough(),
  })
  .passthrough();

const extendedDesignTokenSeedSchema = z
  .object({
    color: z
      .object({
        primary: tokenValue,
        secondary: tokenValue,
        accent: tokenValue,
        background: tokenValue,
        text: tokenValue,
        muted: tokenValue,
        surface: tokenValue,
        border: tokenValue,
      })
      .passthrough(),
    font: z
      .object({
        heading: tokenValue,
        body: tokenValue,
        scaleRatio: scaleRatioSchema,
        tracking: trackingSchema,
        headingTransform: headingTransformSchema,
      })
      .passthrough(),
    surface: z
      .object({
        shadow: surfaceShadowSchema,
        blur: surfaceBlurSchema,
        borderWidth: surfaceBorderWidthSchema,
      })
      .passthrough(),
    radius: z
      .object({
        sm: tokenValue,
        md: tokenValue,
        lg: tokenValue,
        full: tokenValue,
      })
      .passthrough(),
    spacing: z
      .object({
        'section-y': tokenValue,
        'container-x': tokenValue,
        containerMaxWidth: containerWidthSchema,
        gridGap: gridGapSchema,
      })
      .passthrough(),
    motion: z
      .object({
        duration: tokenValue,
        easing: tokenValue,
      })
      .passthrough(),
    assets: z
      .object({
        texture: textureSchema,
        iconStyle: iconStyleSchema,
      })
      .passthrough(),
  })
  .passthrough();

export const brandSeedSchema = z.union([legacyBrandSeedSchema, extendedDesignTokenSeedSchema]);

export type LegacyBrandSeed = z.infer<typeof legacyBrandSeedSchema>;
export type ExtendedDesignTokenSeed = z.infer<typeof extendedDesignTokenSeedSchema>;
export type BrandSeed = z.infer<typeof brandSeedSchema>;

export interface TokenTree {
  [key: string]: string | TokenTree;
}

const TRACKING_VALUE_MAP: Record<ExtendedDesignTokenSeed['font']['tracking'], string> = {
  tight: '-0.04em',
  normal: '0em',
  wide: '0.06em',
};

const HEADING_TRANSFORM_VALUE_MAP: Record<ExtendedDesignTokenSeed['font']['headingTransform'], string> = {
  normal: 'none',
  uppercase: 'uppercase',
};

const BLUR_VALUE_MAP: Record<ExtendedDesignTokenSeed['surface']['blur'], string> = {
  none: '0px',
  sm: '8px',
  lg: '20px',
};

const SCALE_PRESET_MAP: Record<
  ExtendedDesignTokenSeed['font']['scaleRatio'],
  {
    ratio: string;
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    display: string;
  }
> = {
  'minor-second': {
    ratio: '1.067',
    xs: '0.79rem',
    sm: '0.89rem',
    base: '1rem',
    lg: '1.067rem',
    xl: '1.138rem',
    display: 'clamp(2.2rem, 5vw, 3.4rem)',
  },
  'major-third': {
    ratio: '1.25',
    xs: '0.8rem',
    sm: '0.9rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.563rem',
    display: 'clamp(2.8rem, 6vw, 4.75rem)',
  },
  'perfect-fifth': {
    ratio: '1.5',
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.5rem',
    xl: '2.25rem',
    display: 'clamp(3rem, 7vw, 5.5rem)',
  },
};

const CONTAINER_PRESET_MAP: Record<
  ExtendedDesignTokenSeed['spacing']['containerMaxWidth'],
  { contentMax: string; narrowMax: string }
> = {
  '800px': { contentMax: '720px', narrowMax: '680px' },
  '1200px': { contentMax: '72rem', narrowMax: '37.5rem' },
  '1440px': { contentMax: '80rem', narrowMax: '42rem' },
  '100%': { contentMax: '100%', narrowMax: '42rem' },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeTokenTrees(base: TokenTree, patch: TokenTree): TokenTree {
  const output: TokenTree = { ...base };

  for (const [key, value] of Object.entries(patch)) {
    const current = output[key];
    if (isRecord(current) && isRecord(value)) {
      output[key] = mergeTokenTrees(current as TokenTree, value as TokenTree);
      continue;
    }

    output[key] = value as string | TokenTree;
  }

  return output;
}

function parseDurationToMs(value: string): number | null {
  const trimmed = value.trim();
  const msMatch = trimmed.match(/^(\d*\.?\d+)ms$/i);
  if (msMatch) return Math.round(Number(msMatch[1]));

  const secondsMatch = trimmed.match(/^(\d*\.?\d+)s$/i);
  if (secondsMatch) return Math.round(Number(secondsMatch[1]) * 1000);

  return null;
}

function scaleDuration(value: string, multiplier: number, fallback: string): string {
  const parsed = parseDurationToMs(value);
  if (parsed === null) return fallback;
  return `${Math.max(80, Math.round(parsed * multiplier))}ms`;
}

function toSurfaceShadowTokens(
  preset: ExtendedDesignTokenSeed['surface']['shadow']
): {
  sm: string;
  md: string;
  lg: string;
  button: string;
  card: string;
  social: string;
} {
  switch (preset) {
    case 'none':
      return {
        sm: 'none',
        md: 'none',
        lg: 'none',
        button: 'none',
        card: 'none',
        social: 'none',
      };
    case 'hard-offset':
      return {
        sm: '4px 4px 0 0 var(--color-border)',
        md: '8px 8px 0 0 var(--color-border)',
        lg: '12px 12px 0 0 var(--color-border)',
        button: '6px 6px 0 0 var(--color-border)',
        card: 'var(--shadow-md)',
        social: '4px 4px 0 0 var(--color-border)',
      };
    case 'neon-glow':
      return {
        sm: '0 0 0 1px color-mix(in srgb, var(--color-accent) 24%, transparent), 0 0 16px color-mix(in srgb, var(--color-accent) 18%, transparent)',
        md: '0 0 0 1px color-mix(in srgb, var(--color-accent) 32%, transparent), 0 0 28px color-mix(in srgb, var(--color-accent) 26%, transparent)',
        lg: '0 0 0 1px color-mix(in srgb, var(--color-accent) 40%, transparent), 0 0 44px color-mix(in srgb, var(--color-accent) 32%, transparent)',
        button: '0 0 0 1px color-mix(in srgb, var(--color-accent) 28%, transparent), 0 0 24px color-mix(in srgb, var(--color-accent) 24%, transparent)',
        card: 'var(--shadow-md)',
        social: '0 0 0 1px color-mix(in srgb, var(--color-accent) 22%, transparent), 0 0 20px color-mix(in srgb, var(--color-accent) 20%, transparent)',
      };
    case 'soft-drop':
    default:
      return {
        sm: '0 1px 3px color-mix(in srgb, var(--color-background) 18%, transparent)',
        md: '0 10px 30px color-mix(in srgb, var(--color-background) 22%, transparent)',
        lg: '0 24px 80px color-mix(in srgb, var(--color-background) 30%, transparent)',
        button: '0 10px 24px color-mix(in srgb, var(--color-background) 22%, transparent)',
        card: 'var(--shadow-md)',
        social: '0 6px 20px color-mix(in srgb, var(--color-background) 24%, transparent)',
      };
  }
}

function deriveStrongBorderWidth(width: ExtendedDesignTokenSeed['surface']['borderWidth']): string {
  switch (width) {
    case '0px':
      return '1px';
    case '1px':
      return '2px';
    case '2px':
      return '4px';
    case '4px':
      return '6px';
    default:
      return width;
  }
}

export function isExtendedDesignTokenSeed(seed: BrandSeed): seed is ExtendedDesignTokenSeed {
  return (
    isRecord(seed) &&
    isRecord(seed.font) &&
    isRecord(seed.surface) &&
    isRecord(seed.assets) &&
    typeof seed.font.scaleRatio === 'string' &&
    typeof seed.font.tracking === 'string' &&
    typeof seed.font.headingTransform === 'string'
  );
}

function compileExtendedDesignTokenSeed(seed: ExtendedDesignTokenSeed): TokenTree {
  const typeScale = SCALE_PRESET_MAP[seed.font.scaleRatio];
  const containerPreset = CONTAINER_PRESET_MAP[seed.spacing.containerMaxWidth];
  const shadowTokens = toSurfaceShadowTokens(seed.surface.shadow);
  const blurValue = BLUR_VALUE_MAP[seed.surface.blur];

  const runtimeTokens: TokenTree = {
    color: {
      ...seed.color,
      success: '#16A34A',
      warning: '#F59E0B',
      error: '#DC2626',
      info: '#38BDF8',
    },
    font: {
      heading: seed.font.heading,
      body: seed.font.body,
      ui: seed.font.body,
      mono: 'IBM Plex Mono',
      'tracking-value': TRACKING_VALUE_MAP[seed.font.tracking],
      'heading-transform-value': HEADING_TRANSFORM_VALUE_MAP[seed.font.headingTransform],
      'scale-ratio-value': typeScale.ratio,
    },
    surface: {
      'blur-value': blurValue,
      'shadow-value': shadowTokens.md,
      'border-width-value': seed.surface.borderWidth,
    },
    radius: {
      ...seed.radius,
      xl: seed.radius.lg,
    },
    spacing: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      'section-y': seed.spacing['section-y'],
      'container-x': seed.spacing['container-x'],
      'grid-gap': seed.spacing.gridGap,
    },
    'type-scale': typeScale,
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
    shadow: {
      sm: shadowTokens.sm,
      md: shadowTokens.md,
      lg: shadowTokens.lg,
    },
    layout: {
      'container-max': seed.spacing.containerMaxWidth,
      'content-max': containerPreset.contentMax,
      'narrow-max': containerPreset.narrowMax,
      'section-gap': seed.spacing['section-y'],
      'navbar-height': '5rem',
    },
    border: {
      width: seed.surface.borderWidth,
      'width-strong': deriveStrongBorderWidth(seed.surface.borderWidth),
      'focus-ring-width': '3px',
    },
    motion: {
      'duration-fast': scaleDuration(seed.motion.duration, 0.6, '180ms'),
      duration: seed.motion.duration,
      'duration-slow': scaleDuration(seed.motion.duration, 1.7, '520ms'),
      easing: seed.motion.easing,
    },
    component: {
      button: {
        radius: 'var(--radius-full)',
        'padding-y': '0.8em',
        'padding-x': '1.5em',
        'font-size': 'var(--type-scale-base)',
        shadow: shadowTokens.button,
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
        background:
          seed.surface.blur === 'none'
            ? 'color-mix(in srgb, var(--color-surface) 78%, var(--color-background) 22%)'
            : 'color-mix(in srgb, var(--color-surface) 82%, transparent)',
        border: 'var(--color-border)',
        shadow: shadowTokens.card,
      },
      badge: {
        radius: 'var(--radius-full)',
        'padding-y': '0.45rem',
        'padding-x': '0.95rem',
        background:
          seed.surface.blur === 'none'
            ? 'color-mix(in srgb, var(--color-surface) 88%, transparent)'
            : 'color-mix(in srgb, var(--color-surface) 76%, transparent)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
      },
      navbar: {
        background: 'var(--color-background)',
        'menu-surface':
          seed.surface.blur === 'none'
            ? 'color-mix(in srgb, var(--color-surface) 88%, transparent)'
            : 'color-mix(in srgb, var(--color-surface) 74%, transparent)',
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
        'icon-surface':
          seed.surface.blur === 'none'
            ? 'color-mix(in srgb, var(--color-surface) 70%, transparent)'
            : 'color-mix(in srgb, var(--color-surface) 76%, transparent)',
      },
      social: {
        'whatsapp-bg': '#25D366',
        'facebook-bg': '#1877F2',
        'email-bg': 'var(--color-primary)',
        text: '#FFFFFF',
        'hover-shadow': shadowTokens.social,
      },
      hero: {
        'overlay-dark': 'color-mix(in srgb, var(--color-background) 56%, transparent)',
        'overlay-light': 'color-mix(in srgb, var(--color-text) 38%, transparent)',
        'overlay-gradient-strong': 'color-mix(in srgb, var(--color-background) 78%, transparent)',
        'countdown-background':
          seed.surface.blur === 'none'
            ? 'color-mix(in srgb, var(--color-surface) 88%, transparent)'
            : 'color-mix(in srgb, var(--color-surface) 76%, transparent)',
        'countdown-border': 'var(--color-border)',
      },
    },
  };

  return mergeTokenTrees(runtimeTokens, seed as TokenTree);
}

export function compileBrandSeed(seed: BrandSeed): TokenTree {
  if (!isExtendedDesignTokenSeed(seed)) {
    return seed as TokenTree;
  }

  return compileExtendedDesignTokenSeed(seed);
}
