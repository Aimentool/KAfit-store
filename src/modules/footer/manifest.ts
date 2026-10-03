import type { ModuleManifest } from '../../engine/types';

export const footerManifest: ModuleManifest = {
  key: 'footer',
  type: 'section',
  defaultLabel: 'Footer',
  capabilities: [],
  contentKey: 'footer',
  wiringHints: {
    navOrder: 999,
    ctaPriority: 0,
  },
};
