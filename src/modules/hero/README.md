# Hero modul (v2)

## Mit csinal
Slot-alapu hero blokk media (image/video), overlay/transition presetekkel, szazalekos pozicionalassal es automatikus meretezessel.

## contentKey
`hero` -> `src/locales/hu/hero.json`

## Fo reszek
- `settings`: enabled, height, overlay, transition
- `media`: type, source_desktop/source_mobile, poster_image, partner_logos, video_settings
- `slots`: badge, title, subtitle, cta1, cta2, socialProof, countdown, scrollIndicator
- `theme.fonts`: heading/body token referenciak

## Capabilities
- Nincs direkt `navItem` vagy `ctaTarget` capability.

## Token hasznalat
- Hero minden szin/background beallitasa token alapu (`var(--color-...)`).
