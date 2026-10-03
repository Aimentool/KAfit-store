import { z } from 'zod';

const menuItemSchema = z.object({
  link: z.string().default('#'),
  text: z.string().optional(),
  type: z.enum(['link', 'cta_button', 'anchor']).default('link'),
  highlight_effect: z.string().optional(),
  custom_html: z.string().optional(),
  override_color: z.string().optional(),
});

export const navbarSchema = z.object({
  settings: z
    .object({
      background: z
        .object({
          use_global_theme: z.boolean().default(true),
          custom_color: z.string().optional(),
          transparency: z
            .object({
              enable: z.boolean().default(false),
              opacity_percent: z.number().default(80),
              blur_effect: z.string().default('backdrop-blur-md'),
            })
            .optional(),
        })
        .default({}),
      behavior: z
        .object({
          sticky: z.boolean().default(true),
          hide_on_scroll_down: z.boolean().default(false),
          show_on_scroll_up: z.boolean().default(true),
        })
        .default({}),
      layout: z
        .object({
          width: z.string().default('90%'),
          padding_y: z.string().default('15px'),
          padding_x: z.string().default('20px'),
          content_alignment: z.string().default('justify-between'),
        })
        .default({}),
    })
    .default({}),
  logo: z
    .object({
      image_source: z.string().default(''),
      height_class: z.string().default('h-10'),
      brand_text: z
        .object({
          show: z.boolean().default(false),
          mode: z.enum(['text', 'image']).default('text'),
          text: z.string().optional(),
          custom_image_path: z.string().optional(),
          color_override: z.string().optional(),
        })
        .default({}),
    })
    .default({}),
  menu_items: z.array(menuItemSchema).default([]),
});

export type NavbarContent = z.infer<typeof navbarSchema>;
