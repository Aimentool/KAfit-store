import type { ModuleManifest } from '../types';
import { CTA_PRIORITY_ORDER, DEFAULT_CTA_PRIORITY, DEFAULT_NAV_ORDER } from './rules';
import type { CtaRoute, NavItem, WireResult } from './types';

interface WireOptions {
  debug?: boolean;
  overrides?: {
    heroCta?: string;
  };
}

function toRoute(manifest: ModuleManifest): CtaRoute {
  const href = manifest.anchor ? `#${manifest.anchor}` : `/${manifest.key}`;
  return {
    moduleKey: manifest.key,
    href,
    type: manifest.anchor ? 'anchor' : 'page',
  };
}

function uniqueByKey(modules: ModuleManifest[]): ModuleManifest[] {
  const seen = new Set<string>();
  const unique: ModuleManifest[] = [];
  for (const mod of modules) {
    if (seen.has(mod.key)) continue;
    seen.add(mod.key);
    unique.push(mod);
  }
  return unique;
}

function routeTypeFromHref(href: string): 'anchor' | 'page' {
  return href.trim().startsWith('#') ? 'anchor' : 'page';
}

/**
 * Auto-wiring engine.
 * Az aktiv modulok manifestjei alapjan generalja a nav, anchor es CTA strukturakat.
 */
export function wire(activeModules: ModuleManifest[], options: WireOptions = {}): WireResult {
  const { debug = false, overrides = {} } = options;
  const log = (message: string) => {
    if (debug) console.log(`[wire] ${message}`);
  };

  if (!Array.isArray(activeModules) || activeModules.length === 0) {
    log('Nincsenek aktiv modulok, fallback ures wiring.');
    return {
      navItems: [],
      anchors: {},
      ctaRoutes: [],
      primaryCta: { moduleKey: 'home', href: '/', type: 'page' },
    };
  }

  const modules = uniqueByKey(activeModules);
  const anchors: Record<string, string> = {};
  const usedAnchors = new Set<string>();

  for (const mod of modules) {
    if (!mod.anchor || !mod.capabilities.includes('anchorTarget')) continue;
    const normalizedAnchor = mod.anchor.replace(/^#+/, '').trim();
    if (!normalizedAnchor) continue;

    const finalAnchor = usedAnchors.has(normalizedAnchor)
      ? `${normalizedAnchor}-${mod.key}`
      : normalizedAnchor;

    usedAnchors.add(finalAnchor);
    anchors[mod.key] = `#${finalAnchor}`;
    log(`Anchor regisztralva: ${mod.key} -> #${finalAnchor}`);
  }

  const navModules = modules
    .filter((mod) => mod.capabilities.includes('navItem') && mod.key !== 'navbar')
    .sort(
      (a, b) =>
        (a.wiringHints.navOrder ?? DEFAULT_NAV_ORDER) - (b.wiringHints.navOrder ?? DEFAULT_NAV_ORDER)
    );

  const navItems: NavItem[] = navModules.map((mod) => {
    const href = anchors[mod.key] ?? (mod.anchor ? `#${mod.anchor}` : `/${mod.key}`);
    return {
      label: mod.defaultLabel,
      href,
      type: href.startsWith('#') ? 'anchor' : 'link',
    };
  });
  log(`Nav items generalva: ${navItems.map((item) => item.label).join(', ')}`);

  const ctaCandidates = modules.filter((mod) => mod.capabilities.includes('ctaTarget'));
  const usedCtaKeys = new Set<string>();
  const ctaRoutes: CtaRoute[] = [];

  for (const capability of CTA_PRIORITY_ORDER) {
    const matches = ctaCandidates
      .filter((mod) => mod.capabilities.includes(capability) && !usedCtaKeys.has(mod.key))
      .sort(
        (a, b) =>
          (b.wiringHints.ctaPriority ?? DEFAULT_CTA_PRIORITY) -
          (a.wiringHints.ctaPriority ?? DEFAULT_CTA_PRIORITY)
      );

    if (matches.length === 0) continue;
    const winner = matches[0];
    usedCtaKeys.add(winner.key);

    const route = toRoute(winner);
    ctaRoutes.push(route);
    log(`CTA route: ${capability} -> ${route.moduleKey} (${route.href})`);
  }

  let primaryCta: CtaRoute | null = null;
  if (overrides.heroCta && overrides.heroCta.trim() !== '') {
    const href = overrides.heroCta.trim();
    primaryCta = {
      moduleKey: 'override',
      href,
      type: routeTypeFromHref(href),
    };
    log(`Primary CTA: override (${href})`);
  } else if (ctaRoutes.length > 0) {
    primaryCta = ctaRoutes[0];
    log(`Primary CTA: ${primaryCta.moduleKey} (${primaryCta.href})`);
  } else if (Object.values(anchors)[0]) {
    primaryCta = { moduleKey: 'first-anchor', href: Object.values(anchors)[0], type: 'anchor' };
    log(`Primary CTA: first-anchor fallback (${primaryCta.href})`);
  } else {
    primaryCta = { moduleKey: 'home', href: '/', type: 'page' };
    log('Primary CTA: home fallback (/)');
  }

  return { navItems, anchors, ctaRoutes, primaryCta };
}
