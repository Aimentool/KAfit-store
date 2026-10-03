# AIMentool Template (Alap)

## Tudastar

`AIMENTOOL_SYSTEM_XRAY.md` a kanonikus tudastar. Minden fejlesztes elott innen indulj.

## Master Template Policy

- Ez a `Alap/` mappa a master template.
- Uj weboldal mindig ennek klonozasaval indul uj celmappaba.
- Ugyfel-specifikus modositast ne az `Alap/` mappaban vegezz.
- A tovabbi modulok az uj klon projektbe epulnek be.

## Aktiv Core Runtime

- Az `Alap` aktiv landing assemblye jelenleg: `navbar`, `hero`, `footer`.
- A tovabbi modulok (`services`, `contact`, stb.) kulon klon projektben vagy `Core/` integracioval jonnek vissza.
- A token pipeline a legacy `brand.seed.json` mellett mar kozvetlen `ExtendedDesignTokenSeed` exportot is fogad.

## Clone New Project

```bash
xcopy /E /I Alap <uj-projekt-mappa>
cd <uj-projekt-mappa>
```

## Install

```bash
npm install
```

## Run (dev)

```bash
npm run dev
```

## Build

```bash
npm run build
```

## SEO es Deploy Alapok

- A canonical URL, `robots.txt` es `sitemap.xml` alapja a `site.config.mjs`.
- Build/deploy kozben a `SITE_URL` es opcionisan a `BASE_PATH` env felulirhatja az alapertelmezett publikus URL-eket.
- A belso linkek es asset hivatkozasok base-path kompatibilis helperen keresztul mennek.
