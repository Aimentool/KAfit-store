import { z } from 'zod';

const poweredBySchema = z.object({
  enabled: z.boolean().default(true),
  label: z.string().default(''),
  url: z.string().default(''),
  logo: z.string().optional(),
  logoAlt: z.string().default(''),
});

export const footerSchema = z.object({
  theme: z
    .object({
      mode: z.enum(['dark', 'light']).default('dark'),
      background: z.string().optional(),
      text: z.string().optional(),
      accent: z.string().default('var(--color-accent)'),
    })
    .default({}),
  brand: z
    .object({
      name: z.string().default(''),
      description: z.string().default(''),
    })
    .default({}),
  contact: z
    .object({
      address: z.string().default(''),
      email: z.string().default(''),
      phone: z.string().default(''),
    })
    .default({}),
  social: z.record(z.string()).default({}),
  menu: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      })
    )
    .default([]),
  legal: z
    .object({
      privacyPath: z.string().default(''),
      termsPath: z.string().default(''),
      cookiePath: z.string().default(''),
      poweredBy: poweredBySchema.optional(),
    })
    .default({}),
  poweredBy: z.boolean().default(false),
  systemStatus: z.boolean().default(false),
  trustBadge: z.string().optional(),
});

export type FooterContent = z.infer<typeof footerSchema>;
