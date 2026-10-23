import { SITE, stairs, quote, ctaBand } from '../layout.mjs';
import { Q } from '../quotes.mjs';

export default {
  path: '/coaching',
  title: 'Coaching: BuildFirst Sherpa',
  description: 'One-to-one AI coaching for senior leaders. Eight sessions over eight to ten weeks. You build something real in the first session and leave fluent.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">Coaching · BuildFirst Sherpa</div>
    <h1>From conversant to fluent, one build at a time.</h1>
    <p class="dek">One-to-one coaching for leaders who learn by doing. You build something real in the first session, and by the end the judgement is yours.</p>
    <div class="actions">
      <a class="button" href="${SITE.calendar}">Book a conversation <span class="arrow">→</span></a>
      <a class="textlink" href="/assessment.html">Take the assessment first</a>
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
      <div><span class="num">01</span><h2>Why this matters.</h2></div>
      <div class="prose">
        <p class="lede">You can’t delegate your way to fluency. To lead your team through this, you have to have used it yourself.</p>
        <p>Most senior leaders we meet have done the reading. They know the vocabulary and they’ve sat through the roundtables. What they haven’t had is the time, or a safe place, to get their own hands on it.</p>
        <p>So the decisions arrive anyway. Which tools to back, what the policy should say, what to tell the board. And they get made on someone else’s say-so.</p>
        <div class="contrast">
          <div class="today"><div class="k">Today</div><p>AI is something your team is “looking into”. You nod along and hope the right questions get asked.</p></div>
          <div class="tomorrow"><div class="k">Imagine instead</div><p>You use it every day on your own work, and you can tell what’s real from what’s noise because you’ve built both.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="challenge">
      <div class="label">The idea</div>
      <div class="hmw">The goal is not for you to do more AI. It’s to use AI to <em>do more of what you do</em>.</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>What happens, session by session.</h2></div>
      <p class="lede">Two things run side by side. We work on whatever you’re actually trying to solve. And you build something real each time, which is how you learn what AI can and can’t do.</p>
    </div>
    <div class="steps">
      <div class="stepline"><div><div class="n">0</div><div class="dur">Before we start</div></div><div><h3>A short assessment, and a daily briefing.</h3><p>Five minutes on what drains your energy, how you like to learn and what you’d build if you could. We set up your tools and switch on a short daily briefing on what’s moving in AI, written for you.</p></div></div>
      <div class="stepline"><div><div class="n">1</div><div class="dur">Session one</div></div><div><h3>You build something on day one.</h3><p>Something personal and real, built live, on made-up data so nothing is at risk. People leave the first session with a working tool and a different sense of what’s possible.</p></div></div>
      <div class="stepline"><div><div class="n">2</div><div class="dur">Sessions two to six</div></div><div><h3>Your real problems.</h3><p>Board papers, call preparation, a dashboard you’ve wanted for years. Each session deepens a build or starts a new one, and we back into the theory once you’ve felt why it works.</p></div></div>
      <div class="stepline"><div><div class="n">3</div><div class="dur">Session seven</div></div><div><h3>Your organisation.</h3><p>Governance, build or buy, what a sensible rollout looks like. Questions you can now answer from experience, not guesswork.</p></div></div>
      <div class="stepline"><div><div class="n">4</div><div class="dur">Session eight</div></div><div><h3>On your own.</h3><p>We review what you’ve built and how you work now, and set you up to keep going without us. The habit is the point.</p></div></div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">03</span><h2>In their words.</h2></div>
      <p class="lede">Things coaching clients said in and after their sessions.</p>
    </div>
    <div class="quotes">
      ${quote(Q.savedTime)}
      ${quote(Q.glazeOver)}
      ${quote(Q.moreStrategy)}
      ${quote(Q.thinkTank)}
      ${quote(Q.payingForward)}
      ${quote(Q.greatBeginning)}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">04</span><h2>What you leave with.</h2></div>
      <div class="prose">
        <ul class="squares">
          <li><strong>Your own fluency.</strong> The four skills that matter more than prompting: delegation, description, discernment and diligence.</li>
          <li><strong>Three or four tools you built.</strong> Small, working, yours. They become the evidence for bigger decisions.</li>
          <li><strong>Sharper calls.</strong> On tools, vendors, governance and where to invest, made from your own experience.</li>
          <li><strong>A habit that lasts.</strong> Ten minutes a day, and the confidence to ask the machine how to fix it when something doesn’t work.</li>
        </ul>
        <div class="callout"><p>Many clients carry on after coaching. The tools they build become the brief for a <a href="/sprints">sprint</a> or a <a href="/builds">build</a> for the wider business.</p></div>
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
          <div class="stepline"><div><div class="n">1</div><div class="dur">Thirty minutes</div></div><div><h3>A conversation.</h3><p>You tell us what you’re trying to do. We listen for the real problem and any date that matters, like a board meeting or a strategy due in ninety days.</p></div></div>
          <div class="stepline"><div><div class="n">2</div><div class="dur">A few days later</div></div><div><h3>One page: here’s what I heard.</h3><p>A short proposal in your words, with the shape of the eight sessions. A starting point, not a contract.</p></div></div>
          <div class="stepline"><div><div class="n">3</div><div class="dur">The first session</div></div><div><h3>You start building.</h3><p>One fixed fee for the programme, agreed before we begin. Most clients pay from a learning and development budget.</p></div></div>
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
        <details><summary>Do I have to be technical?</summary><p>No. Your coach is a strategist and product leader, not an engineer, and learned to build with AI the same way you will. That’s why it makes sense to people who don’t write code.</p></details>
        <details><summary>What’s the time commitment?</summary><p>Real, but built around your day job. Eight sessions of 60 to 90 minutes, weekly or fortnightly, in person or on a call, with ten to twenty minutes of practice in between.</p></details>
        <details><summary>Which tools will we use?</summary><p>Whatever fits you. We work in Claude most days, but we’re tool-agnostic. If your company runs on Microsoft Copilot, we start there.</p></details>
        <details><summary>What about our data?</summary><p>We start on made-up data, so nothing confidential is at risk while you learn. When real work comes in, we sign an NDA and stay inside the tools and rules your company already has.</p></details>
        <details><summary>Can two of us do it together?</summary><p>Yes. Two leaders from the same firm can share the programme, which helps when you’ll be making the decisions together.</p></details>
        <details><summary>What happens after?</summary><p>It sticks, because you built it yourself. Some clients stop there. Others bring their team into a <a href="/workshops">workshop</a> or turn a tool they built into a <a href="/builds">build</a>.</p></details>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Start with one conversation.', text: 'Thirty minutes, no cost. Tell us what you’re working on and we’ll tell you honestly whether coaching is the right place to start.' })}
`,
};
