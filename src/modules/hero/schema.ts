import { z } from 'zod';

const textSlotFields = {
  text: z.string(),
  lines: z.number().int().min(1).max(5),
  size: z.number().min(10).max(300),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
};

const ctaSlotFields = {
  text: z.string(),
  link: z.string(),
  style: z.enum(['primary', 'secondary', 'outline']),
  size: z.number().min(10).max(300),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
};

const countdownSlotFields = {
  target_date: z.string(),
  label: z.string(),
  size: z.number().min(10).max(300),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
};

const socialProofSlotFields = {
  type: z.enum(['text', 'logos']),
  text: z.string(),
  size: z.number().min(10).max(300),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
};

const textSlotSchema = z.object({
  text: z.string().default(''),
  lines: z.number().int().min(1).max(5).default(1),
  size: z.number().min(10).max(300).default(100),
  x: z.number().min(0).max(100).default(50),
  y: z.number().min(0).max(100).default(50),
});

const ctaSlotSchema = z.object({
  text: z.string().default(''),
  link: z.string().default('#'),
  style: z.enum(['primary', 'secondary', 'outline']).default('primary'),
  size: z.number().min(10).max(300).default(100),
  x: z.number().min(0).max(100).default(50),
  y: z.number().min(0).max(100).default(70),
});

const countdownSlotSchema = z.object({
  target_date: z.string().default(''),
  label: z.string().default(''),
  size: z.number().min(10).max(300).default(100),
  x: z.number().min(0).max(100).default(50),
  y: z.number().min(0).max(100).default(80),
});

const socialProofSlotSchema = z.object({
  type: z.enum(['text', 'logos']).default('text'),
  text: z.string().default(''),
  size: z.number().min(10).max(300).default(100),
  x: z.number().min(0).max(100).default(50),
  y: z.number().min(0).max(100).default(90),
});

const textSlotOverrideSchema = z.object(textSlotFields).partial().default({});
const ctaSlotOverrideSchema = z.object(ctaSlotFields).partial().default({});
const countdownSlotOverrideSchema = z.object(countdownSlotFields).partial().default({});
const socialProofSlotOverrideSchema = z.object(socialProofSlotFields).partial().default({});

export const heroSchema = z.object({
  settings: z
    .object({
      enabled: z.boolean().default(true),
      height: z
        .object({
          desktop: z.string().default('100vh'),
          mobile: z.string().default('100vh'),
        })
        .default({}),
      overlay: z
        .enum(['dark', 'light', 'gradient-bottom', 'gradient-top', 'none'])
        .default('dark'),
      transition: z.enum(['none', 'fade', 'wave', 'diagonal', 'curve']).default('none'),
    })
    .default({}),
  media: z
    .object({
      type: z.enum(['video', 'image']).default('image'),
      source_desktop: z.string().default(''),
      source_mobile: z.string().default(''),
      poster_image: z.string().default(''),
      partner_logos: z.array(z.string()).default([]),
      video_settings: z
        .object({
          loop: z.boolean().default(true),
          autoplay: z.boolean().default(true),
          muted: z.boolean().default(true),
          playback_speed: z.number().default(1),
          object_fit: z.enum(['cover', 'contain']).default('cover'),
        })
        .default({}),
    })
    .default({}),
  slots: z
    .object({
      badge: textSlotSchema.default({ y: 20 }),
      title: textSlotSchema.default({ y: 30 }),
      subtitle: textSlotSchema.default({ y: 50 }),
      cta1: ctaSlotSchema.default({ y: 65 }),
      cta2: ctaSlotSchema.default({ y: 65 }),
      socialProof: socialProofSlotSchema.default({ y: 90 }),
      countdown: countdownSlotSchema.default({ y: 80 }),
      scrollIndicator: z
        .object({
          show: z.boolean().default(false),
        })
        .default({}),
    })
    .default({}),
  responsive: z
    .object({
      mobile: z
        .object({
          slots: z
            .object({
              badge: textSlotOverrideSchema,
              title: textSlotOverrideSchema,
              subtitle: textSlotOverrideSchema,
              cta1: ctaSlotOverrideSchema,
              cta2: ctaSlotOverrideSchema,
              socialProof: socialProofSlotOverrideSchema,
              countdown: countdownSlotOverrideSchema,
              scrollIndicator: z
                .object({
                  show: z.boolean(),
                })
                .partial()
                .default({}),
            })
            .default({}),
        })
        .default({}),
    })
    .default({}),
  theme: z
    .object({
      fonts: z
        .object({
          heading: z.string().default('var(--font-heading)'),
          body: z.string().default('var(--font-body)'),
        })
        .default({}),
    })
    .default({}),
});

export type HeroContent = z.infer<typeof heroSchema>;
