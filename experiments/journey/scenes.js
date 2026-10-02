// ---------- the seven stops, each a vignette of people doing the thing ----------
// Coordinates are metres around each stop's own origin. The viewer looks from +x+y; a figure facing π/4 faces us.
const Q = Math.PI / 4;
const SCENES = [
  // 0 · the trailhead: a porch in Richmond, a table, a real problem
  { door: [-3.2, 3.0], build(S) {
    S.pad([[-4, -3], [4, -3], [4, 3], [-4, 3]], 'paper');
    S.shade(3.0, -1.4, 1.0);
    // the house wall behind the deck, with a window and a door
    S.wall(-3.6, -3.05, .4, -2.9, 2.7, { south: 'paper' }); S.window(-3.1, -2.9, 1.1, 1.0, .9, 'x'); S.plane([[-.95, -2.9, .25], [-.15, -2.9, .25], [-.15, -2.9, 2.3], [-.95, -2.9, 2.3]], 'half2', -3.3);
    // the deck, a step, the railing
    S.box(-3.6, -2.9, .4, -.6, 0, .25, { top: 'white', east: 'paper', south: 'half' }, -5.5); S.box(-.6, -.6, .4, -.25, 0, .13, { top: 'white', east: 'paper', south: 'half' }, -1.2);
    S.rail(-3.6, -.6, -.9, -.6, .95, .25); S.rail(.4, -2.9, .4, -.6, .95, .25);
    // the table, two chairs, the laptop, the mug, the notebook
    const table = S.table(-2.4, -2.1, 1.5, .75, .74); S.chair(-2.75, -1.72, 0); S.chair(-.55, -1.72, Math.PI);
    const laptop = S.laptop(-1.75, -1.72, .74, Math.PI); S.mug(-1.25, -1.95, .74); S.slab([-1.2, -1.5], 0, .11, .15, .74, .76, { top: 'white', east: 'paper', south: 'half' });
    const david = S.fig({ at: [-2.75, -1.72, .25], face: 0, pose: 'sit', seat: .46, hair: 'short', coat: 'half', pants: 'ink', hands: { L: 'lap', R: { abs: [-1.9, -1.78, 1.2] } }, anim: 'point' });
    david.o.hands.R = 'point'; david.update(0);
    const you = S.fig({ at: [-.55, -1.72, .25], face: Math.PI, pose: 'sit', seat: .46, build: 'b', hair: 'tied', coat: 'ink', pants: 'paper', skirt: 'half2', hands: { L: 'talk', R: 'talk' }, anim: 'talk' });
    hov(david, 'guide', 'Your guide', 'David Beath. Twenty-five years leading innovation at IDEO, Capital One and DBS; founded BuildFirst in Richmond, Virginia, and works from this porch when he is not in your building.');
    hov(you, 'you', 'You', 'A leader with a real problem and a laptop. Most journeys start exactly like this: a table, a conversation, and the first build before the first slide.');
    hov([table, laptop], 'table', 'Where it starts', 'A table, two chairs, a mug and a laptop. The first build happens here, on something you actually need.');
    const lamp = S.lamp(1.0, -1.0, 2.5); hov(lamp, 'lamp', '6am', 'The porch light is on at six. That is when the new prompt chain gets tested, before the kids are up.');
    const bikes = [S.bike(1.4, -2.45, .15), S.bike(1.9, -1.75, .1)]; hov(bikes, 'bikes', 'The kids', 'Two bikes against the fence. The reason the day starts early.');
    S.tree(3.1, -1.6, 2.6, 1.15); S.tree(-4.2, 1.4, 2.2, .95); S.plant(.9, .4, .8);
    const dog = S.dog(1.8, .35, Math.PI * .6, 0); hov(dog, 'dog', 'The dog', 'Comes to every call. Has opinions about prompt chains.');
  } },
  // 1 · start small: a signpost, a decision, low commitment
  { door: [-2.6, 2.5], build(S) {
    S.pad([[-3.5, -2.5], [3.5, -2.5], [3.5, 2.5], [-3.5, 2.5]], 'paper'); S.shade(2.7, -1.6, 1.0);
    const post = S.signpost(.5, -1.1, [{ z: 2.6, phi: 0 }, { z: 2.15, phi: Math.PI / 2 }, { z: 1.7, phi: 0 }]);
    hov(post, 'call', 'Three ways in', 'A thirty-minute call, a half-day workshop, or a two-to-four-week sprint. Pick the arm that fits; all three are low commitment and high signal.');
    const you = S.fig({ at: [-.6, -.1, 0], face: -Q, hair: 'curly', coat: 'ink', pants: 'paper', hands: { L: 'strap', R: 'chin' }, anim: 'nod' });
    const david = S.fig({ at: [1.5, .6, 0], face: Math.PI * .85, hair: 'short', coat: 'half', hands: { L: 'hip', R: { abs: [1.2, -.6, 2.5] } } });
    hov(you, 'halfday', 'Reading the signs', 'You, with a laptop bag and a question. Which first step is worth a half day?');
    hov(david, 'sprint1', 'Honest advice', 'David points at the arm that fits. Sometimes that is a call and nothing more; we tell you honestly whether we can help.');
    const bench = S.bench(-2.0, 1.4, Q, 1.6); const builder = S.fig({ at: [-2.0, 1.4, 0], face: Q, pose: 'sit', seat: .47, build: 'b', hair: 'bun', coat: 'paper', hands: { L: 'lap', R: 'lap' }, anim: 'type' });
    S.laptop(-1.65, 1.75, .52, Q + Math.PI); hov([bench, builder], 'sprint1', 'A focused sprint', 'Someone who picked the sprint, already building on the bench.');
    S.tree(2.8, -1.9, 2.5, 1.1); S.bag(-1.2, .5, -Q);
  } },
  // 2 · build together, one leader: a table under a tree, David alongside
  { door: [-2.6, 2.5], build(S) {
    S.pad([[-3.5, -2.5], [3.5, -2.5], [3.5, 2.5], [-3.5, 2.5]], 'white'); S.shade(1.6, -.9, 1.3);
    const table = S.table(-1.1, -.9, 2.3, .9, .74); S.stool(-.3, -1.35, .46);
    const leader = S.fig({ at: [-.3, -1.35, 0], face: Math.PI / 2, pose: 'sit', seat: .46, build: 'b', hair: 'bob', coat: 'ink', pants: 'paper', skirt: 'ink', hands: { L: 'type', R: 'type' }, anim: 'type' });
    const laptop = S.laptop(-.3, -.6, .74, -Math.PI / 2);
    const david = S.fig({ at: [1.15, -1.55, 0], face: Math.PI / 2 + .5, hair: 'short', coat: 'half', lean: .16, hands: { L: 'hip', R: { abs: [.1, -.7, 1.05] } }, anim: 'point' });
    hov([leader, laptop], 'sherpa', 'Sherpa', 'Eight to ten weeks, one to one. A leader builds a workflow that solves a real problem, and keeps it. Starts with a diagnostic call.');
    hov(david, 'coach', 'Alongside', 'That is usually David. Pointing at the thing you just built, and at the next thing.');
    const books = S.books(.85, -.3, .74, 4, .2); hov(books, 'stretch', 'Stretch', 'For experienced users: the stack on the table is where prompts become agentic workflows and team-level patterns.');
    const bag = S.bag(-1.7, .7, Q); hov(bag, 'foundations', 'Workplace AI foundations', 'The bag by the table belongs to someone early in their career, learning AI on real tasks, not demos.');
    S.mug(-.85, -.4, .74); S.chair(-1.6, -.45, 0, {});
    S.tree(2.4, -1.8, 2.8, 1.25); S.plant(-2.9, 1.3, .8);
  } },
  // 3 · build together, the team: a room with a long table, a whiteboard and a workbench
  { door: [-3.4, 3.0], build(S) {
    S.pad([[-4.5, -3], [4.5, -3], [4.5, 3], [-4.5, 3]], 'white');
    S.wall(-4.5, -3.05, 4.5, -2.9, 2.4, { south: 'paper' });
    const board = S.board(-3.9, -2.9, .9, 3.2, 1.1, 'x', { lines: [[.3, .84, .45], [.3, .74, .3], [.3, .64, .5]], diagram: [.36, .38], circle: [.66, .3], notes: [[.82, .78, 'shade2', .1], [.9, .78, 'ink', -.08], [.82, .64, 'ink', .05], [.9, .64, 'shade2', .12], [.86, .5, 'shade2', -.1]] });
    const fac = S.fig({ at: [-4.3, -2.4, 0], face: -Math.PI / 2, hair: 'cap', coat: 'half2', hands: { L: 'hip', R: 'write' }, anim: 'write' });
    hov([board, fac], 'board', 'Diagnose first', 'Diagnose first, prescribe second. The right application emerges from your workflows and constraints, not a playbook.');
    const table = S.table(-3.1, -1.0, 3.8, 1.0, .74); const team = [table];
    [[-2.4, 'short', 'half'], [-1.3, 'bun', 'ink'], [-.2, 'curly', 'paper']].forEach(([x, hair, coat], i) => { team.push(S.fig({ at: [x, -1.45, 0], face: Math.PI / 2, pose: 'sit', seat: .46, build: i === 1 ? 'b' : 'a', skirt: i === 1 ? 'half2' : null, hair, coat, pants: i === 1 ? 'paper' : 'ink', hands: i === 2 ? { L: 'lap', R: 'raise' } : { L: 'type', R: 'type' }, anim: i === 2 ? 'raise' : 'type', phase: i })); S.laptop(x, -.75, .74, -Math.PI / 2); S.stool(x, -1.45, .46); });
    [[-1.9, 'long', 'stripe'], [-.8, 'short', 'ink'], [.3, 'tied', 'half2']].forEach(([x, hair, coat], i) => { S.chair(x, .45, -Math.PI / 2); team.push(S.fig({ at: [x, .45, 0], face: -Math.PI / 2, pose: 'sit', seat: .46, build: i === 1 ? 'a' : 'b', skirt: i === 0 ? 'ink' : null, hair, coat, pants: i === 1 ? 'half2' : 'ink', hands: { L: 'type', R: 'type' }, anim: 'type', phase: i + 3 })); S.laptop(x, -.28, .74, Math.PI / 2); });
    S.mug(-2.8, -.5, .74); S.mug(.5, -.6, .74, false);
    hov(team, 'workshops', 'Team workshops', 'A long table, a half day or a full day. No lectures: everyone builds something useful and applies it on Monday.');
    const bench = S.table(1.6, .3, 1.7, .8, .9); S.monitor(2.6, .5, .9, Math.PI / 2, .5, .32); S.slab([1.95, .7], 0, .14, .1, .9, 1.08, { top: 'half2', east: 'paper', south: 'half' });
    const b1 = S.fig({ at: [2.0, 1.5, 0], face: -Math.PI / 2, build: 'b', hair: 'bob', coat: 'paper', lean: .22, hands: { L: { abs: [1.85, 1.0, .95] }, R: { abs: [2.1, 1.0, .95] } } });
    const b2 = S.fig({ at: [3.5, 1.6, 0], face: -Math.PI / 2 - .5, hair: 'curly', coat: 'half', hands: { L: 'cross', R: 'point' }, anim: 'point' });
    hov([bench, b1, b2], 'sprints', 'Practical sprints', 'The bench: two to four weeks on one workflow or capability gap, built and tested with your team, then handed off with your people owning it.');
    S.plant(3.9, -2.3, 1.0); S.plant(-4.0, 2.2, .7);
  } },
  // 4 · learn fast: the hut where the recipes come from
  { door: [-2.6, 2.5], build(S) {
    S.pad([[-3.5, -2.5], [3.5, -2.5], [3.5, 2.5], [-3.5, 2.5]], 'white');
    S.wall(-3.5, -2.55, 3.5, -2.4, 2.4, { south: 'paper' }); S.wall(-3.62, -2.55, -3.5, 1.6, 2.4, { east: 'paper' });
    const peg = S.pegboard(-3.49, -1.9, 1.0, 2.1, 1.0, 'y'); hov(peg, 'ios', 'IntelligenceOS', 'The pegboard: an agentic operating system for running a company, every tool in its place. Open source, for you to customise.');
    S.window(.5, -2.4, 1.05, 1.2, .85, 'x', { weather: 'rain' }); S.box(.35, -2.4, 1.85, -2.15, .85, .92, { top: 'white', east: 'paper', south: 'half' }, -1.5);
    const seeds = S.seedlings(.6, -2.3, .92, 4, 'x'); hov(seeds, 'groundwork', 'Groundwork', 'On the sill: seedlings. Groundwork works out which experiments to run, what to learn before you commit, and where the investment goes.');
    S.stove(-3.0, -2.2, 3.0, .7, .9); const kettle = S.kettle(-2.35, -1.75, .9, -Math.PI / 2); hov(kettle, 'cookbook', 'The kettle', 'Always on. Most recipes start with a question and a cup of tea.');
    const pot = S.pot(-1.3, -1.78, .9, .15); hov(pot, 'cookbook', 'AI Cookbook', 'The stove. Every recipe was cooked here first, on a real problem, then written down on Substack.');
    const cook = S.fig({ at: [-1.3, -.95, 0], face: -Math.PI / 2, build: 'b', hair: 'bun', coat: 'paper', pants: 'ink', lean: .1, hands: { L: { abs: [-1.8, -1.6, .95] }, R: 'hold' }, anim: 'stir' });
    hov(cook, 'cookbook', 'Cooking', 'Recipes are written from real use, then shared.');
    const table = S.table(-.3, -.4, 1.5, .8, .74); S.chair(.45, -.85, Math.PI / 2);
    const reader = S.fig({ at: [.45, -.85, 0], face: Math.PI / 2, pose: 'sit', seat: .46, hair: 'short', coat: 'half', hands: { L: 'type', R: 'type' }, anim: 'type' });
    S.laptop(.45, -.1, .74, -Math.PI / 2);
    const card = S.slab([.9, .25], Q, .1, .14, .74, .755, { top: 'white', east: 'paper', south: 'half' }); hov(card, 'assess', 'The self-assessment', 'Ten questions, ten minutes: where you sit on the spectrum, and which path fits. It is a mirror, not a grade.');
    hov([table, reader], 'cookbook', 'Between sessions', 'Reading a recipe, trying it on your own work.');
    S.shelf(1.9, -2.15, 1.3, .35, 1.9, 3); S.plant(2.9, 1.6, .9);
  } },
  // 5 · extend across the organization: an open floor, a mezzanine, a way in on every level
  { door: [-3.4, 3.0], build(S) {
    S.pad([[-5, -3.5], [5, -3.5], [5, 3.5], [-5, 3.5]], 'white');
    S.wall(-5, -3.55, 5, -3.4, 2.2, { south: 'paper' });
    const plat = S.platform(-5, -3.4, -2.2, -1.6, 1.6); S.rail(-5, -1.6, -2.2, -1.6, .95, 1.6); S.rail(-2.2, -3.4, -2.2, -1.6, .95, 1.6);
    S.stairs(-.4, -2.55, Math.PI, 7, 1.0, .225, .26); S.flag(-4.7, -3.2, 2.6, 1.6);
    const look = S.fig({ at: [-3.7, -2.5, 1.6], face: Q, hair: 'short', coat: 'half', hands: { L: 'hip', R: 'point' }, anim: 'point' });
    const frac = S.fig({ at: [-2.65, -3.0, 1.6], face: Q + .2, build: 'b', hair: 'long', coat: 'ink', pants: 'paper', skirt: 'half2', hands: { L: 'cross', R: 'cross' }, anim: 'nod' });
    hov([plat, look], 'advisory', 'The lookout', 'Advisory is the view from here: the whole organization, which experiments are working, and where the next build goes.');
    hov(frac, 'fractional', 'Fractional AI leadership', 'Part-time, embedded. Strategy, execution and team development under one roof, before the full-time hire.');
    const table = S.table(-1.2, -1.3, 2.6, 1.0, .74); const crew = [table];
    [[-.7, 'curly', 'ink', 'paper'], [.6, 'bun', 'half', 'ink']].forEach(([x, hair, coat, pants], i) => { S.stool(x, -1.75, .46); crew.push(S.fig({ at: [x, -1.75, 0], face: Math.PI / 2, pose: 'sit', seat: .46, build: i ? 'b' : 'a', skirt: i ? 'ink' : null, hair, coat, pants, hands: { L: 'type', R: 'type' }, anim: 'type', phase: i })); S.laptop(x, -1.05, .74, -Math.PI / 2); });
    [[-.2, 'short', 'half2'], [1.0, 'cap', 'stripe']].forEach(([x, hair, coat], i) => { S.chair(x, .15, -Math.PI / 2); crew.push(S.fig({ at: [x, .15, 0], face: -Math.PI / 2, pose: 'sit', seat: .46, hair, coat, hands: { L: 'type', R: 'type' }, anim: 'type', phase: i + 2 })); S.laptop(x, -.58, .74, Math.PI / 2); });
    hov(crew, 'builds', 'Strategic builds', 'Custom tools, agents and workflows, built from the strategic question down. The build is the deliverable; the thinking is what makes it valuable.');
    const easel = S.easel(3.2, -2.0, Q, 1.4, 1.3, { notes: [[.14, .74, 'shade2', .1], [.3, .74, 'ink', -.06], [.46, .74, 'shade2', .08], [.62, .74, 'ink', -.1], [.14, .5, 'ink', -.05], [.3, .5, 'shade2', .12], [.62, .5, 'shade2', .04]], lines: [[.1, .28, .5], [.1, .18, .7]], diagram: [.55, .12] });
    const a1 = S.fig({ at: [2.5, -.9, 0], face: Q + Math.PI, build: 'b', hair: 'tied', coat: 'half', skirt: 'ink', hands: { L: 'hip', R: 'write' }, anim: 'write' });
    const a2 = S.fig({ at: [3.95, -1.0, 0], face: Q + Math.PI + .4, hair: 'short', coat: 'ink', pants: 'paper', hands: { L: 'chin', R: 'cross' }, anim: 'nod' });
    hov([easel, a1, a2], 'advisory', 'Advisory', 'A thinking partner who is also a builder, for the decisions about tools, workflows, team structure and investment.');
    const desk = S.table(1.9, .15, 1.5, .8, .74); S.monitor(2.45, .35, .74, Math.PI / 2, .6, .36); S.monitor(3.05, .35, .74, Math.PI / 2 + .3, .5, .32); S.chair(2.6, 1.25, -Math.PI / 2);
    const dev = S.fig({ at: [2.6, 1.25, 0], face: -Math.PI / 2, pose: 'sit', seat: .46, hair: 'curly', coat: 'half2', hands: { L: 'type', R: 'type' }, anim: 'type', phase: 5 });
    hov([desk, dev], 'builds', 'The build', 'Not build-to-spec. We start with the strategic question, then build what delivers the outcome.');
    const w1 = S.fig({ at: [-4.6, 3.05, 0], face: 0, pose: 'walk', hair: 'short', coat: 'paper', hands: { L: 'carry' }, bias: 40, phase: 1 });
    const w2 = S.fig({ at: [-4.6, 3.05, 0], face: 0, pose: 'walk', build: 'b', hair: 'bob', coat: 'half', pants: 'paper', skirt: 'half2', hands: { R: 'strap' }, bias: 40, phase: 2.5 });
    S.movers = [{ F: w1, dir: [1, 0, 0], len: 9.0, speed: .5, lag: 0 }, { F: w2, dir: [1, 0, 0], len: 9.0, speed: .5, lag: 4.6 }];
    hov([w1, w2], 'systems', 'Repeatable systems', 'The patterns we build together become systems your team sustains without us. That is the point of the climb.');
    S.plant(4.3, -2.9, 1.0); S.plant(-4.3, 2.6, .8);
  } },
  // 6 · then the next workflow: a cairn, and someone walking on
  { door: [-1.4, 1.6], build(S) {
    S.pad([[-2.5, -2], [2.5, -2], [2.5, 2], [-2.5, 2]], 'paper'); S.shade(1.9, -1.0, 1.0);
    const cairn = S.cairn(.1, .2); hov(cairn, 'cairn', 'The next workflow', 'Build first. Learn fast. Repeat.');
    const walker = S.fig({ at: [-1.2, 1.0, 0], face: Q, pose: 'walk', hair: 'curly', coat: 'ink', pants: 'paper', hands: { L: 'strap', R: 'wave' }, anim: 'wave' });
    hov(walker, 'cairn', 'Onward', 'Fluency is personal before it is organizational. Then the next workflow.');
    S.tree(1.9, -1.4, 2.4, 1.0);
  } },
];
