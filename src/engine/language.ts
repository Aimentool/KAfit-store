const DEFAULT_LANGUAGE = 'hu';
const SUPPORTED_LANGUAGES = [DEFAULT_LANGUAGE] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function getSupportedLanguages(): SupportedLanguage[] {
  return [...SUPPORTED_LANGUAGES];
}

export function getDefaultLanguage(): SupportedLanguage {
  return DEFAULT_LANGUAGE;
}

export function resolveLanguage(paramLang?: string): SupportedLanguage {
  const normalized = typeof paramLang === 'string' ? paramLang.trim().toLowerCase() : '';
  return SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)
    ? (normalized as SupportedLanguage)
    : DEFAULT_LANGUAGE;
}

export function getCurrentLanguage(): SupportedLanguage {
  return DEFAULT_LANGUAGE;
}
