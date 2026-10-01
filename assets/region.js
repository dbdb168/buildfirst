/* BuildFirst — the region.
   Seven cities drawn in flat faces and dot screens on one isometric plane, a route between them,
   and a traveller that goes where the work is. Authored in grid coordinates (tiles east, tiles
   south, storeys up) and projected once; colour comes from roles, drawn as dot screens; corners
   are filleted by a round-joined stroke of each face's own paint. No dependencies.

   Borrowed, with thanks: the grid-and-faces model from Chris Busse's dotscene; the dot screens
   from RM's Falllinie; the slab, the chips and the softness from Airbnb's 3D floor plans.

   The copy in CITIES is placeholder: one way of working is illustrated per city so the drawing
   has a story, but every service is offered everywhere. Edit freely. */
(function () {
  'use strict';
  const root = document.querySelector('[data-region]');
  if (!root) return;
  const svg = root.querySelector('svg');
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- projection: tile 10, squash 0.5, one storey = 4 ----------
  const TILE = 10, SQ = .5, RISE = 4;
  const r2 = n => Math.round(n * 100) / 100;
  const P = ([x, y, z = 0]) => [r2((x - y) * TILE), r2((x + y) * TILE * SQ - z * RISE)];
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
  const pts = list => list.map(p => p.join(',')).join(' ');
  let seed = 7;
  const rnd = () => { seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  // ---------- the kit ----------
  const shape = () => ({ faces: [], lines: [], circles: [] });
  const merge = (...s) => ({ faces: s.flatMap(x => x.faces), lines: s.flatMap(x => x.lines), circles: s.flatMap(x => x.circles) });
  const move = (s, dx, dy, dz = 0) => ({ faces: s.faces.map(f => ({ pts: f.pts.map(([x, y, z]) => [x + dx, y + dy, z + dz]), cls: f.cls })), lines: s.lines.map(([a, b, c]) => [[a[0] + dx, a[1] + dy, a[2] + dz], [b[0] + dx, b[1] + dy, b[2] + dz], c]), circles: s.circles.map(([p, r, c]) => [[p[0] + dx, p[1] + dy, p[2] + dz], r, c]) });
  function box(x0, y0, x1, y1, h, base = 0, tone = '') {
    const s = shape(); const N = [x1, y1, base], E = [x1, y0, base], W = [x0, y1, base];
    const TF = [x0, y0, base + h], TE = [x1, y0, base + h], TN = [x1, y1, base + h], TW = [x0, y1, base + h];
    s.faces.push({ pts: [TF, TE, TN, TW], cls: 'f-roof' + tone }, { pts: [E, N, TN, TE], cls: 'f-east' + tone }, { pts: [N, W, TW, TN], cls: 'f-south' + tone });
    return s;
  }
  function gable(x0, y0, x1, y1, h, ridge = .5, base = 0, tone = '') {
    const s = box(x0, y0, x1, y1, h, base, tone); const along = (x1 - x0) >= (y1 - y0);
    const ym = (y0 + y1) / 2, xm = (x0 + x1) / 2, top = base + h + ridge;
    const A = along ? [x0, ym, top] : [xm, y0, top], B = along ? [x1, ym, top] : [xm, y1, top];
    const TF = [x0, y0, base + h], TE = [x1, y0, base + h], TN = [x1, y1, base + h], TW = [x0, y1, base + h];
    s.faces = s.faces.filter(f => !f.cls.startsWith('f-roof'));
    if (along) s.faces.push({ pts: [TF, TE, B, A], cls: 'f-roof' + tone }, { pts: [TW, TN, B, A], cls: 'f-east' + tone });
    else s.faces.push({ pts: [TF, TW, B, A], cls: 'f-roof' + tone }, { pts: [TE, TN, B, A], cls: 'f-east' + tone });
    return s;
  }
  function spire(x, y, z, half, tip, tone = '') {
    const s = shape(); const b = [x + half, y - half, z], c = [x + half, y + half, z], d = [x - half, y + half, z], t = [x, y, z + tip];
    s.faces.push({ pts: [b, c, t], cls: 'f-east' + tone }, { pts: [c, d, t], cls: 'f-south' + tone }); return s;
  }
  function prism(x, y, r, h, base = 0, n = 8, tone = '') {
    const s = shape(); const ring = z => Array.from({ length: n }, (_, i) => [x + r * Math.cos(i / n * Math.PI * 2 + Math.PI / 8), y + r * Math.sin(i / n * Math.PI * 2 + Math.PI / 8), z]);
    const lo = ring(base), hi = ring(base + h);
    const sides = lo.map((_, i) => ({ i, d: (lo[i][0] + lo[(i + 1) % n][0]) / 2 + (lo[i][1] + lo[(i + 1) % n][1]) / 2 })).sort((p, q) => p.d - q.d);
    for (const { i } of sides) { const j = (i + 1) % n; const facing = (lo[i][0] + lo[j][0]) / 2 - x > (lo[i][1] + lo[j][1]) / 2 - y ? 'f-east' : 'f-south'; s.faces.push({ pts: [lo[i], lo[j], hi[j], hi[i]], cls: facing + tone }); }
    s.faces.push({ pts: hi, cls: 'f-roof' + tone }); return s;
  }
  function dome(x, y, z, r, tone = '') { const s = prism(x, y, r, r * .9, z, 10, tone); s.circles.push([[x, y, z + r * .9], r * TILE * .9, 'f-dome' + tone]); return s; }
  function pad(x0, y0, x1, y1, z, cls) { const s = shape(); s.faces.push({ pts: [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], cls }); return s; }
  function poly(cells, cls, z = 0) { const s = shape(); s.faces.push({ pts: cells.map(([x, y]) => [x, y, z]), cls }); return s; }
  function line(cells, cls, z = 0) { const s = shape(); for (let i = 1; i < cells.length; i++) s.lines.push([[cells[i - 1][0], cells[i - 1][1], z], [cells[i][0], cells[i][1], z], cls]); return s; }
  function tree(x, y, h = .7, r = .3, z = 0) { const s = shape(); s.lines.push([[x, y, z], [x, y, z + h], 'ln-trunk']); s.circles.push([[x, y, z + h + .25], r * TILE, 'f-foliage']); return s; }
  /** A person: head, body, legs, arms. Poses: stand, sit, point, bend, raise. Facing +x unless flip. */
  function person(x, y, z, pose = 'stand', flip = false, tone = '') {
    const s = shape(); const H = .62, f = flip ? -1 : 1; const at = (dx, dz) => [x + dx * f, y, z + dz];
    const hip = pose === 'sit' ? .28 : .34, head = pose === 'bend' ? .5 : (pose === 'sit' ? .58 : H);
    const headAt = pose === 'bend' ? at(.12, head) : at(0, head), neckAt = pose === 'bend' ? at(.08, .48) : at(0, head - .1);
    s.circles.push([headAt, TILE * .085, 'f-person' + tone]);
    s.lines.push([neckAt, at(0, hip), 'ln-person' + tone]);
    if (pose === 'sit') { s.lines.push([at(0, hip), at(.14, hip), 'ln-person' + tone], [at(.14, hip), at(.14, 0), 'ln-person' + tone], [at(0, hip), at(-.06, 0), 'ln-person' + tone]); }
    else { s.lines.push([at(0, hip), at(.07, 0), 'ln-person' + tone], [at(0, hip), at(-.07, 0), 'ln-person' + tone]); }
    const sh = at(0, head - .16);
    if (pose === 'point') s.lines.push([sh, at(.26, head - .12), 'ln-person' + tone], [sh, at(-.08, hip + .05), 'ln-person' + tone]);
    else if (pose === 'raise') s.lines.push([sh, at(.14, head + .1), 'ln-person' + tone], [sh, at(-.1, hip + .05), 'ln-person' + tone]);
    else if (pose === 'bend') s.lines.push([at(.08, .46), at(.24, .22), 'ln-person' + tone], [at(.08, .46), at(.2, .2), 'ln-person' + tone]);
    else if (pose === 'sit') s.lines.push([sh, at(.18, hip + .08), 'ln-person' + tone]);
    else s.lines.push([sh, at(.1, hip + .03), 'ln-person' + tone], [sh, at(-.1, hip + .03), 'ln-person' + tone]);
    return s;
  }
  function draw(g, s) {
    for (const f of s.faces) el('polygon', { points: pts(f.pts.map(P)), class: f.cls }, g);
    for (const [p, r, cls] of s.circles) { const [cx, cy] = P(p); el('circle', { cx, cy, r: r2(r), class: cls }, g); }
    for (const [a, b, cls] of s.lines) { const [ax, ay] = P(a), [bx, by] = P(b); el('line', { x1: ax, y1: ay, x2: bx, y2: by, class: cls || '' }, g); }
    return g;
  }

  // ---------- the vignettes: one way of working, drawn small ----------
  const V = {
    coach: (x, y, z) => merge(pad(x - .55, y - .35, x + .55, y + .35, z, 'f-table'), person(x - .5, y + .05, z, 'sit', false), person(x + .5, y - .05, z, 'sit', true)),
    advisor: (x, y, z) => merge(box(x + .5, y - .5, x + .62, y + .5, .8, z, ' t-peri'), person(x + .15, y + .15, z, 'point', false), person(x - .45, y - .25, z, 'stand', false), person(x - .5, y + .35, z, 'stand', false)),
    builder: (x, y, z) => merge(pad(x - .6, y - .3, x + .6, y + .3, z, 'f-table'), box(x - .3, y - .15, x - .05, y + .1, .22, z, ' t-sage'), box(x + .1, y - .12, x + .38, y + .12, .3, z, ' t-lilac'), box(x + .15, y - .08, x + .33, y + .08, .22, z + .3, ' t-rose'), person(x - .1, y + .55, z, 'bend', false)),
    workshop: (x, y, z) => merge(pad(x - 1, y - .3, x + 1, y + .3, z, 'f-table'), person(x - .7, y - .55, z, 'sit', false), person(x - .2, y - .55, z, 'sit', false), person(x + .3, y - .55, z, 'sit', false), person(x - .5, y + .55, z, 'sit', true), person(x + .2, y + .55, z, 'sit', true), person(x + 1.25, y, z, 'raise', true)),
  };

  // ---------- the cities ----------
  // lon/lat place each slab; everything inside a city is authored in the slab's own tiles (0..w, 0..d).
  const CITIES = [
    { id: 'dc', name: 'Washington, DC', state: 'the Mid-Atlantic', lon: -77.04, lat: 38.91, role: 'Advisor', title: 'Advisory for the board’s AI question', copy: 'Boards and agencies are asking the AI question this year. We help leaders answer it with evidence from their own work, not from a vendor’s deck.', w: 5, d: 4, vignette: 'advisor', build: (k) => {
      k.water([[0, 2.6], [1.2, 3.1], [1.1, 4], [0, 4]]);
      k.park(1.1, 1.7, 4.4, 2.3); k.row(1.2, 1.0, 4.4, 1.4, .8, 'office', 5); k.row(1.2, 2.6, 4.4, 3.0, .8, 'office', 5);
      k.obelisk(1.95, 2.0, 2.6); k.capitol(4.55, 2.0, .9, .28); k.box(0.6, 1.8, 1.1, 2.2, .5); k.trees([[1.4, 1.55], [2.6, 1.55], [3.6, 1.55], [1.5, 2.45], [2.9, 2.45], [3.9, 2.45]]);
    } },
    { id: 'rva', name: 'Richmond, VA', state: 'home base', lon: -77.44, lat: 37.54, role: 'Coach', title: 'Founded here, a few blocks from the river', copy: 'Where BuildFirst started. Sherpa coaching for leaders, team workshops, and the AI Cookbook are all made here, on the fall line of the James.', w: 6, d: 4.5, home: true, vignette: 'coach', build: (k) => {
      k.water([[0, 2.2], [1.5, 2.6], [3, 2.9], [4.5, 3.3], [6, 3.6], [6, 4.4], [4.5, 4.1], [3, 3.8], [1.5, 3.5], [0, 3.1]]);
      k.rocks([[1.2, 2.95], [1.9, 3.05], [2.5, 3.3], [1.6, 3.25]]); k.island([[2.0, 3.1], [2.9, 3.0], [3.3, 3.35], [2.5, 3.55]]);
      k.bridge(3.6, 2.9, 3.6, 4.1, .5); k.capitol(3.3, 1.5, .7, .22); k.box(2.3, .6, 2.75, 1.05, 2.2); k.box(4.1, 2.3, 4.5, 2.7, 1.6); k.box(1.5, 1.2, 1.9, 1.6, 1.4);
      k.station(4.9, 2.6); k.gables(0.5, .7, 1.9, .3, 0); k.gables(4.3, 1.1, 5.7, .3, 0); k.hill(4.8, .4, 5.9, 1.4); k.trees([[.6, 1.6], [1.0, 1.9], [5.4, 1.7], [0.6, 3.75], [1.3, 4.1], [5.2, 4.3]]);
    } },
    { id: 'hr', name: 'Hampton Roads, VA', state: 'Norfolk and the beach', lon: -76.29, lat: 36.85, role: 'Workshops', title: 'Workshops for teams that need shared fluency fast', copy: 'Half-day and full-day sessions where a team builds real workflows together and leaves with skills it can use on Monday morning.', w: 5, d: 4, vignette: 'workshop', build: (k) => {
      k.water([[2.6, 0], [5, 0], [5, 4], [3.4, 4], [3.0, 3.0], [2.4, 2.0], [2.7, 1.0]]);
      k.beach([[3.4, 4], [5, 4], [5, 3.3], [3.6, 3.5]]); k.ship(3.9, 1.2, 1.3, .32); k.crane(2.35, .5); k.crane(2.45, 1.6); k.box(.4, .5, 1.6, 1.0, .6); k.box(.4, 1.4, 1.1, 1.9, .9); k.box(1.4, 1.5, 1.9, 2.0, 1.2);
      k.causeway([[2.5, 2.6], [3.6, 2.4], [4.6, 2.2]]); k.lighthouse(4.6, 3.6); k.trees([[.5, 2.6], [1.2, 3.0], [.6, 3.5], [1.8, 3.4]]);
    } },
    { id: 'ral', name: 'Raleigh, NC', state: 'the Triangle', lon: -78.64, lat: 35.78, role: 'Builder', title: 'Prototypes that prove a workflow before anyone buys a platform', copy: 'Sprints of two to four weeks: we diagnose the problem, build and test solutions with your team, and hand off with your people owning the result.', w: 5, d: 4, vignette: 'builder', build: (k) => {
      k.capitol(2.5, 1.9, .6, .2); k.box(1.3, .6, 1.7, 1.0, 2.4); k.box(3.3, .7, 3.75, 1.15, 1.7); k.box(3.2, 2.6, 4.4, 3.2, .7); k.box(.6, 2.5, 1.7, 3.1, .6); k.box(2.0, 3.0, 2.6, 3.5, .5);
      k.park(0.5, 1.4, 1.1, 2.2); k.trees([[.4, .5], [.9, .9], [4.4, .5], [4.7, 1.3], [1.2, 3.7], [3.8, 3.7], [2.1, 2.5], [4.5, 2.2], [.5, 3.6], [2.9, 3.8], [4.6, 3.4], [.8, 1.6]]);
    } },
    { id: 'clt', name: 'Charlotte, NC', state: 'uptown', lon: -80.84, lat: 35.23, role: 'Coach', title: 'Coaching for executives who run the organisation', copy: 'One-to-one Sherpa coaching, eight to ten weeks, built around your actual work: leave with workflows you use and a sharper instinct for where AI creates value.', w: 5, d: 4, vignette: 'coach', build: (k) => {
      k.crown(2.6, 1.6); k.box(1.7, .7, 2.2, 1.2, 3.4); k.box(3.3, 1.0, 3.8, 1.5, 2.6); k.box(1.4, 2.0, 1.9, 2.5, 2.2); k.box(3.1, 2.2, 3.5, 2.6, 1.9); k.box(2.3, 2.5, 2.8, 2.9, 1.4); k.box(.6, 1.0, 1.1, 1.5, 1.2);
      k.stadium(4.0, 3.2, .7); k.rail([[0, 3.6], [1.6, 3.4], [2.8, 3.3], [5, 2.9]]); k.trees([[.5, 2.5], [.6, 3.3], [4.5, .6], [4.6, 1.6]]);
    } },
    { id: 'col', name: 'Columbia, SC', state: 'the capital', lon: -81.03, lat: 34.00, role: 'Advisor', title: 'Fractional AI leadership, under one roof', copy: 'Embedded part-time AI leadership for organisations between a plan and a team: strategy, execution and team development, with someone who can both think and build.', w: 5, d: 4, vignette: 'advisor', build: (k) => {
      k.water([[0, 1.0], [.9, 1.3], [1.0, 2.6], [.7, 4], [0, 4]]);
      k.capitol(3.0, 1.2, .7, .26); k.horseshoe(2.2, 2.4); k.box(1.4, .6, 1.8, 1.0, 1.4); k.box(4.1, .8, 4.5, 1.2, 1.1); k.box(4.0, 3.2, 4.6, 3.7, .6);
      k.trees([[1.3, 1.6], [1.5, 3.6], [4.5, 2.2], [4.3, 1.9], [1.2, 2.3], [3.5, 3.8]]);
    } },
    { id: 'chs', name: 'Charleston, SC', state: 'the Holy City', lon: -79.93, lat: 32.78, role: 'Workshops and sprints', title: 'Offsites that end with something built', copy: 'Leadership offsites and sprints that finish with working tools and a plan your team owns, not a list of recommendations.', w: 5, d: 4, vignette: 'workshop', build: (k) => {
      k.water([[0, 0], [1.4, 0], [1.3, 1.6], [1.7, 3.2], [2.5, 4], [0, 4]]); k.water([[3.6, 0], [5, 0], [5, 4], [3.9, 4], [3.5, 2.6], [3.5, 1.2]]);
      k.rainbow(1.8, 2.9, 5); k.steeple(2.1, .7); k.steeple(2.9, 1.3); k.steeple(2.4, 2.1); k.box(2.6, .4, 3.2, .9, .7); k.box(1.6, 1.5, 2.0, 2.0, .6);
      k.cablebridge(3.3, .9, 4.9, .4); k.trees([[2.0, 3.5], [3.0, 3.4], [1.8, 1.1]]);
    } },
  ];
  const BEYOND = [['Baltimore', -76.61, 39.29], ['Asheville', -82.55, 35.60], ['Greenville', -82.39, 34.85], ['Savannah', -81.10, 32.08], ['Atlanta', -84.39, 33.75]];

  // map degrees to tiles, with north straight up on screen
  const LON0 = -79.0, LAT0 = 36.0, KE = 9, KN = 8;
  const geo = (lon, lat) => { const e = (lon - LON0) * Math.cos(LAT0 * Math.PI / 180) * KE, n = (lat - LAT0) * KN; return [(e - n) / Math.SQRT2, (-e - n) / Math.SQRT2]; };

  // ---------- building the drawing ----------
  const layers = { route: el('g', { class: 'rg-route' }, svg), ground: el('g', { class: 'rg-ground' }, svg), solids: el('g', { class: 'rg-solids' }, svg), life: el('g', { class: 'rg-life' }, svg) };
  const solids = [];
  const addSolid = (s, depth, cls = '') => { const g = el('g', { class: 'rg-solid ' + cls }); draw(g, s); solids.push({ g, depth }); return g; };
  const TH = 2.6; // slab thickness, screen units
  const ambient = [];

  function kitFor(c) {
    const ox = c.gx - c.w / 2, oy = c.gy - c.d / 2, X = x => x + ox, Y = y => y + oy;
    const put = (s, depth, cls) => addSolid(move(s, ox, oy), ox + oy + depth, cls);
    const ground = (s) => draw(c.ground, move(s, ox, oy));
    const k = {
      water: cells => ground(poly(cells, 'f-water', .02)),
      beach: cells => ground(poly(cells, 'f-beach', .03)),
      park: (x0, y0, x1, y1) => ground(pad(x0, y0, x1, y1, .03, 'f-park')),
      hill: (x0, y0, x1, y1) => ground(merge(pad(x0, y0, x1, y1, .35, 'f-hill'), poly([[x1, y0], [x1, y1], [x1, y1], [x1, y0]], 'f-east', 0), { faces: [{ pts: [[x1, y0, .35], [x1, y1, .35], [x1, y1, 0], [x1, y0, 0]], cls: 'f-hillside' }, { pts: [[x1, y1, .35], [x0, y1, .35], [x0, y1, 0], [x1, y1, 0]], cls: 'f-hillside' }], lines: [], circles: [] })),
      island: cells => ground(poly(cells, 'f-island', .04)),
      rocks: cells => { const s = shape(); for (const [x, y] of cells) s.circles.push([[x, y, .05], .9, 'f-rock']); ground(s); },
      box: (x0, y0, x1, y1, h, tone = '') => put(box(x0, y0, x1, y1, h, 0, tone), x1 + y1),
      row: (x0, y, x1, y1, h, kind, n) => { for (let i = 0; i < n; i++) { const a = x0 + (x1 - x0) * i / n + .05, b = x0 + (x1 - x0) * (i + 1) / n - .05; put(box(a, y, b, y1, h * (.8 + rnd() * .5)), b + y1); } },
      gables: (x0, y, x1, d, z) => { for (let x = x0; x < x1 - .2; x += .32) put(gable(x, y, x + .26, y + d * 2, .5 + rnd() * .2, .25, z), x + .26 + y + d * 2); },
      rainbow: (x0, y, n) => { const tones = [' t-sage', ' t-peri', ' t-lilac', ' t-rose', ' t-sage']; for (let i = 0; i < n; i++) put(gable(x0 + i * .34, y, x0 + i * .34 + .28, y + .5, .55, .22, 0, tones[i % tones.length]), x0 + i * .34 + .28 + y + .5); },
      capitol: (x, y, h, r) => put(merge(box(x - .45, y - .3, x + .45, y + .3, h), box(x - .3, y + .3, x + .3, y + .42, h * .8), dome(x, y, h, r)), x + .45 + y + .42),
      obelisk: (x, y, h) => put(merge(box(x - .07, y - .07, x + .07, y + .07, h), spire(x, y, h, .07, .25)), x + y + .1),
      station: (x, y) => put(merge(box(x - .2, y - .2, x + .2, y + .2, 1.5), spire(x, y, 1.5, .2, .4), box(x - .55, y + .2, x + .55, y + .45, .4)), x + .55 + y + .45),
      steeple: (x, y) => put(merge(box(x - .18, y - .2, x + .18, y + .2, .6), box(x - .1, y - .1, x + .1, y + .1, 1.1, .6), spire(x, y, 1.7, .1, .8)), x + .18 + y + .2),
      crown: (x, y) => put(merge(box(x - .28, y - .28, x + .28, y + .28, 4.4, 0, ' t-glass'), prism(x, y, .22, .35, 4.4, 8), prism(x, y, .14, .3, 4.75, 8), spire(x, y, 5.05, .08, .5)), x + .28 + y + .28),
      stadium: (x, y, r) => put(merge(prism(x, y, r, .45, 0, 10), { faces: [{ pts: Array.from({ length: 10 }, (_, i) => [x + r * .68 * Math.cos(i / 10 * Math.PI * 2 + Math.PI / 8), y + r * .68 * Math.sin(i / 10 * Math.PI * 2 + Math.PI / 8), .45]), cls: 'f-park' }], lines: [], circles: [] }), x + r + y + r),
      horseshoe: (x, y) => { ground(pad(x - .9, y - .5, x + .9, y + .7, .03, 'f-park')); put(box(x - 1.1, y - .6, x - .9, y + .7, .45), x - .9 + y + .7); put(box(x + .9, y - .6, x + 1.1, y + .7, .45), x + 1.1 + y + .7); put(box(x - .9, y - .75, x + .9, y - .55, .5), x + .9 + y - .55); },
      ship: (x, y, len, wid) => { const g = put(merge(poly([[x, y - wid / 2], [x + len, y - wid / 2], [x + len + .25, y], [x + len, y + wid / 2], [x, y + wid / 2], [x - .1, y]], 'f-hull', .04), box(x + .15, y - wid * .4, x + .45, y + wid * .4, .25, .08, ' t-peri'), box(x + len - .35, y - wid * .3, x + len - .1, y + wid * .3, .4, .08)), x + len + y + wid, 'rg-ship'); ambient.push({ g, kind: 'ship', ox, oy, x, y, len }); },
      crane: (x, y) => put(merge(box(x - .06, y - .06, x + .06, y + .06, 1.6), box(x - .06, y - .5, x + .06, y + .9, .12, 1.5), box(x - .1, y - .1, x + .1, y + .1, .3, 1.3, ' t-rose')), x + .1 + y + .9),
      lighthouse: (x, y) => put(merge(box(x - .09, y - .09, x + .09, y + .09, 1.0), prism(x, y, .11, .18, 1.0, 8, ' t-rose'), spire(x, y, 1.18, .11, .2)), x + y + .2),
      causeway: cells => { const s = line(cells, 'ln-bridge', .12); ground(s); for (const [x, y] of cells) ground({ faces: [], lines: [[[x, y, 0], [x, y, .12], 'ln-pier']], circles: [] }); },
      bridge: (x0, y0, x1, y1, z) => { const s = shape(); s.lines.push([[x0, y0, z], [x1, y1, z], 'ln-bridge'], [[x0, y0, 0], [x0, y0, z], 'ln-pier'], [[x1, y1, 0], [x1, y1, z], 'ln-pier'], [[(x0 + x1) / 2, (y0 + y1) / 2, 0], [(x0 + x1) / 2, (y0 + y1) / 2, z], 'ln-pier']); put(s, x1 + y1); },
      cablebridge: (x0, y0, x1, y1) => { const s = shape(); const z = .35; s.lines.push([[x0 - .3, y0 + .08, z], [x1 + .2, y1 - .05, z], 'ln-bridge']); for (const t of [.33, .66]) { const px = lerp(x0, x1, t), py = lerp(y0, y1, t); s.lines.push([[px, py, 0], [px, py, 1.3], 'ln-pier']); for (const u of [-.45, -.25, .25, .45]) s.lines.push([[px, py, 1.3], [px + u * (x1 - x0) * .6, py + u * (y1 - y0) * .6, z], 'ln-cable']); } put(s, x1 + y1); },
      rail: cells => { ground(line(cells, 'ln-rail', .03)); const g = put(box(0, -.12, .5, .12, .25, .03, ' t-lilac'), 0, 'rg-tram'); ambient.push({ g, kind: 'tram', ox, oy, cells }); },
      trees: cells => { for (const [x, y] of cells) put(tree(x, y, .55 + rnd() * .3, .22 + rnd() * .08, 0), x + y + .2, 'rg-tree'); },
      vignette: (name, x, y) => { ground(pad(x - 1.3, y - .8, x + 1.3, y + .8, .03, 'f-stage')); put(V[name](x, y, .03), x + 1.3 + y + .8, 'rg-vignette'); },
    };
    return k;
  }

  // slabs first, back to front; then every solid, back to front
  for (const c of CITIES) { [c.gx, c.gy] = geo(c.lon, c.lat); }
  const byDepth = CITIES.slice().sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));
  for (const c of byDepth) {
    const ox = c.gx - c.w / 2, oy = c.gy - c.d / 2;
    const F = P([ox, oy, 0]), E = P([ox + c.w, oy, 0]), N = P([ox + c.w, oy + c.d, 0]), W = P([ox, oy + c.d, 0]);
    c.ground = el('g', { class: 'rg-city' + (c.home ? ' rg-home' : ''), 'data-city': c.id }, layers.ground);
    el('polygon', { points: pts([[F[0], F[1] + TH + 4], [E[0] + 2, E[1] + TH + 4], [N[0], N[1] + TH + 4], [W[0] - 2, W[1] + TH + 4]]), class: 'f-shadow' }, c.ground);
    el('polygon', { points: pts([F, E, N, W]), class: 'f-plate' }, c.ground);
    el('polygon', { points: pts([E, N, [N[0], N[1] + TH], [E[0], E[1] + TH]]), class: 'f-slab' }, c.ground);
    el('polygon', { points: pts([N, W, [W[0], W[1] + TH], [N[0], N[1] + TH]]), class: 'f-slab' }, c.ground);
  }
  for (const c of CITIES) { const k = kitFor(c); c.build(k); const vx = c.id === 'rva' ? 2.2 : 2.5, vy = c.id === 'hr' ? 2.9 : (c.id === 'chs' ? 3.3 : 3.3); k.vignette(c.vignette, c.id === 'dc' ? 2.6 : vx, c.id === 'dc' ? 3.55 : (c.id === 'rva' ? 1.9 : c.id === 'ral' ? 3.55 : c.id === 'clt' ? .9 : c.id === 'col' ? 3.4 : vy)); }
  // beyond: rings where the work also goes
  for (const [name, lon, lat] of BEYOND) { const [gx, gy] = geo(lon, lat); const [cx, cy] = P([gx, gy, 0]); const g = el('g', { class: 'rg-beyond' }, layers.ground); el('ellipse', { cx, cy, rx: 7, ry: 3.5, class: 'f-beyond' }, g); el('ellipse', { cx, cy, rx: 2.4, ry: 1.2, class: 'f-beyond-core' }, g); const t = el('title', {}, g); t.textContent = name; }
  solids.sort((a, b) => a.depth - b.depth);
  for (const s of solids) layers.solids.appendChild(s.g);

  // the route: DC to Charleston by way of every city, and the traveller on it
  const ORDER = ['dc', 'rva', 'hr', 'ral', 'clt', 'col', 'chs'];
  const stops = ORDER.map(id => CITIES.find(c => c.id === id));
  const routePts = stops.map(c => [c.gx - c.w / 2 - .25, c.gy + c.d / 2 + .25]);
  draw(layers.route, line(routePts, 'ln-route', .06));
  const cum = [0]; for (let i = 1; i < routePts.length; i++) cum.push(cum[i - 1] + Math.hypot(routePts[i][0] - routePts[i - 1][0], routePts[i][1] - routePts[i - 1][1]));
  const routeAt = s => { s = clamp(s, 0, cum[cum.length - 1]); let i = 1; while (i < cum.length - 1 && cum[i] < s) i++; const t = (s - cum[i - 1]) / ((cum[i] - cum[i - 1]) || 1); return [lerp(routePts[i - 1][0], routePts[i][0], t), lerp(routePts[i - 1][1], routePts[i][1], t)]; };
  const traveller = el('g', { class: 'rg-traveller' }, layers.life);
  el('ellipse', { cx: 0, cy: 1.2, rx: 2.6, ry: 1.3, class: 'f-shadow' }, traveller);
  el('circle', { cx: 0, cy: -2.6, r: 2.7, class: 'f-traveller' }, traveller);
  el('circle', { cx: 0, cy: -2.6, r: 1, class: 'f-traveller-core' }, traveller);
  let tS = cum[1], tFrom = cum[1], tTo = cum[1], tT0 = 0, tDur = 1;
  const placeTraveller = () => { const [gx, gy] = routeAt(tS); const [sx, sy] = P([gx, gy, .25]); traveller.setAttribute('transform', `translate(${r2(sx)} ${r2(sy)})`); };

  // ---------- the camera: a centre and a width; the chips are shots ----------
  const cam = { x: 0, y: 0, w: 640 }; let tween = null;
  const bounds = (() => { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const c of CITIES) { const [x, y] = P([c.gx, c.gy, 0]); x0 = Math.min(x0, x - 62); x1 = Math.max(x1, x + 62); y0 = Math.min(y0, y - 52); y1 = Math.max(y1, y + 44); } return { x0, y0, x1, y1 }; })();
  const WIDE = { x: (bounds.x0 + bounds.x1) / 2, y: (bounds.y0 + bounds.y1) / 2 - 6, w: bounds.x1 - bounds.x0 };
  function setView() { const asp = svg.clientHeight / Math.max(1, svg.clientWidth); let w = cam.w, h = w * asp; if (h < (bounds.y1 - bounds.y0) && cam.wide) { h = bounds.y1 - bounds.y0 + 10; w = h / asp; } svg.setAttribute('viewBox', `${r2(cam.x - w / 2)} ${r2(cam.y - h / 2)} ${r2(w)} ${r2(h)}`); }
  function shotFor(c) { const narrow = svg.clientWidth < 520; if (!c) return { x: WIDE.x - WIDE.w * (narrow ? .04 : .07), y: WIDE.y + WIDE.w * (narrow ? .16 : .06), w: WIDE.w, wide: true }; const [x, y] = P([c.gx, c.gy, .7]); const w = 185, h = w * (svg.clientHeight / Math.max(1, svg.clientWidth)); return { x: x - w * .11, y: y + h * (narrow ? .2 : .13), w, wide: false }; }
  function goTo(index, instant) {
    const c = index < 0 ? null : stops[index];
    const to = shotFor(c);
    const sTo = index < 0 ? tS : cum[index];
    if (instant || reduce) { Object.assign(cam, to); tS = sTo; setView(); placeTraveller(); return; }
    tween = { from: { x: cam.x, y: cam.y, w: cam.w }, to, t0: performance.now(), dur: 1500 };
    tFrom = tS; tTo = sTo; tT0 = tween.t0; tDur = 1500;
    tick();
  }
  let raf = 0, last = performance.now(), visible = true;
  function tick() { if (!raf) raf = requestAnimationFrame(frame); }
  function frame(now) {
    raf = 0;
    const dt = Math.min(.1, (now - last) / 1000); last = now;
    let busy = false;
    if (tween) { const k = ease(clamp((now - tween.t0) / tween.dur, 0, 1)); cam.x = lerp(tween.from.x, tween.to.x, k); cam.y = lerp(tween.from.y, tween.to.y, k); cam.w = lerp(tween.from.w, tween.to.w, k); cam.wide = tween.to.wide && k > .5; setView(); if (k >= 1) { cam.wide = tween.to.wide; tween = null; setView(); } else busy = true; }
    if (tFrom !== tTo) { const k = ease(clamp((now - tT0) / tDur, 0, 1)); tS = lerp(tFrom, tTo, k); placeTraveller(); if (k >= 1) tFrom = tTo = tS; else busy = true; }
    if (!reduce && visible) { ambientStep(now / 1000); busy = true; }
    if (busy) tick();
  }
  function ambientStep(t) {
    for (const a of ambient) {
      if (a.kind === 'ship') { const u = (t * .06) % 1; const x = a.ox + a.x + Math.sin(u * Math.PI * 2) * .35, y = a.oy + a.y + Math.cos(u * Math.PI * 2) * .25; const [sx, sy] = P([x - a.x - a.ox, y - a.y - a.oy, 0]); a.g.setAttribute('transform', `translate(${r2(sx)} ${r2(sy)})`); }
      else if (a.kind === 'tram') { const n = a.cells.length - 1; const u = ((t * .12) % 2); const v = u < 1 ? u : 2 - u; const i = Math.min(n - 1, Math.floor(v * n)); const f = v * n - i; const x = lerp(a.cells[i][0], a.cells[i + 1][0], f), y = lerp(a.cells[i][1], a.cells[i + 1][1], f); const [sx, sy] = P([x + a.ox, y + a.oy, .03]); a.g.setAttribute('transform', `translate(${r2(sx)} ${r2(sy)})`); }
    }
  }

  // ---------- chips, caption, matrix ----------
  const chips = root.querySelector('[data-region-chips]'), caption = root.querySelector('[data-region-caption]'), matrix = root.querySelector('[data-region-matrix]');
  const capName = caption && caption.querySelector('[data-f="name"]'), capRole = caption && caption.querySelector('[data-f="role"]'), capTitle = caption && caption.querySelector('[data-f="title"]'), capCopy = caption && caption.querySelector('[data-f="copy"]'), capIndex = caption && caption.querySelector('[data-f="index"]');
  let current = 1, userTouched = 0, timer = 0;
  const BEYOND_COPY = { name: 'The region', role: 'Everywhere the work is', title: 'And Baltimore, Asheville, Greenville, Savannah and Atlanta', copy: 'Every service is offered across the Southeast and Mid-Atlantic. Most engagements mix in-person time with remote work, and the first conversation is always a call.' };
  function show(index, instant) {
    current = index;
    const c = index < 0 ? BEYOND_COPY : stops[index];
    if (caption) { caption.classList.add('is-changing'); setTimeout(() => { if (capName) capName.textContent = c.name; if (capRole) capRole.textContent = c.role; if (capTitle) capTitle.textContent = c.title; if (capCopy) capCopy.textContent = c.copy; if (capIndex) capIndex.textContent = index < 0 ? '—' : String(index + 1).padStart(2, '0') + ' / ' + String(stops.length).padStart(2, '0'); caption.classList.remove('is-changing'); }, instant ? 0 : 220); }
    if (chips) for (const b of chips.children) { const on = +b.dataset.index === index; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); }
    if (matrix) for (const m of matrix.children) { const i = +m.dataset.index; m.classList.toggle('on', i === index); m.classList.toggle('past', index >= 0 && i < index); }
    for (const city of CITIES) city.ground.classList.toggle('is-current', index >= 0 && city === stops[index]);
    goTo(index, instant);
  }
  if (chips) {
    const mk = (label, index) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'rg-chip'; b.textContent = label; b.dataset.index = index; b.setAttribute('role', 'tab'); b.addEventListener('click', () => { userTouched = performance.now(); show(index); }); chips.appendChild(b); };
    stops.forEach((c, i) => mk(c.name.replace(/,.*$/, ''), i)); mk('The region', -1);
  }
  if (matrix) { stops.forEach((c, i) => { const m = document.createElement('span'); m.className = 'rg-cell'; m.dataset.index = i; m.title = c.name; matrix.appendChild(m); }); }
  // auto-advance, gently: every eight seconds while on screen and untouched
  function schedule() { clearTimeout(timer); if (reduce) return; timer = setTimeout(() => { if (visible && performance.now() - userTouched > 20000 && !root.matches(':hover')) show(current < 0 ? 0 : (current + 1) % stops.length); schedule(); }, 8000); }
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { for (const e of es) { visible = e.isIntersecting; if (visible) { last = performance.now(); tick(); } } }).observe(svg);
  root.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { userTouched = performance.now(); show(current < 0 ? 0 : (current + 1) % stops.length); } else if (e.key === 'ArrowLeft') { userTouched = performance.now(); show(current <= 0 ? stops.length - 1 : current - 1); } });
  window.addEventListener('resize', setView);

  // boot: open on Richmond, the home base
  show(1, true);
  tick();
  schedule();
  window.buildfirstRegion = { show, cities: CITIES, stops };
})();
