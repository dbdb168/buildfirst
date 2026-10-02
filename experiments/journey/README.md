# The journey: an experiment, not the site

The map is the page. An ink path draws itself down the screen as you scroll, through seven stops that are the
stages of a visitor's AI journey, from asking to agency. The site's copy appears beside each stop when the path
arrives, and the stop comes alive: people type, point, write, walk.

- `kit.js` — a true-cube isometric world in metres: ink outlines, halftone shading, paper. Jointed figures posed by
  two-bone IK (typing, pointing, writing, raising a hand, stirring, walking), props, and a back-to-front depth sort.
- `scenes.js` — the seven stops, each a vignette of people doing the work.
- `page.js` — layout, the stippled ground, the path, scroll-driven drawing and arrival, hover, and the life loop.
- `part1.html` / `part2.html` — styles and the copy.
- `components.js` / `components-shell.html` — the component sheet: every pose, facing, hair and coat; every prop; the seven stops together.
- `build.py` — assembles `journey.html` and `journey-components.html` at the repo root (served on previews; `noindex`).

Inspired by moldandyeast's Falllinie (two inks, halftone, a rider that is a rig) and Chris Busse's dotscene
(author in tiles, project once, let paint order do the hiding).
