import type { ModuleManifest } from '../../engine/types';

export const navbarManifest: ModuleManifest = {
  key: 'navbar',
  type: 'section',
  defaultLabel: 'Navigacio',
  capabilities: ['navItem'],
  contentKey: 'navbar',
  wiringHints: {
    navOrder: 0,
    ctaPriority: 0,
  },
};
