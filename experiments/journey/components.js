// ---------- the component sheet: people and props on their own, then the stops where they meet ----------
const F = Q - .55;
const LIFE = [], MOVERS = [], TILES = [];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let PX = 3;
function tile(parent, label, build, px = PX, pad = 9) {
  const fig = document.createElement('figure'); const svg = el('svg', { class: 'terrain' }, fig); parent.appendChild(fig);
  const root = el('g', {}, svg); const S = scene(root); build(S); S.done();
  const b = root.getBBox(); const x0 = b.x - pad, y0 = b.y - pad, w = b.width + 2 * pad, h = b.height + 2 * pad;
  svg.setAttribute('viewBox', `${r2(x0)} ${r2(y0)} ${r2(w)} ${r2(h)}`); fig.dataset.w = w; fig.dataset.h = h; fig.dataset.px = px; svg.style.width = r2(w * px) + 'px';
  const cap = document.createElement('figcaption'); cap.textContent = label; fig.appendChild(cap);
  LIFE.push(...S.life); if (S.movers) for (const m of S.movers) MOVERS.push(m); TILES.push(fig);
  return S;
}
const grid = id => document.getElementById(id);
const person = (S, o) => S.fig(Object.assign({ at: [0, 0, 0], face: F, hair: 'short', coat: 'half', pants: 'ink' }, o));
// ---- people: poses
[
  ['Standing', {}], ['Pointing', { hands: { R: 'point' }, anim: 'point' }], ['Hand up', { hands: { R: 'raise' }, anim: 'raise' }],
  ['Talking', { hands: { L: 'talk', R: 'talk' }, anim: 'talk' }], ['Writing', { hands: { L: 'hip', R: 'write' }, anim: 'write' }],
  ['Thinking', { hands: { L: 'hip', R: 'chin' }, anim: 'nod', hair: 'curly', coat: 'ink', pants: 'paper' }], ['Arms crossed', { hands: { L: 'cross', R: 'cross' }, hair: 'tied' }],
  ['Hands on hips', { hands: { L: 'hip', R: 'hip' }, hair: 'bun', coat: 'stripe' }], ['Waving', { hands: { L: 'strap', R: 'wave' }, anim: 'wave', hair: 'long' }],
  ['Carrying a laptop', { hands: { L: 'carry' }, hair: 'cap', coat: 'paper' }], ['On the phone', { hands: { R: 'phone' }, hair: 'bald', coat: 'half2' }],
  ['Walking', { pose: 'walk', hands: { L: 'strap' }, hair: 'long', coat: 'half', pants: 'half2' }],
].forEach(([label, o]) => tile(grid('poses'), label, S => person(S, o)));
tile(grid('poses'), 'Seated, typing', S => { S.stool(0, 0, .46); person(S, { pose: 'sit', seat: .46, hands: { L: 'type', R: 'type' }, anim: 'type' }); });
tile(grid('poses'), 'Seated, laptop on knees', S => { S.stool(0, 0, .46); person(S, { pose: 'sit', seat: .46, hands: { L: 'lap', R: 'lap' }, anim: 'type', hair: 'bun', coat: 'paper' }); const { f } = frame(F); S.laptop(f[0] * .36, f[1] * .36, .52, F + Math.PI); });
tile(grid('poses'), 'Seated, with a mug', S => { S.stool(0, 0, .46); person(S, { pose: 'sit', seat: .46, hands: { L: 'mug', R: 'rest' }, hair: 'curly', coat: 'ink', pants: 'paper' }); });
tile(grid('poses'), 'Leaning on a bench', S => { const { f } = frame(F); S.table(f[0] * .75 - .6, f[1] * .75 - .4, 1.2, .8, .9); person(S, { lean: .22, hands: { L: { abs: [f[0] * .62 - .18, f[1] * .62 + .05, .95] }, R: { abs: [f[0] * .62 + .14, f[1] * .62 - .14, .95] } }, coat: 'paper' }); });
tile(grid('poses'), 'Stirring', S => { const { f } = frame(F); S.stove(f[0] * .9 - .65, f[1] * .9 - .35, 1.3, .7, .9); S.pot(f[0] * .78, f[1] * .78 + .05, .9, .15); person(S, { lean: .1, hands: { L: { abs: [f[0] * .7 - .45, f[1] * .7 + .1, .95] }, R: 'hold' }, anim: 'stir', hair: 'bun', coat: 'paper' }); });
tile(grid('poses'), 'A dog, sitting', S => S.dog(0, 0, F));
// ---- people: two builds, trousers or a skirt
tile(grid('builds'), 'Build A', S => person(S, { build: 'a', hair: 'short' }));
tile(grid('builds'), 'Build B', S => person(S, { build: 'b', hair: 'bob' }));
tile(grid('builds'), 'Build B, skirt', S => person(S, { build: 'b', hair: 'tied', skirt: true, hands: { R: 'point' }, anim: 'point' }));
tile(grid('builds'), 'Build B, dress', S => person(S, { build: 'b', hair: 'bun', coat: 'half2', skirt: 'half2', hands: { L: 'talk', R: 'talk' }, anim: 'talk' }));
tile(grid('builds'), 'Build A, skirt', S => person(S, { build: 'a', hair: 'curly', coat: 'ink', skirt: 'half2', pants: 'paper' }));
tile(grid('builds'), 'Seated, skirt', S => { S.stool(0, 0, .46); person(S, { build: 'b', pose: 'sit', seat: .46, hair: 'long', coat: 'stripe', skirt: 'ink', hands: { L: 'type', R: 'type' }, anim: 'type' }); });
tile(grid('builds'), 'Walking, skirt', S => person(S, { build: 'b', pose: 'walk', hair: 'bob', coat: 'paper', skirt: 'half2', hands: { L: 'strap' } }));
// ---- people: facings
for (let i = 0; i < 8; i++) tile(grid('facings'), `${i * 45}°`, S => person(S, { face: i * Math.PI / 4, hands: { R: 'point' } }));
// ---- people: hair and coats
['short', 'curly', 'bun', 'cap', 'bald', 'long', 'tied', 'bob'].forEach(h => tile(grid('hair'), h, S => person(S, { hair: h, build: ['bun', 'long', 'tied', 'bob'].includes(h) ? 'b' : 'a' })));
['ink', 'half', 'half2', 'stripe', 'paper'].forEach(c => tile(grid('coats'), `coat: ${c}`, S => person(S, { coat: c, hair: 'curly' })));
['ink', 'paper', 'half2'].forEach(p => tile(grid('coats'), `trousers: ${p}`, S => person(S, { pants: p, coat: 'half', hair: 'tied' })));
// ---- props
[
  ['Table', S => S.table(-.8, -.4, 1.6, .8, .74)], ['Round table', S => S.roundTable(0, 0, .5, .74)], ['Chair', S => S.chair(0, 0, F)], ['Stool', S => S.stool(0, 0, .46)], ['Bench', S => S.bench(0, 0, F, 1.6)],
  ['Laptop, open toward you', S => S.laptop(0, 0, 0, Q)], ['Laptop, from behind', S => S.laptop(0, 0, 0, Q + Math.PI)], ['Monitor', S => S.monitor(0, 0, 0, Q, .6, .36)], ['Mug', S => S.mug(0, 0, 0)], ['Books', S => S.books(0, 0, 0, 4, .2)], ['Laptop bag', S => S.bag(0, 0, Q)],
  ['Wall with a whiteboard', S => { S.wall(-1.8, -.15, 1.8, 0, 2.4, { south: 'paper' }); S.board(-1.4, 0, .9, 2.8, 1.1, 'x', { notes: [[.8, .78, 'shade2', .1], [.9, .78, 'ink', -.08], [.85, .6, 'ink', .05]] }); }],
  ['Easel', S => S.easel(0, 0, Q, 1.4, 1.3, { notes: [[.14, .74, 'shade2', .1], [.3, .74, 'ink', -.06], [.46, .74, 'shade2', .08], [.14, .5, 'ink', -.05]], lines: [[.1, .28, .5], [.1, .18, .7]], diagram: [.55, .12] })],
  ['Plant', S => S.plant(0, 0, .9)], ['Tree', S => S.tree(0, 0, 2.6, 1.1)], ['Lamp', S => S.lamp(0, 0, 2.5)], ['Signpost', S => S.signpost(0, 0, [{ z: 2.6, phi: 0 }, { z: 2.15, phi: Math.PI / 2 }, { z: 1.7, phi: 0 }])],
  ['Railing', S => S.rail(-1.2, 0, 1.2, 0, .95)], ['Stove, kettle and pot', S => { S.stove(-.65, -.35, 1.3, .7, .9); S.kettle(-.3, -.05, .9, -Math.PI / 2); S.pot(.3, .05, .9, .15); }], ['Counter', S => S.counter(-.7, -.3, 1.4, .6, .9)],
  ['Stairs', S => S.stairs(.8, 0, Math.PI, 7, 1.0, .225, .26)], ['Mezzanine', S => { S.platform(-1.4, -.9, 1.4, .9, 1.6); S.rail(-1.4, .9, 1.4, .9, .95, 1.6); S.rail(1.4, -.9, 1.4, .9, .95, 1.6); }],
  ['Flag', S => S.flag(0, 0, 2.6)], ['Cairn', S => S.cairn(0, 0)], ['Bike', S => S.bike(0, 0, .15)], ['Pegboard', S => { S.wall(-.15, -1.1, 0, 1.1, 2.4, { east: 'paper' }); S.pegboard(.01, -1.0, 1.0, 2.0, 1.0, 'y'); }],
  ['Window, rain', S => { S.wall(-.9, -.15, .9, 0, 2.2, { south: 'paper' }); S.window(-.6, 0, 1.0, 1.2, .85, 'x', { weather: 'rain' }); }], ['Window, sun', S => { S.wall(-.9, -.15, .9, 0, 2.2, { south: 'paper' }); S.window(-.6, 0, 1.0, 1.2, .85, 'x', { weather: 'sun' }); }],
  ['Seedlings on a sill', S => { S.box(-.8, -.25, .8, 0, .85, .92, { top: 'white', east: 'paper', south: 'shade' }); S.seedlings(-.6, -.15, .92, 4, 'x'); }], ['Shelf', S => S.shelf(-.65, -.18, 1.3, .35, 1.9, 3)],
].forEach(([label, b]) => tile(grid('propgrid'), label, b));
// ---- together: the seven stops
['The porch', 'The signpost', 'The coaching table', 'The team room', 'The hut', 'The organization', 'The cairn'].forEach((name, i) => tile(grid('stops'), `${i} · ${name}`, S => { seed = 11 + i; SCENES[i].build(S); }, 1.5, 14));
// ---- size and motion
function resize() { for (const f of TILES) { const k = +document.getElementById('size').value; f.querySelector('svg').style.width = r2(f.dataset.w * f.dataset.px * k) + 'px'; } }
document.getElementById('size').addEventListener('input', resize);
document.getElementById('halo').addEventListener('change', e => document.body.classList.toggle('nohalo', !e.target.checked));
const t0 = performance.now();
(function life(now) {
  const t = (now - t0) / 1000; const on = document.getElementById('motion').checked && !reduce;
  if (on) { for (const Fg of LIFE) Fg.update(t); for (const m of MOVERS) { const off = ((t - (m.lag || 0)) * m.speed % m.len + m.len) % m.len; const [dx, dy] = P([m.dir[0] * off, m.dir[1] * off, 0]); const op = clamp(Math.min(off, m.len - off) / .6, 0, 1); for (const d of m.F.all) { d.g.setAttribute('transform', `translate(${dx} ${dy})`); d.g.style.opacity = op; } } }
  requestAnimationFrame(life);
})(t0);
