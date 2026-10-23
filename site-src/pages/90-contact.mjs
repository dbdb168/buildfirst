import { SITE, stairs } from '../layout.mjs';

export default {
  path: '/contact',
  title: 'Start a conversation',
  description: 'Book a thirty-minute conversation, tell us what you want to build, or take the ten-minute assessment first.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">Get in touch</div>
    <h1>Start a conversation.</h1>
    <p class="dek">Three ways in. Pick whichever fits where you are today.</p>
  </div>
  ${stairs('small')}
</section>

<section class="section">
  <div class="wrap">
    <div class="contact-grid">
      <a class="contact-card" data-c="1" href="${SITE.calendar}"><div class="label">Thirty minutes, no cost</div><h3>Book a conversation.</h3><p>Tell us what you’re trying to do with AI. We’ll tell you honestly whether we can help, and what we’d try first.</p><span class="go">Pick a time <span>→</span></span></a>
      <a class="contact-card" data-c="4" href="/build-intake.html"><div class="label">A few minutes</div><h3>Tell us what you want to build.</h3><p>Describe the problem. We’ll bring a working prototype to the first conversation, not a proposal.</p><span class="go">Describe it <span>→</span></span></a>
      <a class="contact-card" data-c="2" href="/assessment"><div class="label">Ten minutes</div><h3>Take the assessment.</h3><p>See where you are with AI today and what would help most next. A good start before a first call.</p><span class="go">Start the assessment <span>→</span></span></a>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">01</span><h2>What happens on a first call.</h2></div>
      <div class="steps">
        <div class="stepline"><div><div class="n">1</div><div class="dur">Listen</div></div><div><h3>You tell us what’s going on.</h3><p>What you’re trying to do, who else is involved and any date that matters.</p></div></div>
        <div class="stepline"><div><div class="n">2</div><div class="dur">Be honest</div></div><div><h3>We say whether we can help.</h3><p>And if we can’t, who might. Sometimes the right answer is a tool you already own.</p></div></div>
        <div class="stepline"><div><div class="n">3</div><div class="dur">Follow up</div></div><div><h3>One page, in your words.</h3><p>If it makes sense to go on, a short note of what we heard and a small first step. No obligation.</p></div></div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">02</span><h2>Or write to us.</h2></div>
      <div class="prose">
        <p class="lede"><a href="mailto:${SITE.email}">${SITE.email}</a></p>
        <p>We’re on <a href="${SITE.linkedin}">LinkedIn</a> too, and we write about what we’re learning in <a href="${SITE.substack}">The AI Cookbook</a>. Based in Richmond, Virginia.</p>
      </div>
    </div>
  </div>
</section>
`,
};
