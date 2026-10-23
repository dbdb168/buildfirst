// Shared page shell for the BuildFirst site: head, header, footer.
// Every page in site-src/pages/ exports { path, title, description, body, ground, head }.

export const SITE = {
  name: 'BuildFirst',
  url: 'https://buildfirst.io',
  email: 'david@thisisluminary.co',
  calendar: 'https://calendar.app.google/DEAg4TgAgrToVEvx7',
  linkedin: 'https://www.linkedin.com/in/dbeath/',
  substack: 'https://theaicookbook.substack.com',
  // Draft builds carry a review banner and noindex. Set REVIEW=0 for the real deploy.
  review: process.env.REVIEW !== '0',
};

export const OFFERS = [
  { step: 1, slug: 'coaching', name: 'Coaching', who: 'For one leader, or two', line: 'Eight sessions, one to one. You build something real from the first.' },
  { step: 2, slug: 'workshops', name: 'Workshops', who: 'For a leadership team', line: 'One hands-on day. Everyone builds, nobody watches.' },
  { step: 3, slug: 'sprints', name: 'Sprints', who: 'For your real problems', line: 'Two days, three problems, working prototypes your people built.' },
  { step: 4, slug: 'builds', name: 'Builds', who: 'For a system you run', line: 'Prototype first, then a pilot, then the real thing.' },
];

const swatch = ['', 'var(--terracotta)', 'var(--ochre)', 'var(--sage)', 'var(--blue)'];

export function stairs(cls = '', step) {
  const s = step ? ` data-step="${step}"` : '';
  return `<div class="stairs ${cls}"${s} aria-hidden="true"><i></i><i></i><i></i><i></i></div>`;
}

function nav(current) {
  const is = (p) => (current === p || current.startsWith(p + '/') ? ' aria-current="page"' : '');
  const offerLinks = OFFERS.map(
    (o) => `<a href="/${o.slug}"${is('/' + o.slug)}><i class="sw" style="background:${swatch[o.step]}"></i><span><span class="t">${o.name}</span><span class="d">${o.line}</span></span></a>`
  ).join('');
  return `
<nav class="nav" id="nav" aria-label="Main">
  <div class="has-menu"><a href="/#offers"${OFFERS.some((o) => current === '/' + o.slug) ? ' aria-current="page"' : ''}>What we do</a><div class="menu">${offerLinks}</div></div>
  <a href="/how-we-work"${is('/how-we-work')}>How we work</a>
  <a href="/work"${is('/work')}>Work</a>
  <a href="/about"${is('/about')}>About</a>
  <a href="/writing"${is('/writing')}>Writing</a>
</nav>`;
}

export function layout(page) {
  const { path, title, description, body, ground = 'cover', head = '' } = page;
  const fullTitle = path === '/' ? `BuildFirst · ${title}` : `${title} · BuildFirst`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${description}">
${SITE.review ? '<meta name="robots" content="noindex, nofollow">' : ''}
<link rel="canonical" href="${SITE.url}${path === '/' ? '/' : path}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#f3ede2">
<link rel="icon" href="/assets/site/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/site/fonts/BricolageGrotesque-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/site/fonts/Newsreader-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site/site.css">
${head ? head + '\n' : ''}${SITE.review ? '' : `<script async src="https://www.googletagmanager.com/gtag/js?id=G-MKWKYTLT70"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MKWKYTLT70');</script>`}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${SITE.review ? '<div class="review-banner">Draft for review. Not live, and the words are still open to change.</div>' : ''}
<header class="site-header${ground === 'paper' ? ' on-paper' : ''}">
  <div class="wrap">
    <a class="wordmark" href="/" aria-label="BuildFirst home"><span class="mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>BuildFirst</a>
    ${nav(path)}
    <a class="button cta" href="/contact">Start a conversation</a>
    <button class="menu-toggle" aria-controls="nav" aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div>
      <a class="wordmark" href="/"><span class="mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>BuildFirst</a>
      <p>Hands-on AI for leaders and the businesses they run. Build first, learn fast, repeat. Based in Richmond, Virginia.</p>
    </div>
    <div>
      <h4>What we do</h4>
      <ul>${OFFERS.map((o) => `<li><a href="/${o.slug}">${o.name}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h4>BuildFirst</h4>
      <ul>
        <li><a href="/how-we-work">How we work</a></li>
        <li><a href="/work">Work</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/writing">Writing and tools</a></li>
      </ul>
    </div>
    <div>
      <h4>Get in touch</h4>
      <ul>
        <li><a href="/contact">Start a conversation</a></li>
        <li><a href="mailto:${SITE.email}">Email</a></li>
        <li><a href="${SITE.linkedin}">LinkedIn</a></li>
        <li><a href="${SITE.substack}">The AI Cookbook</a></li>
      </ul>
    </div>
    <div class="base"><span>© 2026 BuildFirst, a trading name of DB8 LLC</span><span>Build first. Learn fast. Repeat.</span></div>
  </div>
</footer>
<script src="/assets/site/site.js" defer></script>
</body>
</html>
`;
}

// Small helpers the pages share.
export const quote = (q, big = false) => `
<figure class="quote${big ? ' big' : ''}">
  <blockquote>${q.text}</blockquote>
  <figcaption><b>${q.who}</b>${q.context || ''}</figcaption>
</figure>`;

export const ctaBand = ({ title = 'Tell us what you’re working on.', text = 'A first conversation is thirty minutes and costs nothing. We’ll tell you honestly whether we can help, and what we’d try first.', primary = ['Book a conversation', SITE.calendar], secondary = ['Email instead', `mailto:${SITE.email}`] } = {}) => `
<section class="cta-band">
  <div class="wrap">
    <h2>${title}</h2>
    <p class="lede">${text}</p>
    <div class="actions">
      <a class="button" href="${primary[1]}">${primary[0]} <span class="arrow">→</span></a>
      ${secondary ? `<a class="button ghost" href="${secondary[1]}">${secondary[0]}</a>` : ''}
    </div>
  </div>
  ${stairs('small')}
</section>`;
