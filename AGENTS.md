# AGENTS - AIMENTOOL OPERATIV SZABALY

1. Minden fejlesztesi feladat elott kotelezoen olvasd el: `AIMENTOOL_SYSTEM_XRAY.md`.
2. Ez a fajl a kanonikus tudastar; architektura- es workflow-dontesek elsodleges forrasa.
3. Ha a rendszerlogika valtozik, frissitsd egyutt:
   - `AIMENTOOL_SYSTEM_XRAY.md`
   - `CHANGELOG.md`
4. Build green kotelezo: `npm run tokens:build`, `npx astro check`, `npm run build`.
5. Minden munka elott kerdezd meg, melyik mappaban kell dolgozni. Ha ezt a user mar megadta, erositsd meg a celmappat.
6. A `Alap/` mappa a master sablon; uj weboldal mindig ennek klonozasaval indul egy uj celmappaba.
7. Az eredeti `Alap/` mappat ne hasznald ugyfel-specifikus fejlesztesre; az uj klonban dolgozz.
8. A tovabbi modulok az uj klon projektbe epulnek be; ujrahasznalhato shared elemek helye: `../Core/`.
