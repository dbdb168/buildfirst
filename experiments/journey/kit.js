// ---------- the kit, v4: a true-cube isometric world in metres; ink outlines, halftone shading, paper ----------
// After Falllinie's rider: a body is capsules on a jointed skeleton, legs in dark ink, a jacket in halftone,
// head and hands in paper, every shape outlined. Light never becomes a gradient.
const NS = 'http://www.w3.org/2000/svg';
const T = 14, RISE = 15, OL = 0.035;
const r2 = n => Math.round(n * 100) / 100;
const P = ([x, y, z = 0]) => [r2((x - y) * T), r2((x + y) * T / 2 - z * RISE)];
const V = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k], madd: (a, b, k) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k],
  len: a => Math.hypot(a[0], a[1], a[2]), norm: a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; },
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], lerp: (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t],
};
const lerp = (a, b, t) => a + (b - a) * t, clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };
const pts = list => list.map(p => p.join(',')).join(' ');
let seed = 7; const rnd = () => { seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

// tones. People: ink, half (light halftone), half2 (dark halftone), stripe, paper. Props: white, paper, shade, shade2 (flat greys).
// The halftone is reserved for people, so a person never dissolves into a wall.
const OUT = { ink: 'paper', paper: 'ink', white: 'ink', half: 'ink', half2: 'ink', stripe: 'ink', shade: 'ink', shade2: 'ink' };
const PAT = t => t === 'half' || t === 'half2' || t === 'stripe';
function poly(g, cells, tone = 'paper', extra = {}) {
  const p = pts(cells.map(P));
  if (PAT(tone)) { el('polygon', { points: p, class: 'f-paper', ...extra }, g); return el('polygon', { points: p, class: 'f-' + tone + ' no', ...extra }, g); }
  return el('polygon', { points: p, class: 'f-' + tone, ...extra }, g);
}
// a capsule: a line with round caps, outlined in the opposite tone. Returns the lines so a figure can move them.
function capsule(g, a, b, w, tone = 'paper', halo = 0) {
  const [x1, y1] = P(a), [x2, y2] = P(b), lines = [];
  if (halo) lines.push(el('line', { x1, y1, x2, y2, class: 's-paper', style: `stroke-width:${r2((w + 2 * halo) * T)}` }, g));
  lines.push(el('line', { x1, y1, x2, y2, class: 's-' + OUT[tone], style: `stroke-width:${r2((w + 2 * OL) * T)}` }, g));
  if (PAT(tone)) lines.push(el('line', { x1, y1, x2, y2, class: 's-paper', style: `stroke-width:${r2(w * T)}` }, g));
  lines.push(el('line', { x1, y1, x2, y2, class: 's-' + tone, style: `stroke-width:${r2(w * T)}` }, g));
  return lines;
}
const moveCapsule = (lines, a, b) => { const [x1, y1] = P(a), [x2, y2] = P(b); for (const l of lines) { l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2); } };
function ball(g, p, r, tone = 'paper', halo = 0) { const [cx, cy] = P(p); const out = []; if (halo) out.push(el('circle', { cx, cy, r: r2((r + halo) * T), class: 'f-paper no' }, g)); if (PAT(tone)) { out.push(el('circle', { cx, cy, r: r2(r * T), class: 'f-paper' }, g)); out.push(el('circle', { cx, cy, r: r2(r * T), class: 'f-' + tone + ' no' }, g)); } else out.push(el('circle', { cx, cy, r: r2(r * T), class: 'f-' + tone }, g)); return halo ? out : out[out.length - 1]; }
const moveBall = (c, p) => { const [cx, cy] = P(p); for (const e of (Array.isArray(c) ? c : [c])) { e.setAttribute('cx', cx); e.setAttribute('cy', cy); } };
// a flat disc on the ground (or at height z): a circle of radius r in the plane projects to an ellipse
function disc(g, [x, y, z], r, tone = 'half', cls = '') { const [cx, cy] = P([x, y, z]); return el('ellipse', { cx, cy, rx: r2(r * T * 1.414), ry: r2(r * T * .707), class: 'f-' + tone + ' ' + cls }, g); }
function ring(z, cx, cy, r, n = 24, a0 = 0, a1 = Math.PI * 2) { const out = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; out.push([cx + r * Math.cos(a), cy + r * Math.sin(a), z]); } return out; }
function cylinder(g, cx, cy, r, z0, z1, t = {}) {
  // the visible side runs from the left extreme (135°) through the front (45°) to the right extreme (-45°)
  const top = ring(z1, cx, cy, r, 14, Math.PI * .75, -Math.PI * .25), bot = ring(z0, cx, cy, r, 14, Math.PI * .75, -Math.PI * .25);
  poly(g, [...top, ...bot.reverse()], t.side || 'shade');
  const [tx, ty] = P([cx, cy, z1]); el('ellipse', { cx: tx, cy: ty, rx: r2(r * T * 1.414), ry: r2(r * T * .707), class: 'f-' + (t.top || 'white') }, g);
}
function box(g, x0, y0, x1, y1, z0, z1, t = {}) {
  poly(g, [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], t.east || 'paper');
  poly(g, [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], t.south || 'shade');
  poly(g, [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], t.top || 'white');
}
// a rotated rectangle on the ground plane at height z: centre, half sizes along f (forward) and r (right)
const frame = phi => ({ f: [Math.cos(phi), Math.sin(phi), 0], r: [-Math.sin(phi), Math.cos(phi), 0], up: [0, 0, 1] });
function quad(c, phi, hf, hr, z) { const { f, r } = frame(phi); const C = [c[0], c[1], z]; return [V.madd(V.madd(C, f, -hf), r, -hr), V.madd(V.madd(C, f, hf), r, -hr), V.madd(V.madd(C, f, hf), r, hr), V.madd(V.madd(C, f, -hf), r, hr)]; }
function slab(g, c, phi, hf, hr, z0, z1, t = {}) {
  // a rotated box: the two visible sides are the ones facing the viewer (toward +x+y)
  const lo = quad(c, phi, hf, hr, z0), hi = quad(c, phi, hf, hr, z1);
  const faces = [0, 1, 2, 3].map(i => ({ i, j: (i + 1) % 4 })).map(({ i, j }) => { const m = V.lerp(lo[i], lo[j], .5); const n = [m[0] - c[0], m[1] - c[1], 0]; return { i, j, facing: n[0] + n[1] }; }).filter(s => s.facing > 0).sort((a, b) => a.facing - b.facing);
  faces.forEach(({ i, j }, k) => poly(g, [lo[i], lo[j], hi[j], hi[i]], k === 0 ? (t.east || 'paper') : (t.south || 'shade')));
  poly(g, hi, t.top || 'white');
}

const ln = (g, a, b, w = .45) => { const [x1, y1] = P(a), [x2, y2] = P(b); return el('line', { x1, y1, x2, y2, class: 'ln', style: `stroke-width:${w}` }, g); };
// an ellipse in 3D: centre c, half-axes u and v (vectors), as a polygon
const ellipse3 = (c, u, v, n = 14) => Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; return V.add(c, V.add(V.mul(u, Math.cos(a)), V.mul(v, Math.sin(a)))); });

// ---------- drawables and depth: things are sorted back to front by separating axis, then by x+y ----------
const drawable = (bb, key, cls) => ({ g: el('g', cls ? { class: cls } : {}), bb, key, name: cls || '' });
const bbOf = (list, pad = 0) => { const bb = [1e9, -1e9, 1e9, -1e9, 1e9, -1e9]; for (const p of list) { bb[0] = Math.min(bb[0], p[0] - pad); bb[1] = Math.max(bb[1], p[0] + pad); bb[2] = Math.min(bb[2], p[1] - pad); bb[3] = Math.max(bb[3], p[1] + pad); bb[4] = Math.min(bb[4], p[2] - pad); bb[5] = Math.max(bb[5], p[2] + pad); } return bb; };
function behind(A, B) { // -1: A behind B, 1: B behind A, 0: no separating axis
  const a = A.bb, b = B.bb, e = .012;
  if (a[1] <= b[0] + e) return -1; if (b[1] <= a[0] + e) return 1;
  if (a[3] <= b[2] + e) return -1; if (b[3] <= a[2] + e) return 1;
  if (a[5] <= b[4] + e) return -1; if (b[5] <= a[4] + e) return 1;
  return 0;
}
function screenBox(bb) { // the projected bounds of a 3D box
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  for (const x of [bb[0], bb[1]]) for (const y of [bb[2], bb[3]]) for (const z of [bb[4], bb[5]]) { const [sx, sy] = P([x, y, z]); x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy); }
  return [x0, x1, y0, y1];
}
function sortDraw(parent, items) {
  // an order constraint only matters between things that overlap on screen; between those a separating axis decides
  const n = items.length, before = Array.from({ length: n }, () => []), sb = items.map(d => screenBox(d.bb));
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const a = sb[i], b = sb[j]; if (a[1] < b[0] || b[1] < a[0] || a[3] < b[2] || b[3] < a[2]) continue;
    const s = behind(items[i], items[j]); if (s < 0) before[j].push(i); else if (s > 0) before[i].push(j);
  }
  const order = items.map((_, i) => i).sort((a, b) => items[a].key - items[b].key), state = new Array(n).fill(0), out = [];
  const cycles = []; const visit = i => { if (state[i] === 1) { cycles.push(i); return; } if (state[i]) return; state[i] = 1; const deps = before[i].slice().sort((a, b) => items[a].key - items[b].key); for (const d of deps) visit(d); state[i] = 2; out.push(i); };
  sortDraw.cycles = cycles; sortDraw.before = before;
  for (const i of order) visit(i);
  for (const i of out) parent.appendChild(items[i].g);
}

// ---------- the figure ----------
// o: at [x,y,z], face (radians, direction the chest faces), pose 'stand'|'sit'|'walk', seat (m), lean (rad),
//    hands {L, R}: a named gesture, [fwd, lat, up] from the shoulder in the body frame, or {abs:[x,y,z]}
//    coat 'half'|'half2'|'ink'|'paper', pants 'ink'|'paper'|'half2', hair 'short'|'curly'|'bun'|'cap'|'bald'|'long'|'tied'
//    anim: 'type'|'point'|'talk'|'write'|'stir'|'nod'|'walk'|'raise'|'idle', phase
const GEST = {
  hang: [.03, .05, -.57], type: [.36, .10, -.52], point: [.52, .06, .02], raise: [.10, .20, .46], write: [.44, .12, .22], mug: [.24, -.02, -.24],
  cross: [.17, -.12, -.22], hip: [.02, .15, -.47], talk: [.30, .16, -.30], strap: [.12, -.10, -.10], carry: [.12, .02, -.42], lap: [.26, .06, -.48],
  lean: [.30, .14, -.60], wave: [.16, .26, .40], phone: [.18, .06, .12], hold: [.34, .02, -.30], rest: [.28, .12, -.50], chin: [.14, .02, .02],
};
function ik(S, Tg, a, b, pole) {
  const d = V.sub(Tg, S), L = clamp(V.len(d), .05, a + b - .005), dn = V.mul(d, 1 / (V.len(d) || 1));
  const cosA = clamp((a * a + L * L - b * b) / (2 * a * L), -1, 1), sinA = Math.sqrt(1 - cosA * cosA);
  let pp = V.sub(pole, S); pp = V.sub(pp, V.mul(dn, V.dot(pp, dn))); const pn = V.len(pp) < 1e-4 ? [0, 0, 1] : V.mul(pp, 1 / V.len(pp));
  const E = V.add(S, V.add(V.mul(dn, a * cosA), V.mul(pn, a * sinA)));
  return { E, H: V.add(S, V.mul(dn, L)) };
}
const HALO = .06;
function figure(o) {
  const at = o.at, phi = o.face || 0, { f, r, up } = frame(phi), coat = o.coat || 'half', pants = o.pants || 'ink', hair = o.hair || 'short', ph = o.phase || 0;
  const sit = o.pose === 'sit', walk = o.pose === 'walk';
  const hands = Object.assign({ L: 'hang', R: 'hang' }, o.hands || {});
  const body = drawable(null, 0, 'fig'), arms = [drawable(null, 0, 'arm'), drawable(null, 0, 'arm')];
  const J = {};
  function solve(t) {
    const breathe = .006 * Math.sin(t * 1.6 + ph);
    const wph = t * 6.2 + ph; const bob = walk ? .018 * Math.abs(Math.cos(wph)) : 0;
    const hipZ = (sit ? (o.seat || .45) + .03 : .92) + bob;
    const lean = (o.lean || 0) + (sit ? .06 : 0);
    J.pelvis = V.madd(at, up, hipZ);
    J.chest = V.add(J.pelvis, V.add(V.mul(up, .46 * Math.cos(lean) + breathe), V.mul(f, .46 * Math.sin(lean))));
    let nodz = 0, nodf = 0; if (o.anim === 'nod') { nodz = -.018 * (.5 + .5 * Math.sin(t * 1.3 + ph)); nodf = .02 * (.5 + .5 * Math.sin(t * 1.3 + ph)); }
    J.head = V.add(J.chest, V.add(V.mul(up, .30 * Math.cos(lean) + nodz), V.mul(f, .30 * Math.sin(lean) + .03 + nodf)));
    J.neck = V.lerp(J.chest, J.head, .35);
    J.sh = [V.madd(V.madd(J.chest, r, -.19), up, -.02), V.madd(V.madd(J.chest, r, .19), up, -.02)];
    J.hip = [V.madd(J.pelvis, r, -.15), V.madd(J.pelvis, r, .15)];
    // legs
    J.knee = []; J.ankle = []; J.toe = [];
    for (let i = 0; i < 2; i++) {
      const side = i ? 1 : -1; let foot, pole;
      if (sit) { foot = V.madd(V.madd([at[0], at[1], at[2]], f, .40), r, side * .16); pole = V.madd(V.madd(J.hip[i], f, 1), up, .5); }
      else if (walk) { const sw = Math.sin(wph + i * Math.PI); foot = V.madd(V.madd([at[0], at[1], at[2] + Math.max(0, .09 * Math.sin(wph + i * Math.PI + .6))], f, .26 * sw), r, side * .13); pole = V.madd(V.madd(J.hip[i], f, 1), up, .3); }
      else { foot = V.madd(V.madd([at[0], at[1], at[2]], f, .03 + (o.stance ? o.stance[i] : 0)), r, side * .15); pole = V.madd(J.hip[i], f, 1); }
      const { E, H } = ik(J.hip[i], V.madd(foot, up, .05), .45, .44, pole); J.knee[i] = E; J.ankle[i] = H; J.toe[i] = V.madd(H, f, .22);
    }
    // arms
    J.elbow = []; J.hand = [];
    for (let i = 0; i < 2; i++) {
      const side = i ? 1 : -1, spec = hands[i ? 'R' : 'L']; let target;
      if (spec && spec.abs) target = spec.abs.slice();
      else { const g = (Array.isArray(spec) ? spec : GEST[spec] || GEST.hang).slice(); target = V.add(J.sh[i], V.add(V.add(V.mul(f, g[0]), V.mul(r, g[1] * side)), V.mul(up, g[2]))); }
      const a = o.anim;
      if (a === 'type' && (spec === 'type' || spec === 'lap')) target[2] += .022 * Math.max(0, Math.sin(t * 9 + i * Math.PI + ph));
      if (a === 'point' && spec === 'point') { target = V.madd(target, f, .04 * Math.sin(t * 1.7 + ph)); target[2] += .03 * Math.sin(t * 1.7 + ph + 1); }
      if (a === 'talk' && spec === 'talk') { target[2] += .05 * Math.sin(t * 2.2 + i * 1.3 + ph); target = V.madd(target, f, .03 * Math.sin(t * 1.7 + i + ph)); }
      if (a === 'write' && spec === 'write') { target = V.madd(target, r, .10 * Math.sin(t * 1.4 + ph)); target[2] += .04 * Math.sin(t * 2.8 + ph); }
      if (a === 'stir' && spec === 'hold') { target = V.madd(V.madd(target, f, .05 * Math.cos(t * 2.2 + ph)), r, .05 * Math.sin(t * 2.2 + ph)); }
      if (a === 'raise' && spec === 'raise') target[2] += .03 * Math.sin(t * 2 + ph);
      if (a === 'wave' && spec === 'wave') target = V.madd(target, r, .08 * Math.sin(t * 4 + ph));
      if (walk) { const sw = Math.sin(wph + i * Math.PI + Math.PI); target = V.madd(target, f, .16 * sw); }
      const pole = V.add(J.sh[i], V.add(V.add(V.mul(r, side * .7), V.mul(f, -.35)), V.mul(up, -.25)));
      const { E, H } = ik(J.sh[i], target, .30, .28, pole); J.elbow[i] = E; J.hand[i] = H;
    }
  }
  solve(0);
  // ---- draw: far leg, near leg, torso, far upper arm, near upper arm, neck, hair, head; forearms are their own drawables
  const depth = p => p[0] + p[1];
  const legOrder = depth(J.hip[0]) <= depth(J.hip[1]) ? [0, 1] : [1, 0], armOrder = depth(J.sh[0]) <= depth(J.sh[1]) ? [0, 1] : [1, 0];
  const E = {}; const g = body.g;
  E.leg = []; for (const i of legOrder) E.leg[i] = { thigh: capsule(g, J.hip[i], J.knee[i], .14, pants, HALO), shin: capsule(g, J.knee[i], J.ankle[i], .12, pants, HALO), foot: capsule(g, J.ankle[i], J.toe[i], .09, 'ink', HALO) };
  E.torsoA = capsule(g, J.pelvis, J.chest, .30, coat, HALO);
  E.torsoH = el('polygon', { points: pts([J.sh[0], J.sh[1], J.hip[1], J.hip[0]].map(P)), class: 'halo', style: `stroke-width:${r2(2 * HALO * T)}` }, g);
  E.torso = poly(g, [J.sh[0], J.sh[1], J.hip[1], J.hip[0]], coat, { 'stroke-linejoin': 'round' }); E.torsoU = PAT(coat) ? E.torso.previousSibling : null;
  E.upper = []; for (const i of armOrder) E.upper[i] = capsule(g, J.sh[i], J.elbow[i], .11, coat, HALO);
  E.neck = capsule(g, J.chest, J.neck, .09, 'paper', HALO);
  const back = V.mul(f, -.03);
  E.hair = null; E.hair2 = null;
  if (hair !== 'bald') E.hair = ball(g, V.add(V.madd(J.head, up, .03), back), hair === 'curly' ? .155 : .135, 'ink', HALO);
  if (hair === 'bun') E.hair2 = ball(g, V.add(V.madd(J.head, up, .06), V.mul(f, -.12)), .055, 'ink');
  if (hair === 'tied') E.hair2 = capsule(g, V.add(V.madd(J.head, up, -.02), V.mul(f, -.12)), V.add(V.madd(J.head, up, -.26), V.mul(f, -.14)), .06, 'ink');
  E.head = ball(g, J.head, .135, 'paper', hair === 'bald' ? HALO : 0);
  if (hair === 'cap') E.visor = capsule(g, V.add(V.madd(J.head, up, .06), V.mul(f, .10)), V.add(V.madd(J.head, up, .055), V.mul(f, .22)), .05, 'ink');
  if (hair === 'long') E.hair2 = capsule(g, V.add(V.madd(J.head, up, -.02), back), V.add(V.madd(J.chest, up, .12), V.mul(f, -.08)), .16, 'ink');
  if (hair === 'long') { g.insertBefore(E.hair2[0], E.torsoA[0]); g.insertBefore(E.hair2[1], E.torsoA[0]); }
  E.fore = []; E.hand = [];
  for (let i = 0; i < 2; i++) { const ag = arms[i].g; E.fore[i] = capsule(ag, J.elbow[i], J.hand[i], .10, coat, HALO); E.hand[i] = ball(ag, J.hand[i], .05, 'paper', HALO); }
  function bboxes() {
    body.bb = bbOf([J.pelvis, J.chest, J.head, ...J.hip, ...J.knee, ...J.ankle, ...J.toe, ...J.sh], .16); body.key = depth(J.pelvis) + (o.bias || 0);
    for (let i = 0; i < 2; i++) { arms[i].bb = bbOf([J.elbow[i], J.hand[i]], .07); const dh = depth(J.hand[i]) - depth(J.pelvis); arms[i].key = depth(J.pelvis) + (o.bias || 0) + (dh > -.02 ? .011 : -.011); }
  }
  bboxes();
  function update(t) {
    solve(t);
    for (let i = 0; i < 2; i++) { moveCapsule(E.leg[i].thigh, J.hip[i], J.knee[i]); moveCapsule(E.leg[i].shin, J.knee[i], J.ankle[i]); moveCapsule(E.leg[i].foot, J.ankle[i], J.toe[i]); moveCapsule(E.upper[i], J.sh[i], J.elbow[i]); moveCapsule(E.fore[i], J.elbow[i], J.hand[i]); moveBall(E.hand[i], J.hand[i]); }
    moveCapsule(E.torsoA, J.pelvis, J.chest); const tp = pts([J.sh[0], J.sh[1], J.hip[1], J.hip[0]].map(P)); E.torso.setAttribute('points', tp); E.torsoH.setAttribute('points', tp); if (E.torsoU) E.torsoU.setAttribute('points', tp);
    moveCapsule(E.neck, J.chest, J.neck); moveBall(E.head, J.head); if (E.hair) moveBall(E.hair, V.add(V.madd(J.head, up, .03), back));
    if (E.visor) moveCapsule(E.visor, V.add(V.madd(J.head, up, .06), V.mul(f, .10)), V.add(V.madd(J.head, up, .055), V.mul(f, .22)));
    if (E.hair2 && hair === 'bun') moveBall(E.hair2, V.add(V.madd(J.head, up, .06), V.mul(f, -.12)));
    if (E.hair2 && hair === 'tied') moveCapsule(E.hair2, V.add(V.madd(J.head, up, -.02), V.mul(f, -.12)), V.add(V.madd(J.head, up, -.26), V.mul(f, -.14)));
    if (E.hair2 && hair === 'long') moveCapsule(E.hair2, V.add(V.madd(J.head, up, -.02), back), V.add(V.madd(J.chest, up, .12), V.mul(f, -.08)));
  }
  return { body, arms, update, J, o, all: [body, ...arms] };
}

// ---------- a scene: a floor layer that never sorts, a list of things that do, and the figures that move ----------
function scene(g) {
  const floor = el('g', { class: 'floor' }, g), items = [], life = [];
  const add = d => { items.push(d); return d; };
  const S = { g, floor, items, life, add };
  S.shadow = (x, y, r = .30, tone = 'half') => disc(floor, [x, y, 0], r, tone, 'no shadow');
  S.pad = (cells, tone = 'paper') => poly(floor, cells, tone);
  S.shade = (x, y, r) => disc(floor, [x, y, 0], r, 'half', 'no shade');
  S.fig = o => { const F = figure(o); F.all.forEach(add); life.push(F); S.shadow(o.at[0], o.at[1], o.pose === 'sit' ? .26 : .30); return F; };
  S.box = (x0, y0, x1, y1, z0, z1, t = {}, key) => { const d = drawable([x0, x1, y0, y1, z0, z1], key ?? (x0 + x1 + y0 + y1) / 2); box(d.g, x0, y0, x1, y1, z0, z1, t); return add(d); };
  S.slab = (c, phi, hf, hr, z0, z1, t = {}) => { const q = quad(c, phi, hf, hr, z0); const bb = bbOf(q); bb[4] = z0; bb[5] = z1; const d = drawable(bb, c[0] + c[1]); slab(d.g, c, phi, hf, hr, z0, z1, t); return add(d); };
  S.cylinder = (cx, cy, r, z0, z1, t = {}) => { const d = drawable([cx - r, cx + r, cy - r, cy + r, z0, z1], cx + cy); cylinder(d.g, cx, cy, r, z0, z1, t); return add(d); };
  S.plane = (cells, tone, key) => { const bb = bbOf(cells, .01); const d = drawable(bb, key ?? (bb[0] + bb[1] + bb[2] + bb[3]) / 2); poly(d.g, cells, tone); return add(d); };
  // furniture
  S.table = (x, y, w, dd, h = .74, t = {}) => { const d = drawable([x, x + w, y, y + dd, 0, h], x + y + (w + dd) / 2); const g2 = d.g; const i = .09; for (const [lx, ly] of [[x + i, y + i], [x + w - i, y + i], [x + i, y + dd - i], [x + w - i, y + dd - i]]) capsule(g2, [lx, ly, 0], [lx, ly, h - .08], .07, 'paper'); box(g2, x + .05, y + .05, x + w - .05, y + dd - .05, h - .13, h - .04, { top: 'paper', east: 'paper', south: 'shade2' }); box(g2, x, y, x + w, y + dd, h - .04, h, { top: t.top || 'white', east: 'paper', south: 'shade' }); return add(d); };
  S.roundTable = (x, y, r, h = .74) => { const d = drawable([x - r, x + r, y - r, y + r, 0, h], x + y); cylinder(d.g, x, y, r * .5, 0, .04, { top: 'paper', side: 'shade' }); capsule(d.g, [x, y, 0], [x, y, h - .05], .09, 'paper'); cylinder(d.g, x, y, r * .35, h - .1, h - .05, { top: 'paper', side: 'shade2' }); cylinder(d.g, x, y, r, h - .05, h, { top: 'white', side: 'shade' }); return add(d); };
  S.chair = (x, y, phi, t = {}) => { const { f, r } = frame(phi); const c = [x, y]; const q = quad(c, phi, .21, .21, 0); const bb = bbOf(q); bb[4] = 0; bb[5] = .95; const d = drawable(bb, x + y); const g2 = d.g; for (const p of q) capsule(g2, V.lerp(p, [x, y, 0], .12), V.madd(V.lerp(p, [x, y, 0], .12), [0, 0, 1], .42), .04, 'ink'); slab(g2, c, phi, .21, .21, .42, .46, { top: t.seat || 'white', east: 'paper', south: 'shade' }); const b0 = V.madd(V.madd([x, y, .46], f, -.20), r, -.20), b1 = V.madd(V.madd([x, y, .46], f, -.20), r, .20); capsule(g2, b0, V.madd(b0, [0, 0, 1], .46), .04, 'ink'); capsule(g2, b1, V.madd(b1, [0, 0, 1], .46), .04, 'ink'); capsule(g2, V.madd(b0, [0, 0, 1], .46), V.madd(b1, [0, 0, 1], .46), .05, 'ink'); capsule(g2, V.madd(b0, [0, 0, 1], .30), V.madd(b1, [0, 0, 1], .30), .04, 'ink'); return add(d); };
  S.stool = (x, y, h = .45) => { const d = drawable([x - .18, x + .18, y - .18, y + .18, 0, h], x + y); capsule(d.g, [x, y, 0], [x, y, h - .03], .05, 'ink'); cylinder(d.g, x, y, .17, h - .04, h, { top: 'white', side: 'shade' }); return add(d); };
  S.laptop = (x, y, z, phi, t = {}) => {
    const { f, r } = frame(phi), up = [0, 0, 1]; const q = quad([x, y], phi, .115, .165, z); const bb = bbOf(q, .02); bb[4] = z; bb[5] = z + .25; const d = drawable(bb, x + y); const g2 = d.g;
    slab(g2, [x, y], phi, .115, .165, z, z + .018, { top: 'white', east: 'paper', south: 'shade2' });
    const kc = V.madd([x, y, z + .019], f, -.03); poly(g2, quad([kc[0], kc[1]], phi, .04, .13, z + .019), 'shade');
    for (let i = -1; i <= 1; i++) { const a = V.madd(V.madd([x, y, z + .02], f, -.03 + i * .025), r, -.12); ln(g2, a, V.madd(a, r, .24), .3); }
    poly(g2, quad([x + f[0] * .07, y + f[1] * .07], phi, .02, .035, z + .019), 'paper');
    const b0 = V.madd(V.madd([x, y, z + .018], f, -.115), r, -.165), b1 = V.madd(V.madd([x, y, z + .018], f, -.115), r, .165); const tilt = V.mul(f, -.075);
    const t0 = V.add(V.madd(b0, up, .225), tilt), t1 = V.add(V.madd(b1, up, .225), tilt); const facing = f[0] + f[1] > 0;
    const back = V.mul(f, -.014); poly(g2, [V.add(b0, back), V.add(b1, back), V.add(t1, back), V.add(t0, back)], 'shade2');
    if (facing) { poly(g2, [b0, b1, t1, t0], 'shade2'); const L = (s, u) => V.lerp(V.lerp(b0, b1, s), V.lerp(t0, t1, s), u); poly(g2, [L(.07, .12), L(.93, .12), L(.93, .93), L(.07, .93)], t.screen || 'white'); [[.14, .78, .5], [.14, .66, .7], [.14, .54, .4]].forEach(([s, u, e]) => ln(g2, L(s, u), L(s + e, u), .3)); poly(g2, [L(.14, .22), L(.5, .22), L(.5, .44), L(.14, .44)], 'shade'); }
    else { poly(g2, [b0, b1, t1, t0], 'paper'); ball(g2, V.lerp(V.lerp(b0, b1, .5), V.lerp(t0, t1, .5), .55), .022, 'ink'); }
    ln(g2, b0, b1, .5); return add(d);
  };
  S.monitor = (x, y, z, phi, w = .55, h = .34) => { const { f, r } = frame(phi), up = [0, 0, 1]; const d = drawable([x - w / 2, x + w / 2, y - w / 2, y + w / 2, z, z + h + .12], x + y); const g2 = d.g; cylinder(g2, x, y, .11, z, z + .015, { top: 'paper', side: 'shade' }); capsule(g2, [x, y, z], [x, y, z + .11], .05, 'paper'); const b0 = V.madd([x, y, z + .10], r, -w / 2), b1 = V.madd([x, y, z + .10], r, w / 2); const facing = f[0] + f[1] > 0; const back = V.mul(f, -.025); poly(g2, [V.add(b0, back), V.add(b1, back), V.add(V.madd(b1, up, h), back), V.add(V.madd(b0, up, h), back)], 'shade'); poly(g2, [b0, b1, V.madd(b1, up, h), V.madd(b0, up, h)], facing ? 'shade2' : 'paper'); if (facing) { const L = (s, u) => V.madd(V.lerp(b0, b1, s), up, u * h); poly(g2, [L(.05, .08), L(.95, .08), L(.95, .94), L(.05, .94)], 'white'); [[.12, .8, .45], [.12, .68, .6], [.12, .56, .3]].forEach(([s, u, e]) => ln(g2, L(s, u), L(s + e, u), .3)); poly(g2, [L(.55, .2), L(.9, .2), L(.9, .5), L(.55, .5)], 'shade'); } return add(d); };
  S.mug = (x, y, z, steam = true) => { const d = drawable([x - .06, x + .07, y - .06, y + .06, z, z + .1], x + y + .01); cylinder(d.g, x, y, .042, z, z + .09, { top: 'shade', side: 'paper' }); const [hx, hy] = P([x + .058, y - .02, z + .047]); el('ellipse', { cx: hx, cy: hy, rx: r2(.03 * T), ry: r2(.034 * T), class: 'f-none', style: 'stroke:var(--ink);stroke-width:.55' }, d.g); if (steam) { const [sx, sy] = P([x, y, z + .12]); el('path', { d: `M${sx} ${sy} c -.6 -.9 .6 -1.7 0 -2.6`, class: 'steam' }, d.g); el('path', { d: `M${sx + .8} ${sy} c -.6 -.9 .6 -1.7 0 -2.6`, class: 'steam s2' }, d.g); } return add(d); };
  S.books = (x, y, z, n = 3, phi = 0) => { const d = drawable([x - .14, x + .14, y - .1, y + .1, z, z + n * .035], x + y); for (let i = 0; i < n; i++) slab(d.g, [x + (i % 2) * .02, y - (i % 2) * .015], phi + (i % 2) * .15, .11, .085, z + i * .035, z + i * .035 + .032, { top: i % 2 ? 'paper' : 'white', east: 'ink', south: 'shade2' }); return add(d); };
  S.bag = (x, y, phi = 0) => { const d = drawable([x - .2, x + .2, y - .2, y + .2, 0, .32], x + y); slab(d.g, [x, y], phi, .08, .18, 0, .30, { top: 'shade2', east: 'shade', south: 'shade2' }); const { r } = frame(phi); const a = V.madd([x, y, .30], r, -.1), b = V.madd([x, y, .30], r, .1); const [ax, ay] = P(a), [bx, by] = P(b); el('path', { d: `M${ax} ${ay} Q ${(ax + bx) / 2} ${ay - 3} ${bx} ${by}`, class: 'ln' }, d.g); return add(d); };
  S.wall = (x0, y0, x1, y1, h, t = {}) => S.box(x0, y0, x1, y1, 0, h, { top: 'white', east: t.east || 'paper', south: t.south || 'shade', ...t });
  // a whiteboard on the face of a wall that runs along x (face at y = y1 + 0) or along y (face at x = x1)
  S.board = (x, y, z, w, h, along = 'x', t = {}) => {
    const a = [x, y, z], dir = along === 'x' ? [1, 0, 0] : [0, 1, 0], out = along === 'x' ? [0, 1, 0] : [1, 0, 0], up = [0, 0, 1]; const b = V.madd(a, dir, w);
    const d = drawable([Math.min(a[0], b[0]) - .01, Math.max(a[0], b[0]) + .08, Math.min(a[1], b[1]) - .01, Math.max(a[1], b[1]) + .08, z - .03, z + h], (a[0] + b[0] + a[1] + b[1]) / 2 + .02); const g2 = d.g;
    const L = (s, u) => V.madd(V.madd(a, dir, s * w), up, u * h);
    poly(g2, [L(0, 0), L(1, 0), L(1, 1), L(0, 1)], 'shade'); poly(g2, [L(.02, .03), L(.98, .03), L(.98, .97), L(.02, .97)], 'white');
    // the tray and two markers
    poly(g2, [V.madd(L(0, 0), up, -.03), V.madd(L(1, 0), up, -.03), V.madd(V.madd(L(1, 0), out, .07), up, -.03), V.madd(V.madd(L(0, 0), out, .07), up, -.03)], 'paper'); poly(g2, [V.madd(V.madd(L(0, 0), out, .07), up, -.03), V.madd(V.madd(L(1, 0), out, .07), up, -.03), V.madd(V.madd(L(1, 0), out, .07), up, .01), V.madd(V.madd(L(0, 0), out, .07), up, .01)], 'shade2');
    capsule(g2, V.madd(L(.12, 0), out, .035), V.madd(L(.19, 0), out, .035), .025, 'ink'); capsule(g2, V.madd(L(.22, 0), out, .035), V.madd(L(.29, 0), out, .035), .025, 'paper');
    (t.lines || [[.08, .84, .5], [.08, .74, .36], [.08, .64, .55]]).forEach(([s, u, e]) => ln(g2, L(s, u), L(s + e * .8, u), .45));
    // a little diagram: two boxes and an arrow
    const dg = t.diagram || [.1, .42]; const [ds, du] = dg; const bx = (s, u) => poly(g2, [L(s, u), L(s + .14, u), L(s + .14, u + .14), L(s, u + .14)], 'paper'); bx(ds, du); bx(ds + .26, du); ln(g2, L(ds + .145, du + .07), L(ds + .255, du + .07), .45); ln(g2, L(ds + .225, du + .1), L(ds + .255, du + .07), .45); ln(g2, L(ds + .225, du + .04), L(ds + .255, du + .07), .45);
    // a circled word
    const cw = t.circle || [.78, .32]; poly(g2, ellipse3(L(cw[0], cw[1]), V.mul(dir, .11 * w), V.mul(up, .07 * h), 16), 'none'); ln(g2, L(cw[0] - .07, cw[1]), L(cw[0] + .07, cw[1]), .45);
    (t.notes || []).forEach(([s, u, tone, rot = 0]) => { const c = L(s, u); const uu = V.add(V.mul(dir, .06 * Math.cos(rot)), V.mul(up, .06 * Math.sin(rot))), vv = V.add(V.mul(dir, -.06 * Math.sin(rot)), V.mul(up, .06 * Math.cos(rot))); poly(g2, [V.sub(V.sub(c, uu), vv), V.sub(V.add(c, uu), vv), V.add(V.add(c, uu), vv), V.add(V.sub(c, uu), vv)], tone || 'shade2'); });
    return add(d);
  };
  S.plant = (x, y, h = .9, kind = 'fig') => { const d = drawable([x - .3, x + .3, y - .3, y + .3, 0, .3 + h], x + y); const g2 = d.g; const up = [0, 0, 1]; cylinder(g2, x, y, .13, 0, .2, { top: 'paper', side: 'shade' }); cylinder(g2, x, y, .15, .19, .24, { top: 'white', side: 'paper' }); disc(g2, [x, y, .245], .11, 'shade2', 'no'); const n = kind === 'fig' ? 7 : 5; capsule(g2, [x, y, .24], [x, y, .24 + h * .75], .035, 'ink'); for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + .7 + ((i * 13) % 5) * .1, dir = [Math.cos(a), Math.sin(a), 0], side = [-Math.sin(a), Math.cos(a), 0]; const zz = .24 + h * (.3 + .6 * ((i * 7) % n) / n), reach = .14 + .1 * ((i * 3) % 3) / 2; const c = V.madd(V.madd([x, y, zz], dir, reach), up, .05); capsule(g2, [x, y, zz - .04], V.madd(c, dir, -.08), .025, 'ink'); const u = V.add(V.mul(dir, .14), V.mul(up, .05)), v = V.add(V.mul(side, .075), V.mul(up, .03)); poly(g2, ellipse3(c, u, v, 12), 'shade'); ln(g2, V.sub(c, u), V.add(c, u), .35); } return add(d); };
  S.tree = (x, y, h = 2.6, r = 1.0) => { const d = drawable([x - r, x + r, y - r, y + r, 0, h + r * 1.4], x + y); const g2 = d.g; const up = [0, 0, 1]; capsule(g2, [x, y, 0], [x, y, h], .18, 'paper'); capsule(g2, [x, y, h - .5], [x + .35 * r, y - .2 * r, h + .35 * r], .09, 'paper'); capsule(g2, [x, y, h - .3], [x - .3 * r, y + .15 * r, h + .3 * r], .08, 'paper'); const c = [x, y, h + r * .5]; ball(g2, V.add(c, [.35 * r, -.1 * r, -.05 * r]), r * .62, 'shade'); ball(g2, V.add(c, [-.35 * r, .2 * r, -.02 * r]), r * .6, 'shade'); ball(g2, V.add(c, [0, 0, .3 * r]), r * .68, 'shade'); ball(g2, V.add(c, [-.15 * r, -.2 * r, .55 * r]), r * .2, 'white'); return add(d); };
  S.lamp = (x, y, h = 2.4) => { S.shadow(x, y, .55, 'shade'); const d = drawable([x - .1, x + .1, y - .1, y + .1, 0, h], x + y); capsule(d.g, [x, y, 0], [x, y, h], .06, 'ink'); ball(d.g, [x, y, h + .05], .11, 'ink'); return add(d); };
  S.signpost = (x, y, arms) => { const d = drawable([x - .7, x + .7, y - .7, y + .7, 0, 3.2], x + y); const g2 = d.g; capsule(g2, [x, y, 0], [x, y, 3.0], .08, 'paper'); arms.forEach(({ z, phi, len = .8, tone = 'white' }) => { const { f } = frame(phi); const p = [x, y, z]; const q = V.madd(p, f, len); poly(g2, [p, q, V.madd(V.madd(q, f, .12), [0, 0, 1], .09), V.madd(q, [0, 0, 1], .18), V.madd(p, [0, 0, 1], .18)], tone); }); return add(d); };
  S.bench = (x, y, phi, len = 1.5) => { const { f, r } = frame(phi); const c = [x, y]; const q = quad(c, phi, .22, len / 2, 0); const bb = bbOf(q); bb[4] = 0; bb[5] = .9; const d = drawable(bb, x + y); const g2 = d.g; for (const s of [-1, 1]) { const b = V.madd([x, y, 0], r, s * (len / 2 - .15)); capsule(g2, V.madd(b, f, .15), V.madd(V.madd(b, f, .15), [0, 0, 1], .42), .05, 'ink'); capsule(g2, V.madd(b, f, -.15), V.madd(V.madd(b, f, -.15), [0, 0, 1], .42), .05, 'ink'); } slab(g2, c, phi, .22, len / 2, .42, .47, { top: 'white', east: 'paper', south: 'shade' }); const b0 = V.madd(V.madd([x, y, .47], f, -.2), r, -len / 2 + .1), b1 = V.madd(V.madd([x, y, .47], f, -.2), r, len / 2 - .1); capsule(g2, b0, V.madd(b0, [0, 0, 1], .45), .04, 'ink'); capsule(g2, b1, V.madd(b1, [0, 0, 1], .45), .04, 'ink'); capsule(g2, V.madd(b0, [0, 0, 1], .45), V.madd(b1, [0, 0, 1], .45), .05, 'ink'); capsule(g2, V.madd(b0, [0, 0, 1], .28), V.madd(b1, [0, 0, 1], .28), .04, 'ink'); return add(d); };
  S.rail = (x0, y0, x1, y1, h = 1.0, z0 = 0) => { const d = drawable([Math.min(x0, x1) - .03, Math.max(x0, x1) + .03, Math.min(y0, y1) - .03, Math.max(y0, y1) + .03, z0, z0 + h], (x0 + x1 + y0 + y1) / 2 + .03); const g2 = d.g; const L = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.round(L / .7)); for (let i = 0; i <= n; i++) { const p = [lerp(x0, x1, i / n), lerp(y0, y1, i / n), z0]; capsule(g2, p, V.madd(p, [0, 0, 1], h), .05, 'ink'); } capsule(g2, [x0, y0, z0 + h], [x1, y1, z0 + h], .06, 'paper'); capsule(g2, [x0, y0, z0 + h * .5], [x1, y1, z0 + h * .5], .04, 'paper'); return add(d); };
  S.counter = (x, y, w, dd, h = .9, t = {}) => S.box(x, y, x + w, y + dd, 0, h, { top: 'white', east: 'paper', south: 'shade', ...t });
  S.kettle = (x, y, z, phi = 0) => { const { f } = frame(phi), up = [0, 0, 1]; const d = drawable([x - .22, x + .25, y - .18, y + .18, z, z + .36], x + y + .02); const g2 = d.g; cylinder(g2, x, y, .11, z, z + .15, { top: 'shade', side: 'paper' }); cylinder(g2, x, y, .085, z + .15, z + .19, { top: 'white', side: 'shade' }); ball(g2, [x, y, z + .215], .025, 'ink'); const sp0 = V.madd([x, y, z + .09], f, .09), sp1 = V.madd([x, y, z + .2], f, .2); capsule(g2, sp0, sp1, .04, 'paper'); const h0 = V.madd([x, y, z + .17], f, -.06), h1 = V.madd([x, y, z + .17], f, .05); const [ax, ay] = P(h0), [bx, by] = P(h1), [cx, cy] = P(V.madd([x, y, z + .36], f, 0)); el('path', { d: `M${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`, class: 'ln', style: 'stroke-width:.8' }, g2); const [sx, sy] = P(V.madd(sp1, up, .03)); el('path', { d: `M${sx} ${sy} c -.5 -.9 .7 -1.6 .1 -2.6`, class: 'steam' }, g2); return add(d); };
  S.stove = (x, y, w, dd, h = .9) => { const d = S.counter(x, y, w, dd, h); const g2 = d.g; for (const [rx, ry] of [[.3, .28], [.7, .28], [.3, .68], [.7, .68]]) { disc(g2, [x + rx * w, y + ry * dd, h + .005], .085, 'shade2', 'no'); disc(g2, [x + rx * w, y + ry * dd, h + .006], .05, 'ink', 'no'); } for (const s of [.2, .35, .65, .8]) ball(g2, [x + s * w, y + dd + .005, h - .1], .022, 'ink'); poly(g2, [[x + .1, y + dd + .004, .18], [x + w - .1, y + dd + .004, .18], [x + w - .1, y + dd + .004, h - .25], [x + .1, y + dd + .004, h - .25]], 'white'); capsule(g2, [x + .25, y + dd + .03, h - .32], [x + w - .25, y + dd + .03, h - .32], .03, 'ink'); return d; };
  S.pot = (x, y, z, r = .14, steam = true) => { const d = drawable([x - r, x + r, y - r, y + r, z, z + .16], x + y + .02); cylinder(d.g, x, y, r, z, z + .14, { top: 'shade2', side: 'paper' }); capsule(d.g, [x - r - .02, y, z + .1], [x - r - .14, y, z + .1], .035, 'ink'); if (steam) { const [sx, sy] = P([x, y, z + .18]); el('path', { d: `M${sx} ${sy} c -.8 -1.1 .8 -2 0 -3.2`, class: 'steam' }, d.g); el('path', { d: `M${sx + 1.1} ${sy} c -.8 -1.1 .8 -2 0 -3.2`, class: 'steam s2' }, d.g); } return add(d); };
  S.stairs = (x, y, phi, n = 5, w = 1.0, rise = .2, run = .28) => { const { f } = frame(phi); const out = []; for (let i = 0; i < n; i++) { const c = V.madd([x, y, 0], f, run * i); out.push(S.slab([c[0], c[1]], phi, run / 2, w / 2, 0, rise * (i + 1), { top: 'white', east: 'paper', south: 'shade' })); } return out; };
  S.flag = (x, y, h = 3.2, z0 = 0) => { const d = drawable([x - .05, x + .6, y - .05, y + .05, z0, z0 + h], x + y); capsule(d.g, [x, y, z0], [x, y, z0 + h], .05, 'ink'); poly(d.g, [[x, y, z0 + h], [x + .55, y + .02, z0 + h - .14], [x, y, z0 + h - .32]], 'ink'); return add(d); };
  S.cairn = (x, y) => { const d = drawable([x - .4, x + .4, y - .4, y + .4, 0, .75], x + y); cylinder(d.g, x, y, .36, 0, .22, { top: 'paper', side: 'shade' }); cylinder(d.g, x + .03, y - .02, .26, .22, .44, { top: 'white', side: 'shade' }); cylinder(d.g, x - .02, y + .02, .16, .44, .62, { top: 'paper', side: 'shade2' }); return add(d); };
  S.bike = (x, y, phi) => { const { f } = frame(phi), up = [0, 0, 1]; const d = drawable([x - .9, x + .9, y - .9, y + .9, 0, .95], x + y); const g2 = d.g; const w0 = V.madd([x, y, .33], f, -.5), w1 = V.madd([x, y, .33], f, .5); for (const w of [w0, w1]) { const [cx, cy] = P(w); el('circle', { cx, cy, r: r2(.33 * T * .95), class: 'f-none', style: 'stroke:var(--ink);stroke-width:.7' }, g2); el('circle', { cx, cy, r: r2(.26 * T * .95), class: 'f-none', style: 'stroke:var(--ink);stroke-width:.3' }, g2); for (let i = 0; i < 3; i++) { const an = i / 3 * Math.PI; el('line', { x1: r2(cx + Math.cos(an) * .3 * T), y1: r2(cy + Math.sin(an) * .3 * T), x2: r2(cx - Math.cos(an) * .3 * T), y2: r2(cy - Math.sin(an) * .3 * T), class: 'ln', style: 'stroke-width:.3' }, g2); } el('circle', { cx, cy, r: r2(.04 * T), class: 'f-ink' }, g2); } const seat = V.madd([x, y, .95], f, -.18), bar = V.madd([x, y, .95], f, .33), crank = V.madd([x, y, .36], f, .02); capsule(g2, w0, seat, .035, 'ink'); capsule(g2, seat, bar, .035, 'ink'); capsule(g2, bar, w1, .035, 'ink'); capsule(g2, seat, crank, .035, 'ink'); capsule(g2, crank, bar, .035, 'ink'); capsule(g2, w0, crank, .035, 'ink'); capsule(g2, V.madd(seat, f, -.1), V.madd(seat, f, .1), .06, 'ink'); capsule(g2, V.madd(V.madd(bar, up, .04), frame(phi).r, -.2), V.madd(V.madd(bar, up, .04), frame(phi).r, .2), .035, 'ink'); return add(d); };
  S.pegboard = (x, y, z, w, h, along = 'x') => { const a = [x, y, z], dir = along === 'x' ? [1, 0, 0] : [0, 1, 0], up = [0, 0, 1]; const b = V.madd(a, dir, w); const d = drawable([Math.min(a[0], b[0]) - .01, Math.max(a[0], b[0]) + .01, Math.min(a[1], b[1]) - .01, Math.max(a[1], b[1]) + .01, z, z + h], (a[0] + b[0] + a[1] + b[1]) / 2 + .02); const g2 = d.g; const L = (s, u) => V.madd(V.madd(a, dir, s * w), up, u * h); poly(g2, [L(0, 0), L(1, 0), L(1, 1), L(0, 1)], 'paper'); for (let i = 1; i < w / .14; i++) for (let j = 1; j < h / .14; j++) ball(g2, V.madd(V.madd(a, dir, i * .14), up, j * .14), .014, 'ink'); capsule(g2, L(.16, .78), L(.16, .36), .04, 'paper'); poly(g2, [V.madd(L(.1, .84), up, 0), V.madd(L(.22, .84), up, 0), L(.22, .72), L(.1, .72)], 'shade2'); capsule(g2, L(.4, .82), L(.4, .4), .035, 'paper'); ball(g2, L(.4, .86), .035, 'shade2'); ball(g2, L(.4, .36), .035, 'shade2'); poly(g2, [L(.56, .82), L(.78, .82), L(.78, .5), L(.6, .62)], 'paper'); capsule(g2, L(.78, .82), L(.86, .88), .04, 'ink'); capsule(g2, L(.9, .78), L(.9, .5), .03, 'ink'); return add(d); };
  S.window = (x, y, z, w, h, along = 'x', t = {}) => { const a = [x, y, z], dir = along === 'x' ? [1, 0, 0] : [0, 1, 0], out = along === 'x' ? [0, 1, 0] : [1, 0, 0], up = [0, 0, 1]; const b = V.madd(a, dir, w); const d = drawable([Math.min(a[0], b[0]) - .01, Math.max(a[0], b[0]) + .07, Math.min(a[1], b[1]) - .01, Math.max(a[1], b[1]) + .07, z - .04, z + h], (a[0] + b[0] + a[1] + b[1]) / 2 + .02); const g2 = d.g; const L = (s, u) => V.madd(V.madd(a, dir, s * w), up, u * h); poly(g2, [L(0, 0), L(1, 0), L(1, 1), L(0, 1)], 'shade'); poly(g2, [L(.04, .04), L(.96, .04), L(.96, .96), L(.04, .96)], 'white'); if (t.weather === 'rain' || t.weather === 'cloud') { for (const [s, u, rr] of [[.3, .78, .09], [.42, .84, .11], [.55, .78, .09]]) ball(g2, L(s, u), rr * h, 'paper'); } if (t.weather === 'rain') for (let i = 0; i < 7; i++) { const s = .1 + i * .12; ln(g2, L(s + .04, .62 - (i % 3) * .08), L(s, .5 - (i % 3) * .08), .4); } if (t.weather === 'sun') { ball(g2, L(.74, .76), .09 * h, 'white'); for (let i = 0; i < 5; i++) { const an = i / 5 * Math.PI * 2 + .3; ln(g2, V.add(L(.74, .76), V.add(V.mul(dir, .13 * h * Math.cos(an)), V.mul(up, .13 * h * Math.sin(an)))), V.add(L(.74, .76), V.add(V.mul(dir, .19 * h * Math.cos(an)), V.mul(up, .19 * h * Math.sin(an)))), .4); } } ln(g2, L(.5, .04), L(.5, .96), .5); ln(g2, L(.04, .5), L(.96, .5), .5); poly(g2, [V.madd(L(-.02, 0), up, -.04), V.madd(L(1.02, 0), up, -.04), V.madd(V.madd(L(1.02, 0), out, .07), up, -.04), V.madd(V.madd(L(-.02, 0), out, .07), up, -.04)], 'white'); poly(g2, [V.madd(V.madd(L(-.02, 0), out, .07), up, -.04), V.madd(V.madd(L(1.02, 0), out, .07), up, -.04), V.madd(V.madd(L(1.02, 0), out, .07), up, 0), V.madd(V.madd(L(-.02, 0), out, .07), up, 0)], 'shade2'); return add(d); };
  S.seedlings = (x, y, z, n = 3, along = 'x') => { const dir = along === 'x' ? [1, 0, 0] : [0, 1, 0]; const d = drawable([x - .1, x + .1 + (along === 'x' ? n * .22 : 0), y - .1, y + .1 + (along === 'y' ? n * .22 : 0), z, z + .3], x + y + .03); for (let i = 0; i < n; i++) { const p = V.madd([x, y, z], dir, i * .22); cylinder(d.g, p[0], p[1], .06, z, z + .09, { top: 'paper', side: 'shade' }); capsule(d.g, V.madd(p, [0, 0, 1], .09), V.madd(p, [0, 0, 1], .22 + i * .03), .025, 'ink'); ball(d.g, V.madd(p, [0, 0, 1], .25 + i * .03), .045, 'shade2'); } return add(d); };
  S.shelf = (x, y, w, dd, h = 1.8, levels = 3) => { const d = drawable([x, x + w, y, y + dd, 0, h], x + y + (w + dd) / 2); const g2 = d.g; for (let i = 0; i <= levels; i++) box(g2, x, y, x + w, y + dd, h * i / levels, h * i / levels + .03, { top: 'white', east: 'paper', south: 'shade' }); for (let i = 0; i < levels; i++) { let bx = x + .05; while (bx < x + w - .1) { const bw = .04 + rnd() * .05, bh = .2 + rnd() * .12; box(g2, bx, y + .05, bx + bw, y + dd - .05, h * i / levels + .03, h * i / levels + .03 + bh, { top: 'paper', east: rnd() < .5 ? 'ink' : 'shade2', south: 'shade2' }); bx += bw + .02; } } return add(d); };
  S.easel = (x, y, phi, w = 1.2, h = 1.5, t = {}) => { const { f, r } = frame(phi), up = [0, 0, 1]; const top = 1.9; const b0 = V.madd([x, y, 0], r, -w / 2), b1 = V.madd([x, y, 0], r, w / 2); const bb = bbOf([b0, b1, V.madd([x, y, 0], f, -.5)], .1); bb[4] = 0; bb[5] = top + .05; const d = drawable(bb, x + y); const g2 = d.g; const dir = V.norm(V.sub(b1, b0)); for (const b of [b0, b1]) capsule(g2, V.madd(b, f, .08), V.madd(V.madd(b, f, -.02), up, top), .045, 'ink'); capsule(g2, V.madd([x, y, 0], f, -.55), V.madd([x, y, 0], up, top - .05), .045, 'ink'); const z0 = top - h; const L = (s, u) => V.madd(V.madd(b0, dir, s * w), up, z0 + u * h); poly(g2, [L(0, 0), L(1, 0), L(1, 1), L(0, 1)], 'white'); poly(g2, [L(.86, 0), L(1, 0), L(1, .12)], 'shade'); poly(g2, [L(.4, .97), L(.6, .97), L(.6, 1.03), L(.4, 1.03)], 'ink'); (t.lines || []).forEach(([s, u, e]) => ln(g2, L(s, u), L(s + e, u), .45)); (t.notes || []).forEach(([s, u, tone, rot = 0]) => { const c = L(s, u); const uu = V.add(V.mul(dir, .06 * Math.cos(rot)), V.mul(up, .06 * Math.sin(rot))), vv = V.add(V.mul(dir, -.06 * Math.sin(rot)), V.mul(up, .06 * Math.cos(rot))); poly(g2, [V.sub(V.sub(c, uu), vv), V.sub(V.add(c, uu), vv), V.add(V.add(c, uu), vv), V.add(V.sub(c, uu), vv)], tone || 'shade2'); }); if (t.diagram) { const [ds, du] = t.diagram; const bx = (s, u) => poly(g2, [L(s, u), L(s + .16, u), L(s + .16, u + .14), L(s, u + .14)], 'paper'); bx(ds, du); bx(ds + .3, du); ln(g2, L(ds + .165, du + .07), L(ds + .295, du + .07), .45); } return add(d); };
  S.platform = (x0, y0, x1, y1, z, t = {}) => { const d = S.box(x0, y0, x1, y1, z - .12, z, { top: 'white', east: 'paper', south: 'shade' }); const posts = drawable([x0, x1, y0, y1, 0, z], (x0 + x1 + y0 + y1) / 2 - .5); for (const [px, py] of [[x0 + .1, y0 + .1], [x1 - .1, y0 + .1], [x0 + .1, y1 - .1], [x1 - .1, y1 - .1]]) capsule(posts.g, [px, py, 0], [px, py, z - .12], .08, 'paper'); add(posts); return d; };
  S.dog = (x, y, phi, z = 0) => { // a dog, sitting: haunches on the ground, front legs straight, head up, ears down, tail curled
    const { f, r } = frame(phi), up = [0, 0, 1]; const d = drawable([x - .45, x + .45, y - .45, y + .45, z, z + .75], x + y, 'fig'); const g2 = d.g; const at = [x, y, z]; disc(g2, [x, y, z + .002], .34, 'half', 'no shadow');
    const B = V.madd(V.madd(at, f, -.12), up, .2), C = V.madd(V.madd(at, f, .2), up, .38);
    capsule(g2, V.madd(V.madd(B, f, -.1), up, -.06), V.madd(V.madd(B, f, -.3), up, .14), .05, 'ink', HALO);
    for (const s of [-1, 1]) capsule(g2, V.madd(V.madd(B, r, s * .1), up, -.1), V.madd(V.madd(V.madd(B, r, s * .11), f, .22), up, -.17), .07, 'ink', HALO);
    ball(g2, B, .19, 'half2', HALO); capsule(g2, B, C, .22, 'half2', HALO);
    for (const s of [-1, 1]) capsule(g2, V.madd(C, r, s * .07), V.madd(V.madd(V.madd(C, r, s * .08), f, .04), up, -.36), .06, 'ink', HALO);
    const H = V.madd(V.madd(C, f, .1), up, .22); capsule(g2, V.madd(C, up, .05), H, .12, 'half2', HALO); ball(g2, H, .11, 'half2', HALO);
    capsule(g2, V.madd(H, f, .05), V.madd(V.madd(H, f, .19), up, -.03), .07, 'half2', HALO); ball(g2, V.madd(V.madd(H, f, .2), up, -.02), .03, 'ink');
    for (const s of [-1, 1]) capsule(g2, V.madd(V.madd(H, up, .07), r, s * .08), V.madd(V.madd(V.madd(H, up, -.06), r, s * .12), f, -.03), .055, 'ink', HALO);
    capsule(g2, V.madd(V.madd(C, f, .09), r, -.1), V.madd(V.madd(C, f, .09), r, .1), .025, 'ink');
    return add(d); };
  S.done = () => sortDraw(g, items);
  return S;
}
// hover: any drawable can carry a caption
const H = {};
const hov = (d, link, cap, text) => { const list = (Array.isArray(d) ? d : [d]).flatMap(x => x.all ? x.all : [x]); for (const x of list) { x.g.setAttribute('data-hover', text); x.g.setAttribute('data-cap', cap); if (link) { x.g.setAttribute('data-link', link); (H[link] = H[link] || []).push(x.g); } } return d; };
