import { SITE, stairs, ctaBand, clientsBlock } from '../layout.mjs';

export default {
  path: '/coaching',
  title: 'Coaching',
  description: 'One-to-one AI coaching for leaders who learn by doing. Eight sessions over eight to ten weeks. You build something real in the first session, on your own work.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">Coaching · One to one</div>
    <h1>You’ve got a business to run. Now you’ve got to work out AI, too.</h1>
    <p class="dek">One-to-one coaching for leaders who learn by doing. You build something real in the first session, on your own work.</p>
    <div class="actions">
      <a class="button" href="${SITE.calendar}">Book a 30-minute conversation <span class="arrow">→</span></a>
      <a class="textlink" href="/assessment">Take the ten-minute assessment</a>
    </div>
  </div>
  ${stairs('small', 1)}
</section>

<section class="section">
  <div class="wrap">
    <div class="facts">
      <div><div class="label">Who it’s for</div><div class="v">A senior leader, or two from the same firm</div></div>
      <div><div class="label">How long</div><div class="v">Eight sessions of 60 to 90 minutes, over eight to ten weeks</div></div>
      <div><div class="label">In between</div><div class="v">Ten to twenty minutes of practice, and a daily AI briefing</div></div>
      <div><div class="label">You leave with</div><div class="v">Your own fluency, and three or four tools you built</div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">01</span><h2>What changed for people who came before you.</h2></div>
      <div class="prose">
        <ul class="squares">
          <li>A technology executive handed his monthly report for the CIO to AI, pulled from his own email and chats.</li>
          <li>A banking leader used AI as a panel of advisers for a board decision.</li>
          <li>A technology executive set up three agents of his own, starting from one question: what would you want done for you overnight?</li>
          <li>A homebuilder’s chief executive now has AI check his models and deal papers first, so he goes into each deal with sharper questions.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>What happens, session by session.</h2></div>
      <p class="lede">Two things run side by side. We work on whatever you’re actually trying to solve. And you build something real each time, which is how you learn what AI can and can’t do.</p>
    </div>
    <div class="steps">
      <div class="stepline"><div><div class="n">0</div><div class="dur">Before we start</div></div><div><h3>A short assessment, and a daily briefing.</h3><p>Ten minutes on what drains your energy, how you like to learn and what you’d build if you could. We set up your tools and switch on a short daily briefing on what’s moving in AI, written for you.</p></div></div>
      <div class="stepline"><div><div class="n">1</div><div class="dur">Session one</div></div><div><h3>You build something on day one.</h3><p>Something personal and real, built live, on made-up data so nothing is at risk.</p></div></div>
      <div class="stepline"><div><div class="n">2</div><div class="dur">Sessions two to six</div></div><div><h3>Your real problems.</h3><p>Board papers, call preparation, a dashboard you’ve wanted for years. Each session deepens a build or starts a new one, and we back into the theory once you’ve felt why it works.</p></div></div>
      <div class="stepline"><div><div class="n">3</div><div class="dur">Session seven</div></div><div><h3>Your organisation.</h3><p>Governance, build or buy, what a sensible rollout looks like.</p></div></div>
      <div class="stepline"><div><div class="n">4</div><div class="dur">Session eight</div></div><div><h3>On your own.</h3><p>We review what you’ve built and how you work now, and set you up to keep going without us.</p></div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">03</span><h2>Four skills that matter more than prompting.</h2></div>
      <p class="lede">We teach fluency using the AI Fluency Framework developed by Rick Dakan and Joseph Feller with Anthropic.</p>
    </div>
    <div class="principles">
      <div class="principle"><h3>Delegation.</h3><p>Deciding what to hand to AI, what to keep and what to share.</p></div>
      <div class="principle"><h3>Description.</h3><p>Saying clearly what you want, with the context it needs.</p></div>
      <div class="principle"><h3>Discernment.</h3><p>Judging what comes back: what’s right, what’s off and what’s missing.</p></div>
      <div class="principle"><h3>Diligence.</h3><p>Using it responsibly, and owning the result.</p></div>
    </div>
  </div>
</section>

<section class="section cover">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">04</span><h2>What you leave with.</h2></div>
      <div class="prose">
        <ul class="squares">
          <li><strong>Your own fluency.</strong> Knowing what to hand to AI, how to ask for it, how to judge what comes back, and how to use it responsibly.</li>
          <li><strong>Three or four tools you built.</strong> Small, working, yours.</li>
          <li><strong>Sharper calls.</strong> On tools, vendors, governance and where to invest, made from your own experience.</li>
          <li><strong>A habit that lasts.</strong> Ten minutes a day, and the confidence to ask the machine how to fix it when something doesn’t work.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">05</span><h2>How it starts.</h2></div>
      <div>
        <div class="steps">
          <div class="stepline"><div><div class="n">1</div><div class="dur">Thirty minutes</div></div><div><h3>A conversation.</h3><p>You tell us what you’re trying to do, and any date that matters, like a board meeting.</p></div></div>
          <div class="stepline"><div><div class="n">2</div><div class="dur">A few days later</div></div><div><h3>One page.</h3><p>A short proposal in your words, with the shape of the eight sessions.</p></div></div>
          <div class="stepline"><div><div class="n">3</div><div class="dur">The first session</div></div><div><h3>You start building.</h3><p>One fixed fee for the whole programme, agreed before we begin.</p></div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">06</span><h2>Questions people ask.</h2></div>
      <div class="faq">
        <details><summary>Do I have to be technical?</summary><p>No. Your coach is a strategist and product leader, not an engineer, and learned to build with AI the same way you will.</p></details>
        <details><summary>What’s the time commitment?</summary><p>Eight sessions of 60 to 90 minutes, weekly or fortnightly, in person or on a call, with ten to twenty minutes of practice in between.</p></details>
        <details><summary>Which tools will we use?</summary><p>Whatever fits you, starting with the AI tools your company already uses.</p></details>
        <details><summary>What about our data?</summary><p>We start on made-up data. When real work comes in, we sign an NDA and stay inside the tools and rules your company already has.</p></details>
        <details><summary>Can two of us do it together?</summary><p>Yes. Two leaders from the same firm can share the programme.</p></details>
      </div>
    </div>
  </div>
</section>

${clientsBlock('07')}

${ctaBand({ title: 'Start with one conversation.', text: 'Thirty minutes, no cost. Tell us what you’re working on and we’ll tell you honestly whether coaching is the right place to start.' })}
`,
};
