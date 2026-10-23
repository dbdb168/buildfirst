import { SITE, stairs, ctaBand } from '../layout.mjs';

export default {
  path: '/how-we-work',
  title: 'How we work',
  description: 'Build first, learn fast, repeat. The principles and frameworks behind BuildFirst coaching, workshops, sprints and builds.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">How we work</div>
    <h1>Build first. Learn fast. Repeat.</h1>
    <p class="dek">The name is the method. Whether it’s one leader in coaching or a system for a whole business, we get something real into your hands early and let what happens next decide the plan.</p>
  </div>
  ${stairs('small')}
</section>

<section class="section">
  <div class="wrap">
    <div class="loop">
      <div><div class="w">Build.</div><p>Start with a real problem and make a first version in hours, on made-up data, so nothing is at risk.</p></div>
      <div><div class="w">Learn.</div><p>Put it in front of the people who would use it. What they do with it tells you more than any plan.</p></div>
      <div><div class="w">Repeat.</div><p>Refine, then decide together: keep building, buy something instead, or stop and rethink.</p></div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">01</span><h2>What we believe.</h2></div>
      <p class="lede">Six things that shape every engagement, from the first session to a system in production.</p>
    </div>
    <div class="principles">
      <div class="principle"><h3>You learn it by building it.</h3><p>Reading about AI was never going to show you what it can do. Fluency comes from making something, watching it work and watching it break.</p></div>
      <div class="principle"><h3>Start with a real problem.</h3><p>Not a use case from a vendor’s slide. Something that costs you time or money today, in your own words.</p></div>
      <div class="principle"><h3>Safe before real.</h3><p>We build on made-up data first. Real data comes in only once the privacy and security work is done.</p></div>
      <div class="principle"><h3>A person makes the call.</h3><p>AI suggests. People decide. Every system we build keeps a human where the judgement is.</p></div>
      <div class="principle"><h3>Tool-agnostic.</h3><p>We work in Claude most days, but we use whatever fits you, including the tools your company already allows.</p></div>
      <div class="principle"><h3>Small steps, honest exits.</h3><p>Each step is priced when you reach it. Stopping is a good outcome when the evidence says stop.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">02</span><h2>Four skills that matter more than prompting.</h2></div>
      <div class="prose">
        <p class="lede">We teach fluency using the AI Fluency Framework developed by Rick Dakan and Joseph Feller with Anthropic. It names four skills.</p>
        <ul class="squares">
          <li><strong>Delegation.</strong> Deciding what to hand to AI, what to keep and what to share.</li>
          <li><strong>Description.</strong> Saying clearly what you want, with the context it needs.</li>
          <li><strong>Discernment.</strong> Judging what comes back: what’s right, what’s off and what’s missing.</li>
          <li><strong>Diligence.</strong> Using it responsibly, and owning the result.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">03</span><h2>Four ways of working with AI.</h2></div>
      <div class="prose">
        <p class="lede">Asking, automation, augmentation and agency. Not a ladder to climb. Different ways of working that one person might move between in the same day.</p>
        <ul class="squares">
          <li><strong>Asking.</strong> A question, an answer, a better draft.</li>
          <li><strong>Automation.</strong> A repeatable task handed off, with a check at the end.</li>
          <li><strong>Augmentation.</strong> Working alongside it on something hard, thinking out loud.</li>
          <li><strong>Agency.</strong> A system that acts on your behalf, inside limits you set.</li>
        </ul>
        <p>Our <a href="/assessment">ten-minute assessment</a> shows where you are today, and where it would help most to go next.</p>
      </div>
    </div>
  </div>
</section>

<section class="section cover">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">04</span><h2>Start small. Climb when it’s earned.</h2></div>
      <p class="lede">The four ways we work are steps. Most people start on the first, and the work itself tells you when the next one makes sense.</p>
    </div>
    <div class="steps">
      <div class="stepline"><div><div class="n">1</div><div class="dur">One leader</div></div><div><h3><a href="/coaching">Coaching</a></h3><p>Eight sessions, one to one. You build something real from the first.</p></div></div>
      <div class="stepline"><div><div class="n">2</div><div class="dur">A leadership team</div></div><div><h3><a href="/workshops">Workshops</a></h3><p>One hands-on day. Everyone builds, nobody watches.</p></div></div>
      <div class="stepline"><div><div class="n">3</div><div class="dur">Your real problems</div></div><div><h3><a href="/sprints">Sprints</a></h3><p>Two days, three problems, working prototypes your people built.</p></div></div>
      <div class="stepline"><div><div class="n">4</div><div class="dur">A system you run</div></div><div><h3><a href="/builds">Builds</a></h3><p>Prototype first, then a pilot, then the real thing.</p></div></div>
    </div>
  </div>
</section>

${ctaBand()}
`,
};
