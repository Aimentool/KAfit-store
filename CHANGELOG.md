# CHANGELOG - Aimentool Master Template Clean Core Build

## [KAfit Store checkout] - 2026-10-06

### Hozzaadva
- A rendelés elküldéséhez külön, kötelező ÁSZF-elfogadás és az ÁSZF közvetlen megnyitási lehetősége került az összesítőbe; a beküldési folyamat az elfogadást ellenőrzi
- Az adatpontosságot megerősítő jelölőnégyzet jelzi a fizetési kötelezettséget, amely a rendelés gombján is egyértelműen szerepel
- A hozzájárulási jelölőnégyzetek hiba után is újrapróbálhatóvá teszik a beküldést, amikor a vásárló bejelöli az elfogadást
- `src/pages/index.astro` - kötelező számlázási cím került a termékkódok elé; a termékkód példája `C26110201` lett, a szállítási mód pedig a termékkódok után jelenik meg
- Házhozszállításnál kötelező megadni, hogy a szállítási cím megegyezik-e a számlázási címmel; eltérő cím esetén külön címmezők jelennek meg
- Csomagautomatánál az automata neve, települése, irányítószáma és pontos címe külön-külön kötelező mező
- `src/pages/index.astro` - GLS házhozszállítás és GLS/Foxpost csomagautomata választás díjakkal; automatánál külön kötelező mezők a névhez, településhez, irányítószámhoz és címhez
- A rendelési összesítő megjeleníti a kiválasztott szállítási és fizetési módot, valamint ezek díját; az utánvét díja 300 Ft, az utalás díjmentes
- Sikeres rendelésküldés után bezárható visszaigazoló ablak jelenik meg az utalási adatok és a termékelérhetőség e-mailes visszaigazolásáról

## [2.4.2] - 2026-03-28

### Hozzaadva
- `ExtendedDesignTokenSeed` tamogatas a token pipeline-ban: a runtime immar kozvetlenul tud generatorbol erkezo premium brand exportot fogadni schema szinten is

### Modositva
- `src/engine/theme/tokens/schema.ts` - legacy runtime seed + extended design seed union schema, compile/normalizalo reteggel
- `src/engine/theme/buildTokens.ts` - a flattenelo builder kebab-case CSS valtozokat general az uj mezokbol is (`surface.shadow` -> `--surface-shadow`, `spacing.containerMaxWidth` -> `--spacing-container-max-width`)
- `src/styles/global.css` - a heading tracking es transform mar tokenekbol is tud jonni (`font.tracking`, `font.headingTransform` derivalt valtozoi alapjan)

## [2.4.1] - 2026-03-28

### Torolve
- `src/modules/services/`, `src/modules/contact/`, `src/locales/hu/services.json`, `src/locales/hu/contact.json` - az aktiv `Alap` assemblyben nem hasznalt modulok es locale tartalmak kivezetve a master runtime-bol
- `HASZNALATI_UTASITAS.md`, `docs/` - nem szukseges handoff/builder workflow dokumentumok kiszedve a gyokerbol
- ures placeholder mappak (`public/assets/clients/my-client`, `src/assets/clients/my-client`, valamint egyeb ures engine/page konyvtarak) - sablonmaradvanyok eltavolitva

### Modositva
- `src/engine/registry.ts`, `src/engine/content/getContent.ts` - a runtime registry es locale loader az aktiv `navbar/hero/footer` magra egyszerusitve
- `src/engine/wiring/wire.ts` - a primary CTA fallback genericusabb lett, services-specifikus ag nelkul
- `README.md`, `AIMENTOOL_SYSTEM_XRAY.md` - a dokumentacio a letisztitott core szerkezethez igazitva

## [2.4.0] - 2026-03-28

### Hozzaadva
- `src/engine/theme/tokens/schema.ts` - kozponti Zod runtime schema az egyseges global visual skin contracthoz
- `brand.seed.json` kibovitve tipografia, status szinek, shadow, layout, border es `component.*` token csoportokkal

### Modositva
- `src/engine/theme/buildTokens.ts` - a token builder mar schema-validalt skin seedbol dolgozik
- `scripts/initClient.ts`, `client.config.ts` - az init pipeline az uj visual skin strukturat generalja
- `tailwind.config.mjs`, `src/styles/global.css` - bovitett token integracio (font ui/mono, type scale, line-height, shadow, layout)
- `src/modules/navbar/Navbar.module.astro`, `src/modules/footer/Footer.module.astro`, `src/modules/hero/Hero.module.astro`, `src/modules/contact/Contact.module.astro`, `src/modules/services/Services.module.astro`, `src/modules/services/layouts/three-pillars-flip.astro` - a core modulok megjelenesi retege jobban a global skin tokenekre lett kotve

## [2.3.1] - 2026-03-23

### Torolve
- `agent_context_dump.md`, `services-agent-brief.txt`, `scripts/export-notebooklm.ps1` - nem sablonhoz tartozo ideiglenes / AI workflow artefaktok
- `src/modules/contact/components/SocialOrbitIcon.astro`, `src/modules/contact/page-schema.ts`, `src/modules/contact/page-defaults.json`, `src/locales/hu/page.json` - a page.json alapu, korabbi contact social ag teljesen kivezetve

### Modositva
- `src/engine/content/getContent.ts` - a feleslegesse valt `page` content key eltavolitva
- `src/modules/contact/Contact.module.astro`, `src/modules/contact/schema.ts`, `src/modules/contact/defaults.json`, `src/modules/contact/README.md`, `src/locales/hu/contact.json` - contact fallbackek es dokumentacio generikus sablon allapotra tisztitva
- `src/modules/footer/defaults.json`, `src/locales/hu/footer.json` - nem letezo legal placeholder route-ok kiuritva, hogy a váz ne rendereljen torott linkeket
- `scripts/initClient.ts`, `client.config.ts` - a kliensgenerator mar nem termel vissza hardcoded legal placeholder linkeket; privacy/terms/cookie mezok opcionálisak
- `package.json`, `package-lock.json` - nem hasznalt dependency-k eltavolitva (`@tailwindcss/vite`, `lucide-react`, `react-dnd`, `react-dnd-html5-backend`)

## [2.3.0] - 2026-03-23

### Hozzaadva
- `site.config.mjs` - kozos site/base URL helper a canonical, robots es sitemap generalashoz
- `src/utils/withBase.ts` - kozos base-path helper a belso linkekhez es asset URL-ekhez
- `src/pages/robots.txt.ts` - buildkor generalodo robots.txt endpoint
- `src/pages/sitemap.xml.ts` - statikus Astro route-okbol generalodo sitemap.xml endpoint

### Modositva
- `astro.config.mjs` - a site/base feloldas kozponti helperre kerult
- `src/layouts/Layout.astro` - canonical, robots, Open Graph, Twitter es opcionis JSON-LD SEO head defaultok bekerultek
- `src/modules/navbar/Navbar.module.astro` - home link, menu linkek es logo assetek base-path kompatibilisse valtak
- `src/modules/hero/schema.ts` - mobil slot override schema kerult a Hero v2 ala
- `src/modules/hero/defaults.json` - responsive mobile slot fallback ag bekerult
- `src/modules/hero/Hero.module.astro` - base-path kompatibilis hero media/link kezeles, kulon mobil slot override es kulon mobil video asset tamogatas
- `src/modules/footer/Footer.module.astro` - kozos base helperre allt at a footer linkkezeles
- `scripts/initClient.ts` - a kliens asset pipeline `public/assets/clients/[clientId]` celmappat hasznal, legacy masolassal es `heromobile.mp4` detektalassal
- `docs/BUILD_FROM_ZERO.txt`, `HASZNALATI_UTASITAS.md`, `README.md` - az uj asset es SEO workflow-hoz igazitva

## [2.2.0] - 2026-03-10

### Modositva
- `src/modules/hero/schema.ts` - Hero v2 slot-alapu schema (overlay, transition, media source_desktop/source_mobile, slots struktura)
- `src/modules/hero/defaults.json` - Hero v2 default tartalom es konfiguracio
- `src/modules/hero/Hero.module.astro` - teljes uj Hero render engine (slotok, overlay/transition presetek, responsive media, countdown, social proof logos)
- `src/modules/hero/README.md` - Hero v2 dokumentacio
- `scripts/initClient.ts` - hero asset auto-detekcio (`hero.*`, `heromobile.*`, `hero-poster.*`, `partner-*`) es layered merge (`defaults < autodetect < client override`)
- `src/locales/hu/hero.json` - uj Hero v2 struktura
- `client.config.ts` - Hero override mezoek bovitese (`cta_link`, `badge`, `overlay`, `transition`)
- `src/styles/tokens.css` - token generator futtatva uj init/build utan

### Hozzaadva
- Master template workflow szabaly: uj weboldal inditas az `Alap/` klonozasaval, modulbovites az uj klon projektben
- Dokumentacios frissitesek az uj workflow-hoz (`AGENTS.md`, `README.md`, `HASZNALATI_UTASITAS.md`)

## [2.1.4] - 2026-03-07

### Hozzaadva
- src/modules/contact/Contact.module.astro - uj contact section (social orbit + services-alapu ajanlatpanel)
- src/modules/contact/components/SocialOrbitIcon.astro - icon renderer social kor elemekhez
- src/modules/contact/manifest.ts - contact modul wiring meta
- src/modules/contact/schema.ts - contact locale schema
- src/modules/contact/defaults.json - contact fallback tartalom
- src/modules/contact/page-schema.ts - page.json schema a social adatokhoz
- src/modules/contact/page-defaults.json - page social fallback adatok
- src/modules/contact/README.md - contact modul dokumentacio
- src/locales/hu/contact.json - contact locale tartalom
- src/locales/hu/page.json - fo page social icon+link forras

### Modositva
- src/pages/index.astro - contact modul es page/contact content bekotese
- src/engine/content/getContent.ts - uj `contact` es `page` content key tamogatas
- src/engine/registry.ts - contact manifest regisztracio
- src/modules/services/schema.ts - `contactBridge` mezovel bovitve
- src/modules/services/defaults.json - `contactBridge` fallback adatok
- src/locales/hu/services.json - `contactBridge` adatok a contact panelhez

## [2.1.3] - 2026-03-07

### Modositva
- src/modules/services/layouts/three-pillars-flip.astro - desktop flip interakcio stabilizalva (kattintas alapu toggles + mouse drag tiltasa a swipe layeren)
- src/modules/services/layouts/three-pillars-flip.astro - pulzalo hatterpontok eltavolitva (markup + CSS animacio)
- src/modules/services/layouts/three-pillars-flip.astro - mobilon a fo oszlopkartyak egymas ala rendezve
- src/modules/services/layouts/three-pillars-flip.astro - details oldali alkartya tartalom gorgethetove teve overflow eseten

## [2.1.2] - 2026-03-03

### Hozzaadva
- Core/modules/services-pillar-slider-legacy/ - a korabbi active services module archivalt masolata
- src/modules/services/components/ServiceGlyph.astro - dependencymentes ikonkeszlet az uj services UI-hoz
- src/modules/services/normalize.ts - legacy es 2026-os services shape kozos normalizaloja
- src/modules/services/layouts/three-pillars-flip.astro - uj pillar layout desktop es mobil interakciokkal

### Modositva
- src/modules/services/Services.module.astro - a core `services-pillars-2026` wrapperre cserelve
- src/modules/services/schema.ts - bovitett 2026-os services shape-re igaztiva
- src/modules/services/defaults.json - az uj pillar layout fallback tartalmara cserelve
- src/modules/services/manifest.ts - valtozatlan `services` rendszerkulccsal az uj UI mogott
- src/modules/services/README.md - az aktiv modul dokumentacioja frissitve
- src/pages/index.astro - az uj services propsokhoz es egyedi `#services` section rendereleshez igaztiva

## [2.1.1] - 2026-03-02

### Hozzaadva
- ../Core/README.md - workspace-szintu shared gyujtomappa a moduloknak, layoutoknak es egyeb ujrahasznalhato elemeknek

### Modositva
- AIMENTOOL_SYSTEM_XRAY.md - kotelezo munkamappa-egyeztetes es a workspace Core konvencio rogzitve
- AGENTS.md - operativ szabaly bovitve a munkamappa-kerdezessel es a Core mappa hasznalataval

## [2.0.0] - 2026-02-24

### Torolve
- src/engine/modules/contact/ - contact modul kikerul a core-bol
- src/modules/contact/ - contact UI torolve
- src/engine/layouts/ - regi layout engine
- src/engine/section/ - regi section engine
- src/components/section/ - regi section komponens
- src/engine/localeLoader.ts - helyette getContent.ts
- src/config/ - teljes mappa, tartalom szetkoltozott locale + token fajlokba

### Hozzaadva
- src/engine/types.ts - ModuleManifest, ModuleCapability tipusok
- src/engine/registry.ts - kozponti REGISTRY
- src/engine/content/getContent.ts - schema validacios content getter
- src/engine/theme/tokens/brand.seed.json - egyetlen token forras
- src/engine/theme/buildTokens.ts - seed -> tokens.css generator
- src/styles/tokens.css - generalt CSS variables
- src/engine/wiring/types.ts - wiring tipusok
- src/engine/wiring/rules.ts - CTA prioritas szabalyok
- src/engine/wiring/wire.ts - auto-wiring engine
- src/modules/navbar/manifest.ts + schema.ts + defaults.json + README.md
- src/modules/hero/manifest.ts + schema.ts + defaults.json + README.md
- src/modules/services/manifest.ts + schema.ts + defaults.json + README.md
- src/modules/footer/manifest.ts + schema.ts + defaults.json + README.md
- scripts/initClient.ts - client.config.ts -> locale/token generator
- client.config.ts - ugyfel indulo template
- docs/BUILD_FROM_ZERO.txt
- docs/MODULE_BUILD_RULEBOOK.txt
- HASZNALATI_UTASITAS.md

### Modositva
- src/pages/index.astro - wiring + getContent integracio
- src/layouts/Layout.astro - egyszerusitve
- src/styles/global.css - tokens.css import + token aliasok
- tailwind.config.mjs - CSS variable alapu token integracio
- package.json - uj scripts: tokens:build, init:client
- src/modules/footer/Footer.module.astro - hardcode fallbackek tokenizalva
- src/modules/services/Services.module.astro - section engine fugges eltavolitva
- src/locales/hu/navigation.json - config+content egyesitve
- src/locales/hu/hero.json - hero hatterszin tokenre allitva
- src/locales/hu/footer.json - uj schemahoz igazitva

### Megtartva (valtozatlan UI)
- Navbar.module.astro UI
- Hero.module.astro UI
- Services.module.astro UI + layouts/
- Footer.module.astro UI (csak token fallback javitas)
- public/ assets

### Architekturális dontesek
- Hero CTA fallback: wiring primary CTA -> #services -> /
- Contact modul nem core, csak ugyfelprojektben adhato hozza
- brand.seed.json az egyetlen design token forras
- client.config.ts gitignore-ban marad az ugyfeladatok vedelme miatt
