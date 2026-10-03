export interface NavItem {
  label: string;
  href: string;
  type?: 'link' | 'anchor' | 'cta_button';
}

export interface CtaRoute {
  moduleKey: string;
  href: string;
  type: 'anchor' | 'page';
}

export interface WireResult {
  navItems: NavItem[];
  anchors: Record<string, string>;
  ctaRoutes: CtaRoute[];
  primaryCta: CtaRoute | null;
}
