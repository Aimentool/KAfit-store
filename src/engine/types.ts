export type ModuleType = 'section' | 'page';

export type ModuleCapability =
  | 'navItem'
  | 'anchorTarget'
  | 'ctaTarget'
  | 'leadCapture'
  | 'quote'
  | 'booking'
  | 'gallery'
  | 'phone'
  | 'email';

export interface WiringHints {
  navOrder?: number;
  ctaPriority?: number;
}

export interface ModuleManifest {
  key: string;
  type: ModuleType;
  defaultLabel: string;
  anchor?: string;
  capabilities: ModuleCapability[];
  contentKey: string;
  wiringHints: WiringHints;
}
