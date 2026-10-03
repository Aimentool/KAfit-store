/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        'text-base': 'var(--color-text)',
        muted: 'var(--color-muted)',
        surface: 'var(--color-surface)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        dark: 'var(--color-background)',
        light: 'var(--color-text)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width)',
        strong: 'var(--border-width-strong)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        ui: ['var(--font-ui)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        xs: 'var(--type-scale-xs)',
        sm: 'var(--type-scale-sm)',
        base: 'var(--type-scale-base)',
        lg: 'var(--type-scale-lg)',
        xl: 'var(--type-scale-xl)',
        display: 'var(--type-scale-display)',
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      lineHeight: {
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      maxWidth: {
        container: 'var(--layout-container-max)',
        content: 'var(--layout-content-max)',
        narrow: 'var(--layout-narrow-max)',
      },
      transitionDuration: {
        DEFAULT: 'var(--motion-duration)',
        fast: 'var(--motion-duration-fast)',
        slow: 'var(--motion-duration-slow)',
      },
    },
  },
  plugins: [],
};
