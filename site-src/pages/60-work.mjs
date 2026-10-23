import { stairs, quote, ctaBand } from '../layout.mjs';
import { Q } from '../quotes.mjs';

export default {
  path: '/work',
  title: 'Work',
  description: 'Coaching, workshops and builds for banks, insurers, healthcare and schools. Anonymised, because most of it happens under NDA.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">Work</div>
    <h1>Most of it under NDA. All of it real.</h1>
    <p class="dek">Banks, insurers, healthcare and schools. Places where privacy, review and a human making the call are not optional. We keep names out of it unless a client says otherwise.</p>
  </div>
  ${stairs('small')}
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">01</span><h2>Coaching.</h2></div>
      <p class="lede">Senior leaders building their own tools, and their own judgement.</p>
    </div>
    <div class="cases">
      <div class="case" data-c="1"><div class="label">Technology executive · Financial services</div><h3>From reading about it to building with it.</h3><p>A senior technology leader built a personal decision tool in the first session, and went on to lead their own team’s tooling decisions from experience.</p></div>
      <div class="case" data-c="1"><div class="label">Commercial banking executive</div><h3>A working tool in the first session.</h3><p>In session one, a commercial banking leader built a tool to think a real problem through, and saved time doing it. By the third session, it felt like a think tank.</p></div>
      <div class="case" data-c="1"><div class="label">Chief executive · Insurance brokerage</div><h3>Coaching that turned into a dashboard.</h3><p>What started as sessions on the chief executive’s own work became a growth dashboard, a prospecting prototype and a two-lane plan for AI across the business.</p></div>
    </div>
    <div class="quotes" style="margin-top:40px">
      ${quote(Q.realLifePrompt)}
      ${quote(Q.thinkTank)}
      ${quote(Q.spotOn)}
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>Workshops and working sessions.</h2></div>
      <p class="lede">Teams building together, inside their own tools and rules.</p>
    </div>
    <div class="split">
      <div class="case" data-c="2"><div class="label">Workshop · Fortune 500 bank</div><h3>An engineering leadership team, building together.</h3><p>Thirteen senior engineering leaders, one day, three acts. Everyone built something personal first, then something for the work, inside the bank’s own AI tools and rules.</p></div>
      <div class="stack-gap">${quote(Q.makingUsThink)}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">03</span><h2>Builds.</h2></div>
      <p class="lede">Systems that run every day, each one started as a prototype.</p>
    </div>
    <div class="cases">
      <div class="case" data-c="4"><div class="label">Healthcare technology</div><h3>A procurement watch for sellers.</h3><p>An agent reads state procurement sources twice a day and tells sellers what changed and why it matters. It went through enterprise security, legal and insurance review, now runs every month and is spreading across product lines.</p></div>
      <div class="case" data-c="4"><div class="label">Special education</div><h3>From paper program books to a living record.</h3><p>Session data captured once. A copilot that runs the school’s own decision protocol and suggests the next step, never makes it. Build or buy weighed honestly, and privacy settled before any real data.</p></div>
      <div class="case" data-c="4"><div class="label">Insurance · Investor relations</div><h3>A creative engine for an annual event.</h3><p>A design system, a prompt library and an automated email pipeline into the company’s own systems, with two human review points before anything goes out.</p></div>
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
      <div><span class="num">04</span><h2>And our own.</h2></div>
      <div class="prose">
        <p class="lede">We run our own work on what we build. A personal operating system of small agents handles the admin of a busy life: auditable, with the least access it needs, and a person in the loop.</p>
        <p>We write about what works and what breaks in <a href="/writing">The AI Cookbook</a>.</p>
      </div>
    </div>
  </div>
</section>

${ctaBand()}
`,
};
