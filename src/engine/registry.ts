import type { ModuleManifest } from './types';
import { footerManifest } from '../modules/footer/manifest';
import { heroManifest } from '../modules/hero/manifest';
import { navbarManifest } from '../modules/navbar/manifest';

export const REGISTRY: Record<string, ModuleManifest> = {
  navbar: navbarManifest,
  hero: heroManifest,
  footer: footerManifest,
};

export function getManifest(key: string): ModuleManifest | undefined {
  return REGISTRY[key];
}
