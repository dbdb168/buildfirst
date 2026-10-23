import { SITE, stairs, quote, ctaBand } from '../layout.mjs';
import { Q } from '../quotes.mjs';

export default {
  path: '/builds',
  title: 'Builds: prototype first, then prove it',
  description: 'Custom AI systems built in steps. A prototype before you sign, then discovery, a pilot on real data and production, with a go or no-go at each step.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">Builds · For a system you run</div>
    <h1>You know what you need. We build it with you.</h1>
    <p class="dek">A working system for a real, costly problem, built in steps. You see a prototype before you sign anything, and you decide at every step whether to keep going.</p>
    <div class="actions">
      <a class="button" href="/build-intake.html">Tell us what you want to build <span class="arrow">→</span></a>
      <a class="textlink" href="${SITE.calendar}">Or book a conversation</a>
    </div>
  </div>
  ${stairs('small', 4)}
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">01</span><h2>A prototype before you sign.</h2></div>
      <div class="prose">
        <p class="lede">Tell us what you need in a few minutes. We’ll come to the first conversation with a prototype. Not a proposal, not a slide.</p>
        <p>It runs on made-up data, so nothing of yours is at risk. It won’t be finished, and it isn’t meant to be. It’s there so you can react to something real, and so we can both see whether we understand the problem.</p>
        <div class="contrast">
          <div class="today"><div class="k">The usual way</div><p>Weeks of discovery and a long proposal before anyone sees a thing. By the time it works, the problem has moved.</p></div>
          <div class="tomorrow"><div class="k">Our way</div><p>Something working on day one. Every step after that earns the next, and each one is priced when you get to it.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>Four steps. A decision at each.</h2></div>
      <p class="lede">Build first, learn from the people who use it, then go round again. Nothing gets bigger until it has earned it.</p>
    </div>
    <div class="steps">
      <div class="stepline"><div><div class="n">1</div><div class="dur">Two to six weeks</div></div><div><h3>Discovery to prototype.</h3><p>We work alongside the people who will use it, on made-up data. We look honestly at what’s already on the market. You get a working prototype, a written build-or-buy view and a plan for a pilot.</p></div></div>
      <div class="stepline"><div><div class="n">2</div><div class="dur">A few weeks, live</div></div><div><h3>A pilot on real data.</h3><p>The privacy, security and regulatory work comes first, before any real data is touched. Then a small group uses it on real work, and we measure what changes against how things were before.</p></div></div>
      <div class="stepline"><div><div class="n">3</div><div class="dur">Priced at the pilot’s end</div></div><div><h3>Production.</h3><p>Built and launched for everyone who needs it, priced from what the pilot showed. It can run in your own environment, or we can host and run it for you.</p></div></div>
      <div class="stepline"><div><div class="n">4</div><div class="dur">Monthly</div></div><div><h3>Run and improve.</h3><p>We keep it working, watch how it’s used and make it better. Building costs the most, improving costs less, and looking after it costs less again.</p></div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">03</span><h2>Every first step ends with a choice.</h2></div>
      <p class="lede">Whatever you choose, the groundwork is yours to keep.</p>
    </div>
    <div class="decide">
      <div class="build"><div class="k">Keep building</div><p>The prototype did what it needed to. We move to a pilot on real data.</p></div>
      <div class="buy"><div class="k">Buy instead</div><p>A product on the market does it well enough. We’ll tell you which, and what to ask the vendor.</p></div>
      <div class="stop"><div class="k">Stop and rethink</div><p>The idea needs work. Better to learn that now, while it’s cheap.</p></div>
    </div>
  </div>
</section>

<section class="section cover">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">04</span><h2>Four promises in every build.</h2></div>
      <p class="lede">Most of our builds are in places where privacy, review and a human making the call are not optional. So these come as standard.</p>
    </div>
    <div class="principles">
      <div class="principle"><h3>Your data stays in your hands.</h3><p>It lives where you decide, under the agreements you need, and the privacy work is done before anything real goes in.</p></div>
      <div class="principle"><h3>Your people are the editors.</h3><p>The system suggests. A person decides. Nothing important happens without someone checking it.</p></div>
      <div class="principle"><h3>Every answer shows its source.</h3><p>If the system says something, you can see where it came from, down to the page.</p></div>
      <div class="principle"><h3>We decide together.</h3><p>At every step, with the evidence on the table. You can stop whenever the evidence says stop.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">05</span><h2>Some of what we’ve built.</h2></div>
      <p class="lede">Most of it under NDA, so no names. All of it real.</p>
    </div>
    <div class="cases">
      <div class="case" data-c="4"><div class="label">Healthcare technology</div><h3>A procurement watch for sellers.</h3><p>An agent reads state procurement sources twice a day and tells sellers what changed and why it matters. It passed the company’s security, legal and insurance reviews, and now runs every month.</p></div>
      <div class="case" data-c="3"><div class="label">Special education</div><h3>From paper program books to a living record.</h3><p>Teachers capture sessions once. A copilot runs the school’s own decision protocol and suggests the next step. A person always makes the call.</p></div>
      <div class="case" data-c="2"><div class="label">Insurance · Investor relations</div><h3>A creative engine for an annual event.</h3><p>A design system and prompt library, and an email pipeline from copy to published campaign, with two points where a person reviews before anything goes out.</p></div>
      <div class="case" data-c="1"><div class="label">Insurance brokerage</div><h3>A growth dashboard that started in coaching.</h3><p>A chief executive built the first version in coaching sessions. It became a dashboard for the business and a prospecting prototype, and then a plan for where AI should help next.</p></div>
    </div>
    <div class="quotes two" style="margin-top:40px">
      ${quote(Q.battleCard)}
      ${quote(Q.soClose)}
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">06</span><h2>After the build.</h2></div>
      <div class="prose">
        <p class="lede">Some clients want us to keep running what we built. Some want a senior hand in the room as the work grows.</p>
        <ul class="squares">
          <li><strong>Run and improve.</strong> A fixed monthly arrangement to operate, maintain and enhance the system, with running costs passed through at cost.</li>
          <li><strong>A senior hand on a regular rhythm.</strong> Time with your leadership team on what to build next, what to buy and what to stop, for as long as it’s useful.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">07</span><h2>How a proposal arrives.</h2></div>
      <div class="prose">
        <p>Short, and about you. A few pages that start with what you told us and end with a small first step, a technical overview for your IT and security teams, and a short narrated video you can pass around. We send it ourselves, with a note.</p>
        <div class="callout"><p>Not sure a build is the right place to start? Many builds begin as something a leader made in <a href="/coaching">coaching</a>, or one of three prototypes from a <a href="/sprints">sprint</a>.</p></div>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Tell us what you want to build.', text: 'A few minutes describing the problem. We’ll bring a prototype to the first conversation.', primary: ['Start with the build form', '/build-intake.html'], secondary: ['Book a conversation', SITE.calendar] })}
`,
};
