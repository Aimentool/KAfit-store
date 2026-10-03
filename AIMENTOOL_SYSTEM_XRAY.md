# AIMENTOOL SYSTEM XRAY
# ============================================================
# Ez a fĂˇjl az Aimentool master template teljes rendszerĂ©nek
# "Ă©lĹ‘ dokumentuma". BedobhatĂł bĂˇrmely AI-ba (Claude, Codex,
# GPT-4, Gemini) Ă©s azonnal megĂ©rti a rendszert, kĂ©pes benne
# dolgozni, javĂ­tani, fejleszteni, hangolni.
#
# VERZIĂ“ KEZELĂ‰S: Ha vĂˇltoztatĂˇst vĂ©gzel a rendszeren,
# frissĂ­tsd ezt a fĂˇjlt is. Ez a rendszer "igazsĂˇg forrĂˇsa".
#
# UTOLSO FRISSITES: 2026-03-28
# RENDSZER VERZIO: 2.4.2
# KANONIKUS HELY: /Alap/AIMENTOOL_SYSTEM_XRAY.md
# ============================================================

---

## 0. MASTER TEMPLATE POLICY (2026-03-10)

- Az `Alap/` mappa a master template.
- Uj weboldalt mindig az `Alap/` klonozasaval kell inditani uj celmappaba.
- Az `Alap/` mappa referencia marad, ugyfel-specifikus fejlesztes a klon projektben tortenik.
- A tovabbi modulok (services/contact/stb.) az uj klon projektbe epulnek be.

---

## 1. MI EZ A RENDSZER

Az Aimentool egy **Astro alapĂş, modulĂˇris weboldal-gyĂˇrtĂł master template**.
CĂ©lja: egy fejlesztĹ‘ (aki nem kĂłdol) 1 ĂłrĂˇn belĂĽl kĂ©pes legyen bĂˇrmilyen ĂĽgyfĂ©lnek
landing oldalt gyĂˇrtani, deploy-olni â€” minden esetben hibamentesen, egysĂ©ges
minĹ‘sĂ©gben, skĂˇlĂˇzhatĂł struktĂşrĂˇval.

**TechnolĂłgiai alap:**
- Astro 5.x (SSG â€” statikus site generĂˇlĂˇs)
- TypeScript (strict mĂłd)
- Tailwind CSS 3.x (token integrĂˇciĂł)
- Zod (schema validĂˇciĂł)
- tsx (script futtatĂˇshoz)

**ĂśzemeltetĂ©si mĂłd:**
- FejlesztĹ‘ klĂłnozza a master template-et
- KitĂ¶lt egy `client.config.ts` fĂˇjlt
- Lefuttat egy scriptet (`npm run init:client`)
- BemĂˇsolja az asseteket
- Build + deploy

---

## 2. RĂ‰TEG TĂ‰RKĂ‰P

```
â”Śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FEJLESZTĹ INTERFĂ‰SZ                                    â”‚
â”‚  client.config.ts  â†’  npm run init:client               â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                         â”‚ generĂˇlja
                         â–Ľ
â”Śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  TARTALOM RĂ‰TEG (locale JSON-ok)                        â”‚
â”‚  src/locales/hu/                                        â”‚
â”‚    hero.json  navigation.json  footer.json             â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                         â”‚ getContent() olvassa
                         â–Ľ
â”Śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  ENGINE RĂ‰TEG                                           â”‚
â”‚  registry.ts  â†’  wire.ts  â†’  getContent.ts             â”‚
â”‚  theme/buildTokens.ts  â†’  styles/tokens.css            â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                         â”‚ props-kĂ©nt adja Ăˇt
                         â–Ľ
â”Śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  MODUL RĂ‰TEG (UI komponensek)                           â”‚
â”‚  Navbar  Hero  Footer                                   â”‚
â”‚  (mindegyikhez: manifest + schema + defaults)          â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                         â”‚ index.astro rakja Ă¶ssze
                         â–Ľ
â”Śâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  LANDING ASSEMBLY                                       â”‚
â”‚  src/pages/index.astro                                  â”‚
â”‚  (wire() â†’ getContent() â†’ modulok renderelĂ©se)         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
```

---

## 3. DESIGN TOKEN RENDSZER

### Mi ez Ă©s miĂ©rt fontos
Egyetlen forrĂˇs (`brand.seed.json`) tartalmazza az Ă¶sszes vizuĂˇlis paramĂ©tert.
EbbĹ‘l generĂˇlĂłdnak CSS variables, amiket minden komponens hasznĂˇl.
**Soha nem szabad hex szĂ­nt Ă­rni .astro fĂˇjlba** â€” csak `var(--color-primary)` stĂ­lusban.

### FĂˇjlok
```
src/engine/theme/tokens/brand.seed.json   â† EGYETLEN FORRĂS (ezt szerkeszted)
src/engine/theme/buildTokens.ts           â† seed â†’ CSS var generĂˇtor
src/styles/tokens.css                     â† generĂˇlt (ne szerkeszd kĂ©zzel)
src/styles/global.css                     â† importĂˇlja a tokens.css-t
tailwind.config.mjs                       â† Tailwind classes tokenekre mutatnak
```

### Token struktĂşra (brand.seed.json)
```json
{
  "color": {
    "primary":    "#5EEAD4",   â† fĹ‘ szĂ­n (gombok, kiemelĂ©sek)
    "secondary":  "#0F766E",   â† mĂˇsodlagos szĂ­n
    "accent":     "#2DD4BF",   â† hover/accent Ăˇllapotok
    "background": "#050B10",   â† oldal hĂˇttĂ©r
    "text":       "#FFFFFF",   â† alapszĂ¶veg
    "muted":      "#81A1A6",   â† halvĂˇny szĂ¶veg
    "surface":    "#0d1a22",   â† kĂˇrtyĂˇk/felĂĽletek hĂˇttere
    "border":     "rgba(255,255,255,0.1)"  â† keretek
  },
  "font": {
    "heading": "sans-serif",   â† fĹ‘cĂ­mek betĹ±tĂ­pusa
    "body":    "sans-serif"    â† szĂ¶vegtĂ¶rzs betĹ±tĂ­pusa
  },
  "radius": {
    "sm":   "0.375rem",
    "md":   "0.75rem",
    "lg":   "1rem",
    "full": "9999px"           â† pill/rounded-full elemek
  },
  "spacing": {
    "section-y":   "5rem",     â† szekciĂłk vertikĂˇlis padding
    "container-x": "1.5rem"    â† kontĂ©ner oldalirĂˇnyĂş padding
  },
  "motion": {
    "duration": "300ms",       â† animĂˇciĂł hossza
    "easing":   "cubic-bezier(0.4,0,0.2,1)"
  }
}
```

### CSS Variables (generĂˇlt, tokens.css)
```css
:root {
  --color-primary: #5EEAD4;
  --color-secondary: #0F766E;
  /* ... stb. flat namespace, prefix = seed kulcs Ăştvonala */
}
```

### Tailwind integrĂˇciĂł (tailwind.config.mjs)
```js
colors: {
  primary:    'var(--color-primary)',
  secondary:  'var(--color-secondary)',
  /* ... */
}
```

### âśŹď¸Ź TUNING: SzĂ­n mĂłdosĂ­tĂˇs
1. Szerkeszd: `src/engine/theme/tokens/brand.seed.json`
2. Futtasd: `npm run tokens:build`
3. Azonnal Ă©rvĂ©nyes (dev szerver auto-reload)

### âśŹď¸Ź TUNING: Ăšj token hozzĂˇadĂˇsa
1. Add hozzĂˇ `brand.seed.json`-ba (bĂˇrmilyen nesting mĂ©lysĂ©gben)
2. `npm run tokens:build` â€” automatikusan legenerĂˇlja a CSS var-t
3. HasznĂˇld a komponensben: `var(--[kulcsok-kĂ¶tĹ‘jellel])`
   PĂ©lda: `color.shadow.soft` â†’ `var(--color-shadow-soft)`

### 2026-03-28 GLOBAL VISUAL SKIN UPDATE

Az eredeti minimal `brand.seed.json` immar egy **bĹ‘vĂ­tett global visual skin contract**.
A seed jelenlegi fo csoportjai:

```json
{
  "color": {},
  "font": {},
  "type-scale": {},
  "line-height": {},
  "font-weight": {},
  "radius": {},
  "spacing": {},
  "shadow": {},
  "layout": {},
  "border": {},
  "motion": {},
  "component": {
    "button": {},
    "input": {},
    "card": {},
    "badge": {},
    "navbar": {},
    "footer": {},
    "social": {},
    "hero": {}
  }
}
```

Uj fo szabaly:
- A global skin tartalmazza a **kozos vizualis nyelvet** (szinek, tipografia, spacing, radius, shadow, border, motion, kozos UI tokenek).
- A modul payload tovabbra is a **modul-specifikus layoutot es tartalmat** hordozza.
- Az Alap aktiv core moduljainak (Navbar, Hero, Footer) alapertelmezetten ebbol a skin retegbol kell olvasniuk.
- A kesobbi extension moduloknak is ugyanezt a global skin reteget kell hasznalniuk.

Uj fajl:
`src/engine/theme/tokens/schema.ts` â† Zod schema a runtime skin contracthoz

Gyakorlati jelentese:
- a kulso builder tarthat sajat `_editorState` adatot privatban,
- a weboldal repo csak a tiszta runtime seedet kapja meg,
- a preview es a vegleges site ugyanarra a token-strukturara tud epulni.

### 2026-03-28 EXTENDED BRAND EXPORT TAMOGATAS

A token pipeline immar **ket bemeneti formatumot** tud fogadni:

- legacy `BrandSeed` runtime formatum
- generatorbol erkezo `ExtendedDesignTokenSeed` formatum

Mukodes:
- a Zod schema mindkettot elfogadja
- a `buildTokens.ts` extended input eseten eloszor runtime tokenekké normalizal
- ezutan a raw premium mezoket **is** kiflatteneli CSS valtozokka

Peldak:
- `surface.shadow` -> `--surface-shadow`
- `surface.blur` -> `--surface-blur`
- `spacing.containerMaxWidth` -> `--spacing-container-max-width`
- `assets.iconStyle` -> `--assets-icon-style`

Fontos:
- az extended seed sem torheti el a jelenlegi Astro runtime-ot, mert a build soran a hianyzo legacy tokenek derivaltan legeneralodnak
- a premium szemantikus mezok megmaradnak a CSS variable retegen keresztul a kesobbi moduloknak is

---

## 4. MODULE MANIFEST RENDSZER

### Mi ez
Minden modul "bemutatkozik" a rendszernek egy `manifest.ts` fĂˇjlban.
A registry ezeket gyĹ±jti Ă¶ssze. A wiring engine ezekbĹ‘l dolgozik.

### ModuleManifest tĂ­pus
```typescript
interface ModuleManifest {
  key: string;                    // Egyedi azonosĂ­tĂł ("navbar", "services", stb.)
  type: 'section' | 'page';      // SzekciĂł az oldalon belĂĽl, vagy kĂĽlĂ¶n URL
  defaultLabel: string;           // Nav menĂĽpont felirat javaslat
  anchor?: string;                // Ha section: anchor ID (pl. "section" â†’ "#section")
  capabilities: ModuleCapability[]; // Mit "tud" a modul (lĂˇsd alĂˇbb)
  contentKey: string;             // Melyik locale JSON kulcshoz tartozik
  wiringHints: {
    navOrder?: number;            // Nav sorrendben elfoglalt hely (kisebb = elĹ‘rĂ©bb)
    ctaPriority?: number;         // CTA cĂ©lkĂ©nt valĂł fontossĂˇg (0-100)
  };
}
```

### Capabilities (modul kĂ©pessĂ©gek)
```
navItem       = megjelenik a navbar menĂĽben
anchorTarget  = lehet anchor cĂ©l (#anchor-id)
ctaTarget     = lehet CTA gomb cĂ©lpontja
leadCapture   = lead-gyĹ±jtĂ©s van benne (pl. form)
quote         = ajĂˇnlatkĂ©rĹ‘
booking       = idĹ‘pontfoglalĂł
gallery       = galĂ©ria
phone         = telefonszĂˇm van
email         = email van
```

### Core modulok capabilities Ă¶sszefoglalĂł
```
navbar:   navItem                              â†’ nincs anchor, Ĺ‘ mutatja a nav-ot
hero:     []                                   â†’ nincs capability, Ĺ‘ kĂĽld CTA-t
footer:   []                                   â†’ nincs, csak megjelenik alul
```

### âśŹď¸Ź TUNING: Ăšj modul hozzĂˇadĂˇsa a wiring-hez
1. Hozd lĂ©tre: `src/modules/[key]/manifest.ts`
2. Add hozzĂˇ `src/engine/registry.ts`-be: `import { [key]Manifest } from '../modules/[key]/manifest'; REGISTRY[[key]] = [key]Manifest;`
3. Add hozzĂˇ az `index.astro`-ban az `activeModules` tĂ¶mbhĂ¶z

---

## 5. AUTO-WIRING ENGINE

### Mi ez
A `wire()` fĂĽggvĂ©ny az aktĂ­v modulok manifestjei alapjĂˇn automatikusan meghatĂˇrozza:
- Melyik nav menĂĽpontok jelenjenek meg (Ă©s milyen sorrendben)
- Melyik anchor ID-k Ă©rhetĹ‘k el
- Melyik CTA gombnak mi legyen a cĂ©lpontja

### FĂˇjlok
```
src/engine/wiring/types.ts    â† NavItem, CtaRoute, WireResult tĂ­pusok
src/engine/wiring/rules.ts    â† CTA prioritĂˇs sorrend
src/engine/wiring/wire.ts     â† a wire() fĂĽggvĂ©ny
```

### CTA prioritĂˇs sorrend (rules.ts)
```
1. quote         â† ajĂˇnlatkĂ©rĹ‘ oldal (legjobb konverziĂł)
2. leadCapture   â† kapcsolat form
3. booking       â† idĹ‘pontfoglalĂł
4. phone         â† telefonszĂˇm
5. email         â† email cĂ­m
```
Ha egyik sem elĂ©rhetĹ‘: fallback `elso anchor` â†’ fallback `/`

### PĂ©lda wire() hĂ­vĂˇs
```typescript
const wired = wire(activeModules, {
  debug: true,  // debug: true â†’ konzolban logolja a dĂ¶ntĂ©seket
});

// wired.navItems      â†’ automatikusan generalt navbar elemek
// wired.anchors       â†’ aktiv anchor modulok map-je
// wired.primaryCta    â†’ legjobb CTA celpont, vagy elso anchor, vagy /
```

### Override (ha nem kell az auto-wiring)
```typescript
const wired = wire(activeModules, {
  overrides: {
    heroCta: '/ajanlat',      // Hero CTA fix cĂ©lpontja
  }
});
```

### âśŹď¸Ź TUNING: CTA prioritĂˇs mĂłdosĂ­tĂˇsa
Szerkeszd: `src/engine/wiring/rules.ts`
A `CTA_PRIORITY_ORDER` tĂ¶mb sorrendjĂ©t vĂˇltoztasd meg.

### âśŹď¸Ź TUNING: Ăšj CTA capability hozzĂˇadĂˇsa
1. Add hozzĂˇ a `ModuleCapability` tĂ­pushoz (`src/engine/types.ts`)
2. Add hozzĂˇ a `CTA_PRIORITY_ORDER` tĂ¶mbhĂ¶z a kĂ­vĂˇnt prioritĂˇssal (`rules.ts`)
3. Az Ăşj modul manifestjĂˇban add hozzĂˇ a capabilities-be

---

## 6. CONTENT GETTER + SCHEMA VALIDĂCIĂ“

### Mi ez
`getContent()` az egyetlen belĂ©pĂ©si pont a locale tartalmakhoz.
Kezeli a betĂ¶ltĂ©st, a schema validĂˇciĂłt, a fallback-et Ă©s a hibajelzĂ©st.

### SzigorĂşsĂˇg szintek
```
DEV mĂłd:  schema hiba â†’ ERROR (tudod, hogy eltĂ¶rt valamit)
PROD mĂłd: schema hiba â†’ WARN + fallback defaults (az oldal nem omlik Ă¶ssze)
```

### Locale fĂˇjlok
```
src/locales/hu/hero.json         â† hero szĂ¶vegek + beĂˇllĂ­tĂˇsok
src/locales/hu/navigation.json   â† navbar konfig
src/locales/hu/footer.json       â† footer adatok
```

### âśŹď¸Ź TUNING: Ăšj locale mezĹ‘ hozzĂˇadĂˇsa
1. Add hozzĂˇ a locale JSON fĂˇjlba (pl. `hero.json`)
2. Add hozzĂˇ a schema-ba (`src/modules/hero/schema.ts`)
3. Add hozzĂˇ a defaults-ba (`src/modules/hero/defaults.json`)
4. HasznĂˇld a komponensben

### âśŹď¸Ź TUNING: Ăšj nyelv hozzĂˇadĂˇsa (i18n)
1. Hozd lĂ©tre: `src/locales/[langCode]/` (pl. `en/`)
2. MĂˇsold be Ă©s fordĂ­tsd le az Ă¶sszes JSON fĂˇjlt
3. Add hozzĂˇ a `getContent.ts` localeMap-jĂ©be az `en:*` kulcsokat
4. A `settings.json`-ban (vagy `client.config.ts`-ben) add hozzĂˇ: `lang: ['hu', 'en']`
5. Hozd lĂ©tre: `src/pages/[lang]/index.astro` a dinamikus routing-hoz

---

## 7. LANDING ASSEMBLY (index.astro)

### Mi ez
Az `src/pages/index.astro` az egyetlen fĂˇjl ahol a modulokat "Ă¶sszerakjĂˇk".
Ez a fĂˇjl mondja meg a rendszernek, melyik modulok aktĂ­vak.

### MĹ±kĂ¶dĂ©s folyamata
```
1. activeModules tĂ¶mb definiĂˇlĂˇsa (manifest-ek listĂˇja)
2. wire(activeModules) â†’ navItems, anchors, primaryCta
3. getContent() hĂ­vĂˇsok â†’ validĂˇlt tartalom minden modulhoz
4. Auto-wiring alkalmazĂˇsa: hero CTA, navbar menu_items
5. Modulok renderelĂ©se props-szal
```

### âśŹď¸Ź TUNING: Modul hozzĂˇadĂˇsa/eltĂˇvolĂ­tĂˇsa
```astro
// HozzĂˇadĂˇs egy uj modulhoz:
import NewSection from '../modules/new-section/NewSection.module.astro';
import { newSectionManifest } from '../modules/new-section/manifest';

const activeModules = [navbarManifest, heroManifest, newSectionManifest, footerManifest];
// + getContent hĂ­vĂˇs a new-section contenthez
// + renderelĂ©s: <NewSection ... />

// EltĂˇvolĂ­tĂˇs: vedd ki az activeModules tĂ¶mbbĹ‘l Ă©s tĂ¶rĂ¶ld az importot + renderelĂ©st
```

### âśŹď¸Ź TUNING: Modul sorrend megvĂˇltoztatĂˇsa
Az `activeModules` tĂ¶mb sorrendje **NEM** hatĂˇrozza meg a megjelenĂ©si sorrendet.
A megjelenĂ©si sorrend a JSX-ben van (ahol renderelĂ©ed a modulokat).
Az `activeModules` sorrend csak a wiring engine-nek szĂˇmĂ­t (navOrder property dĂ¶nti el a nav sorrendet).

---

## 8. CLIENT INIT PIPELINE

### Mi ez
A `scripts/initClient.ts` az egyetlen hely ahol ĂĽgyfĂ©l-specifikus adat "belĂ©p" a rendszerbe.
Beolvassa a `client.config.ts`-t Ă©s szĂ©tszedi a helyes fĂˇjlokba.

### client.config.ts struktĂşra
```typescript
export default {
  clientId: string,           // Mappa neve: public/assets/clients/[clientId]/
  lang: string[],             // ['hu'] vagy ['hu', 'en']
  brand: {
    primary:    string,       // Hex szĂ­n â†’ brand.seed.json color.primary
    secondary:  string,
    accent:     string,
    background: string,
    text:       string,
    muted:      string,
    font:       string,       // Google Fonts neve â†’ brand.seed.json font.*
  },
  navbar: { brand: string, logoFile: string },
  hero:   { headline: string, sub: string, cta: string, responsive?: object },
  footer: { brand, tagline, email, phone, address, privacy, social },
}
```

### Mit generĂˇl a script
```
src/engine/theme/tokens/brand.seed.json  â† brand adatokbĂłl
src/locales/[lang]/navigation.json       â† navbar adatokbĂłl
src/locales/[lang]/hero.json             â† hero adatokbĂłl
src/locales/[lang]/footer.json           â† footer adatokbĂłl
public/assets/clients/[clientId]/        â† ĂĽres mappa (ide kell a logo, hero)
```
Majd automatikusan lefuttatja: `npm run tokens:build`

### âśŹď¸Ź TUNING: Ăšj mezĹ‘ hozzĂˇadĂˇsa a client.config.ts-hez
1. Add hozzĂˇ a `client.config.ts` struktĂşrĂˇjĂˇhoz (kommentekkel dokumentĂˇlva)
2. A `scripts/initClient.ts`-ben olvasd ki Ă©s Ă­rd a megfelelĹ‘ locale fĂˇjlba
3. FrissĂ­tsd ezt a dokumentumot is

---

## 9. CORE MODULOK RĂ‰SZLETES LEĂŤRĂS

### 9.1 NAVBAR
```
FĂˇjl:        src/modules/navbar/Navbar.module.astro
Manifest:    src/modules/navbar/manifest.ts
Schema:      src/modules/navbar/schema.ts
Defaults:    src/modules/navbar/defaults.json
Locale:      src/locales/hu/navigation.json

Props:
  navigationConfig: NavbarContent   â† a teljes navbar konfig
  themeConfig: { fonts: { heading, body } }

KĂ©pessĂ©gek:
  - Sticky navbar scroll viselkedĂ©ssel
  - Auto-hide scrollozĂˇskor (ha be van kapcsolva)
  - Mobilon hamburger menĂĽ
  - Logo kĂ©p + brand text szĂ¶veg/kĂ©p
  - Custom HTML CTA gomb support (menu_items-ben)
  - color override a custom CTA gombokhoz

Token kapcsolat:
  --color-background  â† navbar hĂˇttĂ©r
  --color-primary     â† logo/szĂ¶veg szĂ­n
  --color-accent      â† hover Ăˇllapotok
```

### 9.2 HERO
```
FĂˇjl:        src/modules/hero/Hero.module.astro
Manifest:    src/modules/hero/manifest.ts
Schema:      src/modules/hero/schema.ts
Defaults:    src/modules/hero/defaults.json
Locale:      src/locales/hu/hero.json

Props:
  heroConfig: HeroContent   â† a teljes hero konfig

KĂ©pessĂ©gek:
  - VideĂł vagy kĂ©p hĂˇttĂ©r
  - "Dynamic" mĂłd: elmosĂłdott hĂˇttĂ©r + fĹ‘ videĂł elĹ‘tĂ©rben
  - CĂ­m, alcĂ­m, CTA gomb â€” mindegyik kĂĽlĂ¶n pozĂ­cionĂˇlhatĂł
  - Animate-fade-in-up animĂˇciĂł
  - Egyedi betĹ±tĂ­pus per elem
  - CTA gomb custom HTML override support

Token kapcsolat:
  --color-background  â† hero hĂˇttĂ©rszĂ­n (ha nincs videĂł/kĂ©p)
  --font-heading      â† alapĂ©rtelmezett cĂ­m betĹ±tĂ­pus
  --font-body         â† alapĂ©rtelmezett alcĂ­m betĹ±tĂ­pus

Auto-wiring:
  Ha button.link == '#' (default), a wiring engine primaryCta Ă©rtĂ©kĂ©t kapja
```

### 9.3 EXTENSION MODULOK
```
Az `Alap/` aktiv runtime csomagja jelenleg nem tartalmaz `services` vagy `contact` modult.
Ezek extension modulokent tervezettek:

- uj klon projektbe kerulnek be, amikor az adott weboldalnak szuksege van rajuk
- vagy a workspace szintu `Core/` gyujtohelyrol integralhatok vissza
- ugyanazt a global visual skin contractot kell hasznalniuk (`brand.seed.json`)
```

### 9.4 FOOTER
```
FĂˇjl:        src/modules/footer/Footer.module.astro
Komponensek: src/modules/footer/components/PoweredBy.astro
             src/modules/footer/components/social-icons.astro
Manifest:    src/modules/footer/manifest.ts
Schema:      src/modules/footer/schema.ts
Defaults:    src/modules/footer/defaults.json
Locale:      src/locales/hu/footer.json

Props:
  footerConfig:   { footer: FooterContent }
  brandingConfig: { show_powered_by: boolean }

KĂ©pessĂ©gek:
  - Dark/light mĂłd (footer.theme.mode alapjĂˇn)
  - Brand neve + leĂ­rĂˇs
  - Kapcsolat adatok (cĂ­m, email, telefon)
  - Social ikonok (facebook, instagram, linkedin, tiktok, youtube, pinterest, viber, whatsapp, gmb, waze)
  - Footer menu linkek
  - Legal linkek (adatvĂ©delem, ASZF, cookie)
  - PoweredBy komponens
  - System status jelzĹ‘

Token kapcsolat:
  --color-background  â† footer hĂˇttĂ©r (dark mĂłdban)
  --color-text        â† szĂ¶veg
  --color-accent      â† hover, social ikonok, kiemelĹ‘k

Social linkek:
  Csak azok az ikonok jelennek meg, amikhez nem ĂĽres a link.
  Ha nincs social link, a szekciĂł teljesen eltĹ±nik.
```

---

## 10. FILE TREE (teljes rendszer)

### Workspace szintu shared mappa
Az `aimentool-web` projekt mellett, a workspace gyokerben letezik egy `Core/` mappa.
Ide kerulnek a tovabbiakban a tobbszor felhasznalhato modulok, layoutok es egyeb shared epitoelemek.
Minden munka elott kotelezo egyeztetni a userrel, melyik mappaban kell dolgozni; ha ezt mar megadta, az elso valaszban vissza kell jelezni.

```
[projekt-gyĂ¶kĂ©r]/
â”śâ”€â”€ astro.config.mjs              â† Astro konfig (site/base + integrations)
â”śâ”€â”€ site.config.mjs               â† publikus site URL + base path helper
â”śâ”€â”€ tailwind.config.mjs           â† Tailwind (token alapĂş color/radius/font)
â”śâ”€â”€ tsconfig.json                 â† TypeScript strict mĂłd
â”śâ”€â”€ package.json                  â† scripts: dev, build, preview, tokens:build, init:client
â”śâ”€â”€ client.config.ts              â† [GITIGNORE] ĂĽgyfĂ©l seed fĂˇjl
â”śâ”€â”€ CHANGELOG.md                  â† mi vĂˇltozott
â”śâ”€â”€ AIMENTOOL_SYSTEM_XRAY.md      â† EZ A FĂJL
â”‚
â”śâ”€â”€ scripts/
â”‚   â””â”€â”€ initClient.ts             â† client.config.ts â†’ locale + token fĂˇjlok
â”‚
â”śâ”€â”€ public/
â”‚   â”śâ”€â”€ assets/                   â† [GITIGNORE] ĂĽgyfĂ©l asseteket ide
â”‚   â”‚   â”śâ”€â”€ logo.png
â”‚   â”‚   â”śâ”€â”€ brand_text.png
â”‚   â”‚   â””â”€â”€ hero_video.mp4
â”‚   â”‚   â””â”€â”€ clients/[clientId]/      â† init:client ide keszit ugyfel mappat
â”‚   â”śâ”€â”€ favicon.ico
â”‚   â””â”€â”€ favicon.svg
â”‚
â””â”€â”€ src/
    â”śâ”€â”€ engine/
    â”‚   â”śâ”€â”€ types.ts              â† ModuleManifest, ModuleCapability
    â”‚   â”śâ”€â”€ registry.ts           â† REGISTRY = { key: manifest }
    â”‚   â”śâ”€â”€ language.ts           â† resolveLanguage()
    â”‚   â”śâ”€â”€ content/
    â”‚   â”‚   â””â”€â”€ getContent.ts     â† schema validĂˇciĂł + fallback
    â”‚   â”śâ”€â”€ theme/
    â”‚   â”‚   â”śâ”€â”€ tokens/
    â”‚   â”‚   â”‚   â””â”€â”€ brand.seed.json  â† [SZERKESZD EZT] design tokenek
    â”‚   â”‚   â””â”€â”€ buildTokens.ts    â† seed â†’ tokens.css generĂˇtor
    â”‚   â””â”€â”€ wiring/
    â”‚       â”śâ”€â”€ types.ts          â† NavItem, CtaRoute, WireResult
    â”‚       â”śâ”€â”€ rules.ts          â† CTA_PRIORITY_ORDER
    â”‚       â””â”€â”€ wire.ts           â† wire() fĂĽggvĂ©ny
    â”‚
    â”śâ”€â”€ modules/
    â”‚   â”śâ”€â”€ navbar/
    â”‚   â”‚   â”śâ”€â”€ Navbar.module.astro  â† [UI â€” NE VĂLTOZTASD kĂ¶nnyen]
    â”‚   â”‚   â”śâ”€â”€ manifest.ts
    â”‚   â”‚   â”śâ”€â”€ schema.ts
    â”‚   â”‚   â”śâ”€â”€ defaults.json
    â”‚   â”‚   â””â”€â”€ README.md
    â”‚   â”śâ”€â”€ hero/
    â”‚   â”‚   â”śâ”€â”€ Hero.module.astro    â† [UI â€” NE VĂLTOZTASD kĂ¶nnyen]
    â”‚   â”‚   â”śâ”€â”€ manifest.ts
    â”‚   â”‚   â”śâ”€â”€ schema.ts
    â”‚   â”‚   â”śâ”€â”€ defaults.json
    â”‚   â”‚   â””â”€â”€ README.md
    â”‚   â””â”€â”€ footer/
    â”‚       â”śâ”€â”€ Footer.module.astro  â† [UI â€” NE VĂLTOZTASD kĂ¶nnyen]
    â”‚       â”śâ”€â”€ components/
    â”‚       â”‚   â”śâ”€â”€ PoweredBy.astro
    â”‚       â”‚   â””â”€â”€ social-icons.astro
    â”‚       â”śâ”€â”€ manifest.ts
    â”‚       â”śâ”€â”€ schema.ts
    â”‚       â”śâ”€â”€ defaults.json
    â”‚       â””â”€â”€ README.md
    â”‚
    â”śâ”€â”€ locales/
    â”‚   â””â”€â”€ hu/
    â”‚       â”śâ”€â”€ hero.json         â† [SZERKESZD] hero szĂ¶vegek
    â”‚       â”śâ”€â”€ navigation.json   â† [SZERKESZD] navbar konfig
    â”‚       â””â”€â”€ footer.json       â† [SZERKESZD] footer adatok
    â”‚
	    â”śâ”€â”€ layouts/
	    â”‚   â””â”€â”€ Layout.astro          â† HTML wrapper (title, meta, global CSS)
	    â”‚
	    â”śâ”€â”€ pages/
	    â”‚   â”śâ”€â”€ index.astro           â† LANDING ASSEMBLY (modulok Ă¶sszerakĂˇsa)
	    â”‚   â”śâ”€â”€ robots.txt.ts        â† prerenderelt robots.txt
	    â”‚   â””â”€â”€ sitemap.xml.ts       â† prerenderelt sitemap.xml
	    â”‚
	    â”śâ”€â”€ utils/
	    â”‚   â””â”€â”€ withBase.ts          â† base-path kompatibilis URL helper
	    â””â”€â”€ styles/
	        â”śâ”€â”€ global.css            â† @import tokens.css + globĂˇlis stĂ­lusok
	        â””â”€â”€ tokens.css            â† [GENERĂLT] ne szerkeszd kĂ©zzel
```

---

## 11. NPM SCRIPTS REFERENCIA

```bash
npm run dev             # tokens:build + astro dev (http://localhost:4321)
npm run build           # tokens:build + astro build (dist/ mappĂˇba)
npm run preview         # astro preview (dist/ elĹ‘nĂ©zet)
npm run tokens:build    # brand.seed.json â†’ tokens.css generĂˇlĂˇs
npm run init:client     # client.config.ts â†’ locale + seed + assets mappa
```

---

## 12. HIBAELHĂRĂŤTĂS Ă‰S ISMERT EDGE CASE-EK

### "Cannot find module 'tokens.css'"
MegoldĂˇs: `npm run tokens:build` â€” a fĂˇjl nincs legenerĂˇlva

### "Schema validation error: hero"
MegoldĂˇs: NĂ©zd meg a `src/locales/hu/hero.json`-t, valamelyik mezĹ‘ hiĂˇnyzik vagy rossz tĂ­pus.
Dev mĂłdban pontosan megmutatja melyik mezĹ‘ a hibĂˇs.

### Wiring engine ĂĽres navItems-t ad vissza
Ok: Egyik aktĂ­v modulnak sincs `navItem` capability-je.
MegoldĂˇs: EllenĹ‘rizd a manifesteket, vagy adj explicit menu_items-t a navigation.json-ban.

### Hero CTA "/" (home) fallbackel
Ok: Nincs `ctaTarget` capability-vel rendelkezĹ‘ aktĂ­v modul, es nincs explicit Hero CTA override.
MegoldĂˇs: Adj explicit `heroCta` override-ot, vagy aktivĂˇlj egy CTA-celra alkalmas modult az uj klon projektben.

### getContent async import Astro build-ben nem mĹ±kĂ¶dik
Ok: Astro SSG build statikus elemzĂ©st vĂ©gez, dinamikus import pathok problĂ©mĂˇsak lehetnek.
MegoldĂˇs: CserĂ©ld a dynamic import-ot statikus importra a getContent.ts-ben,
Ă©s adjd Ăˇt a raw tartalmat paramĂ©terkĂ©nt a getData() hĂ­vĂˇsokban.

### Tailwind class nem Ă©rvĂ©nyes (szĂ­n nem jelenik meg)
Ok: Tailwind nem ismeri a CSS var-t purge fĂˇzisban.
MegoldĂˇs: EllenĹ‘rizd, hogy a tailwind.config.mjs-ben a szĂ­n `'var(--color-...)'` formĂˇban van-e megadva.

---

## 13. BĹVĂŤTĂ‰SI ĂšTMUTATĂ“ â€” ĂšJ MODUL HOZZĂADĂSA

### KĂ¶telezĹ‘ fĂˇjlok
```
src/modules/[key]/
  [Key].module.astro   â† UI komponens (Astro)
  manifest.ts          â† key, type, capabilities, contentKey, wiringHints
  schema.ts            â† Zod schema a locale JSON-hoz
  defaults.json        â† fallback Ă©rtĂ©kek (build soha ne tĂ¶rjĂ¶n)
  README.md            â† mit csinĂˇl, melyik locale kulcs, milyen wiring
```

### Locale fĂˇjl
```
src/locales/hu/[key].json   â† tartalom
```

### Registry regisztrĂˇciĂł (src/engine/registry.ts)
```typescript
import { [key]Manifest } from '../modules/[key]/manifest';
// REGISTRY-ben:
[key]: [key]Manifest,
```

### getContent loader (src/engine/content/getContent.ts)
```typescript
// localeMap-be:
'hu:[key]': () => import('../../locales/hu/[key].json'),
```

### Landing assembly (src/pages/index.astro)
```astro
import [Key] from '../modules/[key]/[Key].module.astro';
import { [key]Manifest } from '../modules/[key]/manifest';
import { [key]Schema } from '../modules/[key]/schema';
import [key]Defaults from '../modules/[key]/defaults.json';

// activeModules tĂ¶mbbe:
[key]Manifest,

// getContent:
const [key]Content = await getContent('[key]', lang, [key]Schema, [key]Defaults);

// RenderelĂ©s:
<[Key] [key]Config={[key]Content} />
```

---

## 14. RENDSZER ELVEK (NEM VĂLTOZHATNAK)

1. **Egyetlen forrĂˇshely** â€” design token: `brand.seed.json`. Tartalom: `locales/[lang]/*.json`. KĂłd: modulok.

2. **Komponens nem tud a tartalomrĂłl** â€” az .astro fĂˇjl csak props-ot fogad, nem importĂˇl locale fĂˇjlt kĂ¶zvetlenĂĽl.

3. **Schema vĂ©di a buildet** â€” hiĂˇnyzĂł vagy hibĂˇs tartalom esetĂ©n fallback, nem crash.

4. **Wiring determinisztikus** â€” ugyanazok az aktĂ­v modulok â†’ mindig ugyanaz az eredmĂ©ny. VĂ©letlen, session-fĂĽggĹ‘, futĂˇs-idĹ‘ alatti nem-determinizmus tilos.

5. **Hardcode szĂ­n/mĂ©ret tilos komponensben** â€” csak CSS var token hivatkozĂˇs.

6. **client.config.ts nem kerĂĽl a buildbe** â€” csak seed, amit a script feldolgoz.

7. **Core UI ne vĂˇltozzon kontroll nĂ©lkĂĽl** â€” a 3 aktiv core modul .astro fĂˇjljĂˇnak UI vĂˇltoztatĂˇsa csak deliberĂˇlt dĂ¶ntĂ©ssel, CHANGELOG-ba dokumentĂˇlva.

---

## 15. VERZIĂ“TĂ–RTĂ‰NET

| VerziĂł | DĂˇtum      | Mi vĂˇltozott                                          |
|--------|------------|-------------------------------------------------------|
| 2.4.2  | 2026-03-28 | Extended brand export tamogatas: legacy + extended token seed input, compile-olt runtime CSS valtozokkal |
| 2.4.1  | 2026-03-28 | Lean runtime cleanup: services/contact kivezetve az Alap masterbol, dokumentacio es wiring egyszerusitve |
| 2.4.0  | 2026-03-28 | Bovitett global visual skin contract: schema-validalt brand seed, component tokenek, core modulok megjelenesi retegenek jobb tokenizalasa |
| 2.3.1  | 2026-03-23 | Core cleanup: ideiglenes AI artefaktok, page.json contact legacy es torott legal placeholder linkek eltavolitva |
| 2.3.0  | 2026-03-23 | SEO/site-base infrastruktura, public assets pipeline, Hero mobil override tamogatas |
| 1.0.0  | 2026-02    | Kezdeti repo, kĂ­sĂ©rleti modulok                       |
| 2.0.0  | 2026-02-24 | Clean core rebuild: engine + registry + wiring + tokenek |
| 2.1.0  | 2026-02-24 | TudĂˇstĂˇr-kiterjesztĂ©s: operatĂ­v checklistek, guardrailok, karbantartĂˇsi protokoll |
| 2.1.4  | 2026-03-07 | Contact modul visszavezetve: services-alapu ajanlat panel + page.json alapu social orbit |
---

## 16. HA EZT AI-BA DOBOD â€” INSTRUKCIĂ“ AZ AI-NAK

Ha ezt a fĂˇjlt AI-ba dobod feladattal:

1. **Olvasd el az egĂ©sz fĂˇjlt** mielĹ‘tt bĂˇrmilyen kĂłdot Ă­rasz
2. **Tartsd be a "RENDSZER ELVEK" szekciĂłt** (14. fejezet) â€” ezek nem tĂˇrgyalhatĂłk
3. **MielĹ‘tt UI-t vĂˇltoztatsz**, kĂ©rdezz rĂˇ â€” a core modulok UI-ja szĂˇndĂ©kos dĂ¶ntĂ©s
4. **Ha bĹ‘vĂ­tesz**, kĂ¶vesd a 13. fejezet bĹ‘vĂ­tĂ©si ĂştmutatĂłjĂˇt
5. **Ha tunĂ©rolsz**, kĂ¶vesd az adott szekciĂłban a "âśŹď¸Ź TUNING" blokkokat
6. **FrissĂ­tsd ezt a fĂˇjlt** ha lĂ©nyeges vĂˇltozĂˇst vĂ©gzel â€” ez az igazsĂˇg forrĂˇsa
7. **Build green kell legyen** â€” `npm run build` hibamentesen kell fusson

---

## 17. KANONIKUS TUDĂSTĂR SZABĂLY

Ez a fĂˇjl a rendszer **kanonikus tudĂˇstĂˇra**.
Minden jĂ¶vĹ‘beli fejlesztĂ©snĂ©l innen kell kiindulni.

KĂ¶telezĹ‘ hozzĂˇfĂ©rĂ©si Ăştvonal:
- `AIMENTOOL_SYSTEM_XRAY.md` (repo gyĂ¶kĂ©r)

MĹ±kĂ¶dĂ©si szabĂˇly:
1. MĂłdosĂ­tĂˇs elĹ‘tt olvasd el a 14. fejezetet (nem vĂˇltoztathatĂł elvek).
2. MĂłdosĂ­tĂˇs utĂˇn frissĂ­tsd:
   - verziĂłtĂ¶rtĂ©net (15. fejezet),
   - Ă©rintett architektĂşra rĂ©szt,
   - tuning/hibaelhĂˇrĂ­tĂˇs blokkot, ha Ăşj edge case lett.
3. Ezt a fĂˇjlt Ă©s a `CHANGELOG.md`-t egyĂĽtt kezeld.

---

## 18. GYORS OPERATĂŤV CHECKLIST (CODEx/AI INDĂŤTĂSHOZ)

Minden munkamenet elejĂ©n:
1. Olvasd el:
   - `AIMENTOOL_SYSTEM_XRAY.md`
   - `CHANGELOG.md`
   - `src/pages/index.astro`
2. EllenĹ‘rizd az aktĂ­v core modulokat:
   - navbar, hero, footer
3. EllenĹ‘rizd a pipeline-t:
   - `getContent()` -> schema -> defaults -> component props
4. Futtasd legalĂˇbb:
   - `npm run tokens:build`
   - `npm run build`

Munkamenet vĂ©gĂ©n:
1. `npx astro check` (0 error kĂ¶telezĹ‘)
2. `npm run build` (green kĂ¶telezĹ‘)
3. FrissĂ­tsd a doksit, ha a rendszerlogika vĂˇltozott.

---

## 19. AKTUĂLIS RENDSZERĂLLAPOT (GYORS X-RAY SNAPSHOT)

AktĂ­v assembly az `Alap/` indexben:
- Navbar
- Hero
- Footer

Repo-szinten kivezetett extension modulok:
- Services
- Contact

Core-bĂłl kivĂ©ve:
- Info modul

Nyelvi ĂĽzemmĂłd:
- Jelenleg `hu` (single language core assembly)

Wiring cĂ©l:
- Hero CTA fallback lĂˇnc: `primaryCta` -> `elso anchor` -> `/`


SEO/site infra:
- `site.config.mjs` a canonical, robots es sitemap kozos forrasa
- `withBase()` helperrel a belso linkek es assetek base-path kompatibilisek
- `initClient` az ugyfel asseteket a `public/assets/clients/[clientId]/` mappaba kesziti

---

## 20. KĂ–TELEZĹ VERIFIKĂCIĂ“S PARANCSOK

Standard sorrend:
```bash
npm install
npm run tokens:build
npx astro check
npm run build
```

Dev ellenĹ‘rzĂ©s:
```bash
npm run dev
```

MegjegyzĂ©s:
- Ha a 4321 foglalt, Astro automatikusan mĂˇsik portra Ăˇll (`4322`, `4323`, ...).
- Ez nem hiba, csak port konfliktus.

---

## 21. NEM ALKUKĂ‰PES GUARDRAILOK (IMPLEMENTĂCIĂ“S SZINTEN)

1. `src/modules/*/*.module.astro` UI vizuĂˇlis szerkezetĂ©t csak tudatos dĂ¶ntĂ©ssel vĂˇltoztasd.
2. Hardcode hex szĂ­n komponensben kerĂĽlendĹ‘; token-alapĂş hivatkozĂˇs preferĂˇlt.
3. Ăšj tartalommezĹ‘nĂ©l mindig egyĂĽtt frissĂ­tsd:
   - locale JSON
   - schema
   - defaults
   - renderelĂ©si logika
4. Ăšj modulnĂˇl mindig egyĂĽtt frissĂ­tsd:
   - manifest
   - registry
   - getContent map
   - index assembly
5. A build nem lehet â€śrĂ©szben jĂłâ€ť: vagy green, vagy nem kĂ©sz.

---

## 22. DOKUMENTUM KARBANTARTĂSI PROTOKOLL

Ha a rendszer vĂˇltozik:
1. Emeld a verziĂłt a fejlĂ©cben.
2. ĂŤrd be a verziĂłt a 15. fejezet tĂˇblĂˇjĂˇba.
3. Add hozzĂˇ:
   - mi vĂˇltozott technikailag,
   - mi vĂˇltozott workflow szinten,
   - milyen Ăşj hibakĂ©p vagy edge case jelent meg.
4. EllenĹ‘rizd, hogy a 10. fejezet file-tree mĂ©g valĂłs-e.

Ez a protokoll biztosĂ­tja, hogy a dokumentum ne â€śarchĂ­v szĂ¶vegâ€ť, hanem tĂ©nylegesen hasznĂˇlhatĂł, Ă©lĹ‘ tudĂˇstĂˇr maradjon.
