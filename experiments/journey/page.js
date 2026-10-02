// ---------- the page: the map is the site; a path draws down it as you scroll and the stops come alive ----------
const map = document.getElementById('map'), svg = document.getElementById('terrain');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const stages = [...document.querySelectorAll('.stage')];
function layout() {
  const narrow = innerWidth < 860;
  if (narrow) {
    const W = 520, s = 2.1, xs = [262, 268, 255, 268, 258, 264, 262];
    return { W, H: 7000, s, narrow, places: xs.map(x => ({ x, y: 0 })), text: xs.map(() => ({ left: 14, top: 0, width: 82 })) };
  }
  const W = 1000, s = 2.2;
  const pl = [[710, 360], [290, 1180], [710, 2000], [290, 2840], [710, 3660], [290, 4520], [500, 5240]];
  const H = 5600;
  return { W, H, s, narrow, places: pl.map(([x, y]) => ({ x, y })), text: pl.map(([x, y], i) => ({ left: i === 6 ? 34 : (x > 500 ? 7 : 55), top: (y + (i === 0 ? -250 : (i === 6 ? 60 : -150))) / H * 100, width: i === 6 ? 36 : 38 })) };
}
let L = null, trail = null, lens = null, dotsOnTrail = [], stopLen = [], head = null, headRing = null, total = 0, sceneObjs = [], placeGs = [];
function build() {
  L = layout();
  if (L.narrow) {
    const pxPerUnit = map.clientWidth / L.W;
    stages.forEach((st, i) => { st.style.left = L.text[i].left + '%'; st.style.width = L.text[i].width + '%'; });
    const hs = stages.map(st => st.offsetHeight / pxPerUnit);
    // a stop is about 250 units tall at this scale; copy sits below it
    const tops = []; let y = 40 + hs[0] + 60 + 120;
    L.places.forEach((p, i) => { p.y = Math.round(y); tops.push(i === 0 ? 40 : p.y + (i === 6 ? 80 : 230)); if (i < 6) y = tops[i] + hs[i] + 140 + 120; if (i === 0) y = p.y + 230 + 110 + 120; });
    L.H = Math.round(tops[6] + hs[6] + 180);
    L.text.forEach((t, i) => { t.top = tops[i] / L.H * 100; });
  }
  const { W, H: HH, s, places } = L;
  svg.replaceChildren(); for (const k in H) delete H[k]; sceneObjs = []; placeGs = [];
  svg.setAttribute('viewBox', `0 0 ${W} ${HH}`); svg.setAttribute('preserveAspectRatio', 'xMidYMin meet');
  const defs = el('defs', {}, svg);
  for (const [id, sp, r] of [['half', 1.05, .30], ['half2', .85, .33]]) { const p = el('pattern', { id, width: sp, height: sp, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs); el('circle', { cx: sp / 2, cy: sp / 2, r, fill: '#181818' }, p); }
  { const p = el('pattern', { id: 'stripe', width: 1.6, height: 1.6, patternUnits: 'userSpaceOnUse' }, defs); el('rect', { x: 0, y: 0, width: 1.6, height: .55, fill: '#181818' }, p); }
  const spacings = [17, 14.5, 12.5, 10.5, 9, 7.6, 6.4];
  spacings.forEach((sp, i) => { const p = el('pattern', { id: 'pb' + i, width: sp, height: sp, patternUnits: 'userSpaceOnUse' }, defs); el('circle', { cx: sp / 2, cy: sp / 2, r: L.narrow ? .95 : .75, fill: '#181818', opacity: .34 }, p); });
  const dense = el('pattern', { id: 'pdense', width: 3.6, height: 3.6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(30)' }, defs); el('circle', { cx: 1.8, cy: 1.8, r: .7, fill: '#181818', opacity: .3 }, dense);
  const rows = el('pattern', { id: 'prows', width: 9, height: 4.5, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(-6)' }, defs); el('circle', { cx: 2, cy: 2.2, r: .7, fill: '#181818', opacity: .32 }, rows); el('circle', { cx: 6.5, cy: 2.2, r: .7, fill: '#181818', opacity: .32 }, rows);
  const grid = el('pattern', { id: 'pgrid', width: 5.2, height: 5.2, patternUnits: 'userSpaceOnUse' }, defs); el('rect', { x: 1.3, y: 1.3, width: 2.4, height: 2.4, fill: '#181818', opacity: .22 }, grid);
  const ground = el('g', { class: 'stipple' }, svg), contours = el('g', {}, svg), trailL = el('g', {}, svg), placesL = el('g', {}, svg), lifeL = el('g', {}, svg);
  const nb = spacings.length; for (let i = 0; i < nb; i++) el('rect', { x: 0, y: Math.floor(i * HH / nb), width: W, height: Math.ceil(HH / nb) + 1, fill: `url(#pb${i})` }, ground);
  el('rect', { x: 0, y: HH - 620, width: W, height: 620, fill: 'url(#pgrid)' }, ground);
  const ry = places[0].y + Math.round(62 * s);
  el('path', { d: `M-10 ${ry} C ${W * .3} ${ry - 30} ${W * .6} ${ry + 40} ${W + 10} ${ry + 5} L ${W + 10} ${ry + 60} C ${W * .6} ${ry + 95} ${W * .3} ${ry + 25} -10 ${ry + 55} Z`, fill: 'url(#prows)', class: 'stipple' }, ground);
  seed = 5;
  for (let i = 0; i < 14; i++) { const y = 420 + rnd() * (HH - 1200); const side = rnd() < .5 ? -1 : 1; const px = places.reduce((a, p) => Math.abs(p.y - y) < Math.abs(a.y - y) ? p : a, places[0]).x; const x = clamp(px + side * (200 + rnd() * 220), 60, W - 60); el('ellipse', { cx: x, cy: y, rx: 50 + rnd() * 70, ry: 26 + rnd() * 30, fill: 'url(#pdense)', transform: `rotate(${(rnd() * 40 - 20).toFixed(1)} ${x} ${y})` }, ground); }
  for (let y = 560; y < HH - 700; y += 330) { let d = `M0 ${y}`; for (let x = 0; x <= W; x += 50) d += ` L${x} ${(y + Math.sin(x / 140 + y / 97) * 22 + Math.sin(x / 61 + y / 31) * 8).toFixed(1)}`; el('path', { d, class: 'contour' }, contours); }
  // the places
  const doors = [];
  places.forEach((p, i) => {
    const g = el('g', { class: 'place ahead', transform: `translate(${p.x} ${p.y}) scale(${s})`, 'data-place': i }, placesL); placeGs.push(g);
    seed = 11 + i; const sc = scene(g); SCENES[i].build(sc); sc.done(); sceneObjs.push(sc);
    const [dx, dy] = P([SCENES[i].door[0], SCENES[i].door[1], 0]); doors.push([p.x + dx * s, p.y + dy * s]);
  });
  // the trail: through the door of every place, winding, always descending
  const way = [];
  doors.forEach((d, i) => {
    if (i === 0) way.push([d[0] - 20, d[1] - 70]); way.push(d);
    if (i < doors.length - 1) {
      const nd = doors[i + 1];
      if (L.narrow) { way.push([36, d[1] + 150]); way.push([36, nd[1] - 260]); }
      else { const bend = (i % 2 ? -1 : 1) * 130; way.push([lerp(d[0], nd[0], .35) + bend, lerp(d[1], nd[1], .38)]); way.push([lerp(d[0], nd[0], .7) - bend * .7, lerp(d[1], nd[1], .72)]); }
    }
  });
  const last = way[way.length - 1]; if (L.narrow) { way.push([36, last[1] + 130]); way.push([36, HH - 20]); } else { way.push([last[0] - 130, last[1] + 90]); way.push([last[0] - 170, HH - 20]); }
  const catmull = (p) => { let d = `M${p[0][0]} ${p[0][1]}`; for (let i = 0; i < p.length - 1; i++) { const p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)]; d += ` C${r2(p1[0] + (p2[0] - p0[0]) / 6)} ${r2(p1[1] + (p2[1] - p0[1]) / 6)} ${r2(p2[0] - (p3[0] - p1[0]) / 6)} ${r2(p2[1] - (p3[1] - p1[1]) / 6)} ${r2(p2[0])} ${r2(p2[1])}`; } return d; };
  const d = catmull(way);
  el('path', { d, class: 'trail-clear' }, trailL); el('path', { d, class: 'trail-ahead' }, trailL);
  trail = el('path', { d, class: 'trail' }, trailL); const core = el('path', { d, class: 'trail-core' }, trailL);
  total = trail.getTotalLength();
  lens = []; let maxy = -1e9; for (let l = 0; l <= total; l += 2) { const q = trail.getPointAtLength(l); maxy = Math.max(maxy, q.y); lens.push([maxy, l]); }
  stopLen = places.map((p, i) => i === 0 ? 0 : lengthAtY(p.y - Math.round(35 * s)));
  dotsOnTrail = []; const dg = el('g', {}, trailL); for (let l = 8; l < total - 6; l += 11) { const q = trail.getPointAtLength(l); dotsOnTrail.push([l, el('circle', { cx: r2(q.x), cy: r2(q.y), r: 1.15, class: 'tdot' }, dg)]); }
  trail.style.strokeDasharray = `0 ${total + 10}`; core.style.strokeDasharray = `0 ${total + 10}`; trail._core = core;
  head = el('circle', { r: 4.2, class: 'head' }, lifeL); headRing = el('circle', { r: 8, class: 'head-ring' }, lifeL);
  stages.forEach((st, i) => { const t = L.text[i]; st.style.left = t.left + '%'; st.style.top = t.top + '%'; st.style.width = t.width + '%'; });
  const ruler = document.getElementById('ruler'); ruler.replaceChildren();
  [['Asking', 0], ['Automation', 2], ['Augmentation', 3], ['Agency', 5]].forEach(([w, i]) => { const sp = document.createElement('span'); sp.textContent = w; sp.dataset.stage = i; sp.style.top = (places[i].y / HH * 100) + '%'; ruler.appendChild(sp); });
  drawn = -1; onScroll();
}
// ---------- scroll: the focal line of the viewport is where the path's head is ----------
let drawn = -1, target = 0, raf = 0, current = -1;
const navLinks = [...document.querySelectorAll('[data-nav]')];
function lengthAtY(y) { let lo = 0, hi = lens.length - 1; if (y <= lens[0][0]) return 0; if (y >= lens[hi][0]) return lens[hi][1]; while (lo < hi) { const m = (lo + hi) >> 1; if (lens[m][0] < y) lo = m + 1; else hi = m; } return lens[lo][1]; }
function onScroll() {
  const r = map.getBoundingClientRect(); const pxPerUnit = r.width / L.W; const focal = innerHeight * (L.narrow ? .5 : .46);
  const yUnits = (focal - r.top) / pxPerUnit; target = clamp(lengthAtY(yUnits), 0, total);
  if (drawn < 0) drawn = target;
  if (!raf) raf = requestAnimationFrame(tick);
}
const arrived = [];
function tick() {
  raf = 0; drawn = reduce ? target : lerp(drawn, target, .12);
  const dl = clamp(drawn, 0, total);
  trail.style.strokeDasharray = `${r2(dl)} ${r2(total + 10)}`; trail._core.style.strokeDasharray = `${r2(Math.max(0, dl - 3))} ${r2(total + 10)}`;
  for (const [l, c] of dotsOnTrail) c.classList.toggle('lit', l <= dl);
  const q = trail.getPointAtLength(dl); head.setAttribute('cx', r2(q.x)); head.setAttribute('cy', r2(q.y)); headRing.setAttribute('cx', r2(q.x)); headRing.setAttribute('cy', r2(q.y));
  let cur = -1; stopLen.forEach((sl, i) => { const a = dl >= sl; arrived[i] = a; stages[i].classList.toggle('arrived', a); placeGs[i].classList.toggle('ahead', !a); if (a) cur = i; });
  if (cur !== current) { current = cur; navLinks.forEach(n => n.classList.toggle('on', +n.dataset.nav === cur)); document.querySelectorAll('.ruler span').forEach(sp => sp.classList.toggle('on', +sp.dataset.stage <= cur)); }
  if (Math.abs(drawn - target) > .05) raf = requestAnimationFrame(tick);
}
addEventListener('scroll', onScroll, { passive: true });
let rt = 0; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 150); });
// ---------- life: the stops the path has reached move, when they are on screen ----------
const t0 = performance.now(); let visible = [], lastVis = 0;
function life(now) {
  const t = (now - t0) / 1000;
  if (now - lastVis > 400) { lastVis = now; visible = placeGs.map((g, i) => { if (!arrived[i]) return false; const r = g.getBoundingClientRect(); return r.bottom > -100 && r.top < innerHeight + 100; }); }
  if (!reduce) sceneObjs.forEach((sc, i) => { if (!visible[i]) return; for (const F of sc.life) F.update(t); for (const m of sc.movers || []) { const off = ((t - (m.lag || 0)) * m.speed % m.len + m.len) % m.len; const [dx, dy] = P([m.dir[0] * off, m.dir[1] * off, 0]); const op = clamp(Math.min(off, m.len - off) / .6, 0, 1); for (const d of m.F.all) { d.g.setAttribute('transform', `translate(${dx} ${dy})`); d.g.style.opacity = op; } } });
  requestAnimationFrame(life);
}
// ---------- hover: the drawing and the copy light each other ----------
const card = document.getElementById('card'), cardCap = document.getElementById('cardCap'), cardText = document.getElementById('cardText');
const tapbar = document.getElementById('tapbar'), tapCap = document.getElementById('tapCap'), tapText = document.getElementById('tapText');
let hot = null, tapTimer = 0;
const litFor = (link, on) => { for (const g of H[link] || []) g.classList.toggle('hot', on); const li = document.querySelector(`.offers li[data-link="${link}"]`); if (li) li.classList.toggle('lit', on); };
function setHot(g, e) {
  if (hot && hot !== g) { hot.classList.remove('hot'); if (hot.dataset.link) litFor(hot.dataset.link, false); }
  hot = g;
  if (!g) { card.classList.remove('show'); tapbar.classList.remove('show'); return; }
  g.classList.add('hot'); if (g.dataset.link) litFor(g.dataset.link, true);
  if (e && e.pointerType === 'mouse') { const r = map.getBoundingClientRect(); cardCap.textContent = g.dataset.cap; cardText.textContent = g.dataset.hover; card.style.left = (e.clientX - r.left) + 'px'; card.style.top = (e.clientY - r.top) + 'px'; card.classList.add('show'); }
  else { tapCap.textContent = g.dataset.cap; tapText.textContent = g.dataset.hover; tapbar.classList.add('show'); clearTimeout(tapTimer); tapTimer = setTimeout(() => setHot(null), 4200); }
}
svg.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; const g = e.target.closest && e.target.closest('[data-hover]'); if (g !== hot) setHot(g, e); else if (g) { const r = map.getBoundingClientRect(); card.style.left = (e.clientX - r.left) + 'px'; card.style.top = (e.clientY - r.top) + 'px'; } });
svg.addEventListener('pointerleave', () => setHot(null));
svg.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') return; const g = e.target.closest && e.target.closest('[data-hover]'); setHot(g === hot ? null : g, e); });
addEventListener('scroll', () => { if (hot && card.classList.contains('show')) setHot(null); }, { passive: true });
document.addEventListener('pointerover', e => { const li = e.target.closest && e.target.closest('.offers li[data-link]'); if (li) litFor(li.dataset.link, true); });
document.addEventListener('pointerout', e => { const li = e.target.closest && e.target.closest('.offers li[data-link]'); if (li && !(hot && hot.dataset.link === li.dataset.link)) litFor(li.dataset.link, false); });
build(); requestAnimationFrame(life);
window.bfJourney = { go: i => stages[i].scrollIntoView({ behavior: 'smooth', block: 'center' }), layout: () => L, scenes: () => sceneObjs };
