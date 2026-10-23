import { OFFERS, SITE, stairs, quote, ctaBand } from '../layout.mjs';
import { Q } from '../quotes.mjs';

const offerCards = OFFERS.map((o) => `
  <a class="offer" href="/${o.slug}">
    <span class="step">${o.step}</span>
    <span class="who">${o.who}</span>
    <h3>${o.name}</h3>
    <p>${o.line}</p>
    <span class="go">See how it works <span>→</span></span>
  </a>`).join('');

export default {
  path: '/',
  title: 'Learn AI by building with it',
  description: 'Hands-on AI coaching, workshops, sprints and builds for leaders and the businesses they run. You build something real from the first session.',
  body: `
<section class="hero">
  <div class="wrap">
    <div class="eyebrow">Hands-on AI for leaders</div>
    <h1>You’ve got a business to run. Now you’ve got to work out AI, too.</h1>
    <p class="dek">Reading about AI was never going to show you what it can do. To lead your team through this, you have to have used it yourself. That’s what we help you do.</p>
    <div class="actions">
      <a class="button" href="/contact">Start a conversation <span class="arrow">→</span></a>
      <a class="textlink" href="/assessment">Take the ten-minute assessment</a>
    </div>
  </div>
  ${stairs()}
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">01</span><h2>The question every leader is being asked.</h2></div>
      <div>
        <div class="question">
          <div class="label">Someone asks</div>
          <div class="q">So what are we actually doing with AI?</div>
        </div>
        <div class="contrast">
          <div class="today"><div class="k">Too often</div><p>The answer is a vendor’s slide, a pilot that stalled, and a leader who has read everything and built nothing.</p></div>
          <div class="tomorrow"><div class="k">Imagine instead</div><p>You answer from your own hands: what you built, what broke, what’s worth doing next, and what to leave alone.</p></div>
        </div>
        <p class="lede" style="margin-top:28px">You can talk about AI. Fluency comes from building something yourself, watching it work and watching it break, until you know what’s real and what’s noise. That judgement is what the decisions in front of you need.</p>
      </div>
    </div>
  </div>
</section>

<section class="section cover" id="offers">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>Four ways to start. Each one earns the next.</h2></div>
      <p class="lede">Most people start on the first step, with a few weeks of coaching. Many keep climbing: the tools they build in coaching become the brief for a sprint or a build.</p>
    </div>
    <div class="offers">${offerCards}</div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="split">
      <div><span class="num">03</span><h2>In their words.</h2><p class="lede" style="margin-top:18px">Quiet things clients have said along the way. We keep names out of it; most of this work happens under NDA.</p><p style="margin-top:24px"><a class="textlink" href="/work">See the work</a></p></div>
      <div class="stack-gap">
        ${quote(Q.realLifePrompt, true)}
        ${quote(Q.thinkTank)}
        ${quote(Q.notTooSoon)}
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">04</span><h2>Build first. Learn fast. Repeat.</h2></div>
      <p class="lede">The name is the method. We get something real into your hands early, learn from the people who use it, and go round again. Nothing gets bigger until it has earned it.</p>
    </div>
    <div class="loop">
      <div><div class="w">Build.</div><p>Start with a real problem and make a first version in hours, on made-up data, so nothing is at risk.</p></div>
      <div><div class="w">Learn.</div><p>Put it in front of the people who would use it. What they do with it tells you more than any plan.</p></div>
      <div><div class="w">Repeat.</div><p>Refine, then decide together: keep building, buy something instead, or stop and rethink.</p></div>
    </div>
    <p style="margin-top:40px"><a class="textlink" href="/how-we-work">How we work</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">05</span><h2>Real work, in regulated places.</h2></div>
      <p class="lede">Banks, insurers, healthcare and schools. Places where privacy, review and a human making the call are not optional.</p>
    </div>
    <div class="cases">
      <div class="case" data-c="4"><div class="label">Build · Healthcare technology</div><h3>A procurement watch for a sales team.</h3><p>An agent that reads state procurement sources twice a day and tells sellers what changed and why it matters. It passed the company’s security, legal and insurance reviews and now runs every month.</p></div>
      <div class="case" data-c="1"><div class="label">Coaching · Regional banking</div><h3>A working tool in the first session.</h3><p>Senior bankers who had read plenty about AI built their own tools in session one. One took what they built straight into a board conversation.</p></div>
      <div class="case" data-c="2"><div class="label">Workshop · Fortune 500 bank</div><h3>An engineering leadership team, building together.</h3><p>A day in three acts. Everyone built something personal first, then something for the work, inside the bank’s own tools and rules.</p></div>
      <div class="case" data-c="3"><div class="label">Build · Special education</div><h3>From paper program books to a living record.</h3><p>Teachers capture sessions once. A copilot runs the school’s own decision protocol and suggests the next step. A person always makes the call.</p></div>
    </div>
    <p style="margin-top:36px"><a class="textlink" href="/work">More about the work</a></p>
  </div>
</section>

<section class="section cover">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">06</span><h2>The AI Cookbook.</h2></div>
      <p class="lede">What we’re building and learning, written down as we go. What works, what breaks, and what we’d do differently.</p>
    </div>
    <div class="posts" data-cookbook="4">
      <a class="post" href="${SITE.substack}"><div class="label">Recipe</div><h3>Start with a real problem</h3></a>
      <a class="post" href="${SITE.substack}"><div class="label">Essay</div><h3>The three principles of adoption</h3></a>
      <a class="post" href="${SITE.substack}"><div class="label">Essay</div><h3>Put authority close to the work</h3></a>
      <a class="post" href="${SITE.substack}"><div class="label">Essay</div><h3>Small but mighty teams</h3></a>
    </div>
    <p style="margin-top:36px"><a class="textlink" href="${SITE.substack}">Read The AI Cookbook</a></p>
  </div>
</section>

${ctaBand()}
`,
};
