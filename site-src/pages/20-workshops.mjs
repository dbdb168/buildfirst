import { SITE, stairs, quote, ctaBand } from '../layout.mjs';
import { Q } from '../quotes.mjs';

export default {
  path: '/workshops',
  title: 'Workshops for leadership teams',
  description: 'One hands-on day for a leadership team. Everyone builds something personal first, then something for the work, inside your own tools and rules.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">Workshops · For a leadership team</div>
    <h1>Get your leadership team building together.</h1>
    <p class="dek">One hands-on day. Everyone builds, nobody watches. Your team leaves with working tools, a shared language and three or four experiments to take back.</p>
    <div class="actions">
      <a class="button" href="${SITE.calendar}">Talk about a workshop <span class="arrow">→</span></a>
      <a class="textlink" href="/sprints">Need prototypes instead? See sprints</a>
    </div>
  </div>
  ${stairs('small', 2)}
</section>

<section class="section">
  <div class="wrap">
    <div class="facts">
      <div><div class="label">Who it’s for</div><div class="v">A leadership team, usually six to fifteen people</div></div>
      <div><div class="label">How long</div><div class="v">One day, in person</div></div>
      <div><div class="label">What you need</div><div class="v">The AI tools your company already allows</div></div>
      <div><div class="label">You leave with</div><div class="v">Working tools, shared vocabulary and committed experiments</div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">01</span><h2>Why a team, and why a day.</h2></div>
      <div class="prose">
        <p class="lede">A team that has built together talks about AI differently. The questions get sharper, and the room stops waiting for someone else to go first.</p>
        <p>Most leadership teams have one or two people who are ahead and a few who are quietly sceptical. A slide deck doesn’t close that gap. An afternoon of everyone building does.</p>
        <div class="contrast">
          <div class="today"><div class="k">Today</div><p>AI comes up at every offsite. The conversation stays general, and nobody wants to look foolish in front of their peers.</p></div>
          <div class="tomorrow"><div class="k">Imagine instead</div><p>Everyone in the room has built something by lunch. The afternoon is about your real work, and the real organisational questions finally come out.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>One day, in three acts.</h2></div>
      <p class="lede">Before the day, we talk to the sponsor and build every exercise ourselves inside your constraints, so nothing breaks on the day because of a tool you’re not allowed to use.</p>
    </div>
    <div class="steps">
      <div class="stepline"><div><div class="n">1</div><div class="dur">Morning</div></div><div><h3>The art of the possible.</h3><p>Everyone builds something personal and low-stakes first, so people can play without feeling exposed in front of each other. By the break, the room has stopped being an audience.</p></div></div>
      <div class="stepline"><div><div class="n">2</div><div class="dur">Midday</div></div><div><h3>Grounding.</h3><p>Where AI earns its place, what’s real and what’s hype, and what governance you actually need. This is where the organisational questions surface, including the ones people don’t usually say out loud.</p></div></div>
      <div class="stepline"><div><div class="n">3</div><div class="dur">Afternoon</div></div><div><h3>A prototype for the work.</h3><p>Each person picks something they would happily hand off, and builds a first version of it. The team ends the day by agreeing three or four experiments to take back.</p></div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="split">
      <div><span class="num">03</span><h2>In practice.</h2></div>
      <div class="stack-gap">
        <div class="case" data-c="2"><div class="label">Workshop · Fortune 500 bank</div><h3>Thirteen engineering leaders, one day, everyone built.</h3><p>A senior engineering leadership team worked through all three acts inside the bank’s own AI tools and rules. Every exercise had been tested against those rules beforehand. The team left with working tools and a list of experiments, and a new conversation about how their work gets done.</p></div>
        ${quote(Q.makingUsThink)}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">04</span><h2>What the team leaves with.</h2></div>
      <div class="prose">
        <ul class="squares">
          <li><strong>Working tools.</strong> Small, real things each person built and can keep using on Monday.</li>
          <li><strong>A shared language.</strong> The same words for what AI is good at, where it fails and how to check its work.</li>
          <li><strong>Committed experiments.</strong> Three or four, each with an owner, chosen by the team.</li>
          <li><strong>The real questions.</strong> Governance, roles, what to stop doing. Written down, so they don’t disappear after the day.</li>
        </ul>
        <div class="callout"><p>When a team wants to go further, the next step is usually a <a href="/sprints">sprint</a> on two or three of the problems that came up, or <a href="/coaching">coaching</a> for the leaders who will carry it.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">05</span><h2>Questions people ask.</h2></div>
      <div class="faq">
        <details><summary>Our people aren’t technical. Does that matter?</summary><p>No. The day is designed for leaders, not engineers. Everyone builds in plain language, and the first exercise is chosen so nobody gets stuck.</p></details>
        <details><summary>We have strict rules about AI tools.</summary><p>Good. We design the day inside them. If your company only allows one tool, we use that one, and we test every exercise in it before we arrive.</p></details>
        <details><summary>Can it be shorter?</summary><p>We can shape the day around your calendar, but the three acts matter. Cut the building and you’re back to a presentation.</p></details>
        <details><summary>What happens after the day?</summary><p>We send back what the team built and agreed, and check in on the experiments. Some teams stop there. Others ask for a sprint.</p></details>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Bring your team into one room.', text: 'Tell us who would be in it and what’s on their minds. We’ll tell you honestly whether a day together is the right start.' })}
`,
};
