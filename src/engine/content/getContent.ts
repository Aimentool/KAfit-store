import footerHu from '../../locales/hu/footer.json';
import heroHu from '../../locales/hu/hero.json';
import navigationHu from '../../locales/hu/navigation.json';
import { resolveLanguage, type SupportedLanguage } from '../language';

type ContentKey = 'hero' | 'navbar' | 'footer';

type SafeParseSuccess<T> = { success: true; data: T };
type SafeParseFailure = { success: false; error: unknown };
type SafeParseResult<T> = SafeParseSuccess<T> | SafeParseFailure;

interface SchemaLike<T> {
  safeParse: (value: unknown) => SafeParseResult<T>;
}

const localeMap: Record<`${SupportedLanguage}:${ContentKey}`, unknown> = {
  'hu:hero': heroHu,
  'hu:navbar': navigationHu,
  'hu:footer': footerHu,
};

function formatSchemaError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'issues' in error) {
    return JSON.stringify((error as { issues: unknown }).issues);
  }

  return String(error);
}

export async function getContent<T>(
  contentKey: ContentKey,
  lang?: string,
  schema?: SchemaLike<T>,
  defaults?: unknown
): Promise<T> {
  const resolvedLang = resolveLanguage(lang);
  const mapKey = `${resolvedLang}:${contentKey}` as const;
  const raw = localeMap[mapKey];

  if (raw === undefined) {
    const message = `[getContent] Nincs locale loader: ${mapKey}`;
    if (defaults !== undefined) {
      console.warn(`${message}; defaults használva.`);
      return defaults as T;
    }
    throw new Error(message);
  }

  if (!schema) {
    return raw as T;
  }

  const result = schema.safeParse(raw);
  if (result.success) {
    return result.data;
  }

  const message = `[getContent] Schema hiba: ${contentKey}/${resolvedLang} - ${formatSchemaError(result.error)}`;
  if (import.meta.env.DEV) {
    throw new Error(message);
  }

  console.warn(message);
  if (defaults !== undefined) {
    return defaults as T;
  }

  return raw as T;
}
