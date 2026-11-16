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
  { step: 4, slug: 'builds', name: 'What we build', who: 'For a system you run', line: 'AI agents and software, built around how your business works.' },
];

const swatch = ['', 'var(--terracotta)', 'var(--ochre)', 'var(--sage)', 'var(--blue)'];

export function stairs(cls = '', step) {
  const s = step ? ` data-step="${step}"` : '';
  return `<div class="stairs ${cls}"${s} aria-hidden="true"><i></i><i></i><i></i><i></i></div>`;
}

function nav(current) {
  const is = (p) => (current === p || current.startsWith(p + '/') ? ' aria-current="page"' : '');
  const learnLinks = OFFERS.filter((o) => o.slug !== 'builds').map(
    (o) => `<a href="/${o.slug}"${is('/' + o.slug)}><i class="sw" style="background:${swatch[o.step]}"></i><span><span class="t">${o.name}</span><span class="d">${o.line}</span></span></a>`
  ).join('');
  return `
<nav class="nav" id="nav" aria-label="Main">
  <a href="/builds"${is('/builds')}>What we build</a>
  <div class="has-menu"><a href="/coaching"${['/coaching', '/workshops', '/sprints'].includes(current) ? ' aria-current="page"' : ''}>Coaching and workshops</a><div class="menu">${learnLinks}</div></div>
  <a href="/how-we-work"${is('/how-we-work')}>How we work</a>
  <a href="/work"${is('/work')}>Work</a>
  <a href="/about"${is('/about')}>About</a>
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
    <a class="button cta" href="${SITE.calendar}">Book a 30-minute conversation</a>
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
      <p>AI agents and software for banks, insurers, healthcare and schools. Richmond, Virginia.</p>
    </div>
    <div>
      <h4>What we do</h4>
      <ul><li><a href="/builds">What we build</a></li><li><a href="/looking-after">How we look after what we build</a></li>${OFFERS.filter((o) => o.slug !== 'builds').map((o) => `<li><a href="/${o.slug}">${o.name}</a></li>`).join('')}</ul>
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

export const ctaBand = ({ title = 'Tell us what you’re working on.', text = 'A first conversation is thirty minutes and costs nothing. We’ll tell you honestly whether we can help, and what we’d try first.', primary = ['Book a 30-minute conversation', SITE.calendar], secondary = ['Email instead', `mailto:${SITE.email}`] } = {}) => `
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

// "Our clients" block, shared by Home, Coaching and Work.
export const clientsBlock = (num = '', text = 'Since the beginning of 2026, we’ve worked with more than 10 clients across seven industries, from global enterprises to solopreneurs. One of them has probably faced a challenge your shape. Ask to speak to them, and they’ll tell you what working with us is like.') => `
<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div>${num ? `<span class="num">${num}</span>` : ''}<h2>Our clients.</h2></div>
      <div class="prose">
        <p class="lede">${text}</p>
        <div class="actions"><a class="button" href="mailto:${SITE.email}?subject=${encodeURIComponent('I’d like to speak to a client')}">Ask to speak to a client <span class="arrow">→</span></a></div>
      </div>
    </div>
  </div>
</section>`;
