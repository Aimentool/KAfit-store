import type { ModuleManifest } from '../../engine/types';

export const heroManifest: ModuleManifest = {
  key: 'hero',
  type: 'section',
  defaultLabel: 'Hero',
  anchor: 'hero',
  capabilities: [],
  contentKey: 'hero',
  wiringHints: {
    navOrder: 0,
    ctaPriority: 0,
  },
};
