import { SITE, stairs, ctaBand } from '../layout.mjs';
import { buildSteps, howWeBuild } from './00-home.mjs';

export default {
  path: '/builds',
  title: 'What we build',
  description: 'AI agents and software, built around how your business works. Built with the people who will use it, tested on real work, then launched.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">What we build</div>
    <h1>AI agents and software, built around how your business works.</h1>
    <p class="dek">Agents that find leads and do the checking. Software that takes paper, spreadsheets and manual steps out of the work. Built with the people who will use it, tested on real work, then launched.</p>
    <div class="actions">
      <a class="button" href="/build-intake">Describe what you want to build <span class="arrow">→</span></a>
      <a class="textlink" href="${SITE.calendar}">Book a 30-minute conversation</a>
    </div>
  </div>
  ${stairs('small', 4)}
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">01</span><h2>How a build works.</h2></div>
      <p class="lede">Each step is priced when you reach it. You can stop at any step.</p>
    </div>
    ${buildSteps(
      'Built on made-up data. You get something working to react to.',
      'We work alongside the people who will use it. You get a working prototype, a written build-or-buy view and a plan for a pilot.',
      'Privacy, security and regulatory work first. A small group uses it on real work. You get measured results against how things were.',
      'Built and launched for everyone who needs it, in your environment or hosted by us.',
    )}
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>How we build it.</h2></div>
    </div>
    ${howWeBuild}
  </div>
</section>

<section class="section cover">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">03</span><h2>Every step ends with a choice.</h2></div>
      <p class="lede">Whatever you choose, the groundwork is yours to keep.</p>
    </div>
    <div class="decide">
      <div class="build"><div class="k">Keep building</div><p>The prototype did what it needed to. We move to a pilot on real data.</p></div>
      <div class="buy"><div class="k">Buy instead</div><p>A product on the market does it well enough. We’ll tell you which, and what to ask the vendor.</p></div>
      <div class="stop"><div class="k">Stop and rethink</div><p>The idea needs work. Better to learn that now, while it’s cheap.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">04</span><h2>What we’ve built.</h2></div>
    </div>
    <div class="cases">
      <div class="case" data-c="4"><div class="label">Fortune 500 healthcare technology</div><h3>Sales leads, twice a day.</h3><p>An agent checks about 50 state procurement sources and delivers leads to sellers, with what changed and why it matters. Passed the company’s security, legal and insurance reviews. In production.</p></div>
      <div class="case" data-c="2"><div class="label">Fortune 500 insurer</div><h3>Event emails without the production grind.</h3><p>One draft becomes a finished, on-brand email inside the company’s CRM, with two human checks before anything goes out.</p></div>
      <div class="case" data-c="3"><div class="label">Special education school</div><h3>Less paper, problems spotted the same day.</h3><p>Paper program books become one live record that applies the school’s own rules and suggests the next step. A person decides. In build now.</p></div>
      <div class="case" data-c="1"><div class="label">Insurance brokerage</div><h3>Growth in one view.</h3><p>A dashboard built with the chief executive in coaching, then a prototype for finding new prospects.</p></div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">05</span><h2>After launch.</h2></div>
      <div class="prose">
        <p class="lede">Once a build is live, you choose how much to hand to us: run it yourself with our code and documentation, have us maintain it, or have us manage it end to end.</p>
        <p><a class="textlink" href="/looking-after">How we look after what we build</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">06</span><h2>How a proposal arrives.</h2></div>
      <div class="prose">
        <p>Short, and about you. A few pages that start with what you told us and end with a small first step, a technical overview for your IT and security teams, and a short narrated video you can pass around. We send it ourselves, with a note.</p>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Tell us what you want to build.', text: 'A few minutes describing the problem is enough to start.', primary: ['Describe what you want to build', '/build-intake'], secondary: ['Book a 30-minute conversation', SITE.calendar] })}
`,
};
