import { SITE, stairs, quote, ctaBand } from '../layout.mjs';
import { Q } from '../quotes.mjs';

export default {
  path: '/sprints',
  title: 'Two-day prototyping sprints',
  description: 'Two days, three of your real problems, working prototypes your own people built on safe made-up data. Then a clear read on what to pilot first.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">Sprints · For your real problems</div>
    <h1>Two days to a working prototype.</h1>
    <p class="dek">Your people bring three real problems. Two days later they have three working prototypes they built themselves, and a clear read on which one deserves a pilot.</p>
    <div class="actions">
      <a class="button" href="${SITE.calendar}">Talk about a sprint <span class="arrow">→</span></a>
      <a class="textlink" href="/builds">Already know what you need? See builds</a>
    </div>
  </div>
  ${stairs('small', 3)}
</section>

<section class="section">
  <div class="wrap">
    <div class="facts">
      <div><div class="label">Who it’s for</div><div class="v">Six to eight people: the people who know the problem, and the person who decides</div></div>
      <div><div class="label">How long</div><div class="v">Two days in the room, with careful preparation before</div></div>
      <div><div class="label">What you build on</div><div class="v">Made-up data shaped like yours, so nothing real is at risk</div></div>
      <div><div class="label">You leave with</div><div class="v">Three working prototypes and a brief for what comes next</div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">01</span><h2>Why two days is enough now.</h2></div>
      <div class="prose">
        <p class="lede">A working prototype used to take weeks. With AI it takes hours. That changes what a short, focused sprint can do.</p>
        <p>The design sprint is an old idea. We’ve compressed it for a world where the cost of building a first version has collapsed, so the people closest to the problem can build the answer themselves, with us beside them.</p>
        <div class="challenge">
          <div class="label">The question we start with</div>
          <div class="hmw">How might the people who live with this problem <em>build the first answer to it</em> by tomorrow afternoon?</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>Before, day one, day two.</h2></div>
      <p class="lede">Three small teams of two or three work in parallel, one problem each. One person is at the keyboard at a time, and the decision-maker is in the room.</p>
    </div>
    <div class="steps">
      <div class="stepline"><div><div class="n">0</div><div class="dur">Before</div></div><div><h3>We build it ourselves first.</h3><p>A conversation with the people involved, a sprint designed around your problems, made-up data shaped like your own, and a dry run of every build. We meet your IT team early so access and permissions are settled before anyone arrives.</p></div></div>
      <div class="stepline"><div><div class="n">1</div><div class="dur">Day one</div></div><div><h3>Name the problem, write the brief, start building.</h3><p>In the morning, the people who do the work name the real problem. In the afternoon, the decision-maker writes a short brief with us. By the end of the day, three prototypes are running.</p></div></div>
      <div class="stepline"><div><div class="n">2</div><div class="dur">Day two</div></div><div><h3>Refine and test with real users.</h3><p>Each team sharpens what they built and puts it in front of the people who would use it, for one to three rounds. What they do with it is the evidence.</p></div></div>
      <div class="stepline"><div><div class="n">3</div><div class="dur">After</div></div><div><h3>Decide what comes next.</h3><p>We write up what was built and learned, and the barriers the sprint surfaced, ranked. Then we decide together.</p></div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">03</span><h2>Three honest outcomes.</h2></div>
      <p class="lede">A sprint is there to help you decide. Whatever you choose, the prototypes and the groundwork are yours.</p>
    </div>
    <div class="decide">
      <div class="build"><div class="k">Keep building</div><p>One prototype is clearly worth more. It becomes the brief for a pilot on real data.</p></div>
      <div class="buy"><div class="k">Buy instead</div><p>Something on the market already does this well enough. Now you know exactly what to ask for.</p></div>
      <div class="stop"><div class="k">Stop and rethink</div><p>The problem turned out to be different from the one on the whiteboard. Better to find out in two days than in six months.</p></div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">04</span><h2>One sprint, or a programme.</h2></div>
      <div class="prose">
        <p class="lede">One sprint answers a question. Two or three teach your team the method, so they can run the next one without us.</p>
        <ul class="squares">
          <li><strong>The first sprint</strong> proves the approach on your real problems.</li>
          <li><strong>The second</strong> goes after the next problems, with your team taking more of the lead.</li>
          <li><strong>The third</strong> includes training one of your people to facilitate.</li>
        </ul>
        ${quote(Q.notTooSoon)}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">05</span><h2>What you keep.</h2></div>
      <div class="prose">
        <ul class="squares">
          <li><strong>Three working prototypes</strong>, built by your people, on made-up data.</li>
          <li><strong>A reusable practice environment</strong> shaped like your data, for the next round.</li>
          <li><strong>A clear read on what to pilot first</strong>, and a prioritised brief for your data team.</li>
          <li><strong>The barriers, named and ranked.</strong> The organisational ones usually matter more than the technical ones.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">06</span><h2>Questions people ask.</h2></div>
      <div class="faq">
        <details><summary>Do our people need to code?</summary><p>No. They describe what they want in plain language and the AI writes the code. We sit beside each team the whole time.</p></details>
        <details><summary>Will any of our real data be used?</summary><p>Not in the sprint. We build on made-up data shaped like yours. Real data comes later, in a pilot, after the privacy and security work is done.</p></details>
        <details><summary>How is this different from a workshop?</summary><p>A <a href="/workshops">workshop</a> builds fluency across a leadership team. A sprint goes deep on three specific problems and ends with a decision about one of them.</p></details>
        <details><summary>What if none of the prototypes works?</summary><p>Then you’ve learned something important for the price of two days. Stopping is a good outcome when it’s the right one.</p></details>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Bring us three problems.', text: 'Thirty minutes is enough to tell whether a sprint fits. If it doesn’t, we’ll say so and suggest what would.' })}
`,
};
