import fs from 'node:fs';
import path from 'node:path';
import { brandSeedSchema, compileBrandSeed, type BrandSeed, type TokenTree } from './tokens/schema';

const seedPath = path.resolve('src/engine/theme/tokens/brand.seed.json');
const outputPath = path.resolve('src/styles/tokens.css');

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toCssSegment(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

function flattenToCssVars(node: TokenTree, prefix = '--'): string[] {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(node)) {
    const varName = `${prefix}${toCssSegment(key)}`;
    if (isRecord(value)) {
      lines.push(...flattenToCssVars(value as TokenTree, `${varName}-`));
      continue;
    }

    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`[tokens:build] Ures vagy ervenytelen token ertek: ${varName}`);
    }

    lines.push(`  ${varName}: ${value};`);
  }

  return lines;
}

function readSeedFile(filePath: string): BrandSeed {
  if (!fs.existsSync(filePath)) {
    throw new Error(`[tokens:build] Nem talalhato: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(raw) as unknown;
  return brandSeedSchema.parse(parsed);
}

const seed = readSeedFile(seedPath);
const compiledSeed = compileBrandSeed(seed);
const cssVars = flattenToCssVars(compiledSeed);
const cssContent = `:root {\n${cssVars.join('\n')}\n}\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, cssContent, 'utf-8');

console.log('[tokens:build] ✓ src/styles/tokens.css generalva');
