import { SITE, ctaBand } from '../layout.mjs';

export default {
  path: '/looking-after',
  title: 'How we look after what we build',
  description: 'Once a build is live, you choose how much to hand to us: run it yourself, have us maintain it, or have us manage it end to end.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">How we look after what we build</div>
    <h1>More of our clients ask us to run what we build for them.</h1>
    <p class="dek">We build agents and software for our clients. More and more, they ask us to run and maintain what we’ve built for them once it’s live.</p>
    <div class="actions">
      <a class="button" href="${SITE.calendar}">Book a 30-minute conversation <span class="arrow">→</span></a>
      <a class="textlink" href="/builds">What we build</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">01</span><h2>The old choice.</h2></div>
      <div class="prose">
        <p class="lede">For most small and mid-sized businesses there were two options. Buy a SaaS product built for everyone, paying for features you don’t use and working around the ones you need. Or live without the software.</p>
        <p>Companies that built their own usually handed the upkeep to a third party, nearshore or offshore. Over time, that cost tends to climb.</p>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">02</span><h2>What’s different now.</h2></div>
      <div class="prose">
        <p class="lede">AI tools have changed the speed and the cost of this work. We build faster, and intelligent automation takes on much of the checking, fixing and updating that used to need a team. That lets us offer new, more cost-effective ways to build and look after the agents and software a business needs.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">03</span><h2>How it works.</h2></div>
      <p class="lede">Every build includes three months after launch of improving it from user feedback. After that, you choose:</p>
    </div>
    <div class="steps">
      <div class="stepline"><div><div class="n">1</div></div><div><h3>You run it.</h3><p>We hand over the code and the documentation, at no charge.</p></div></div>
      <div class="stepline"><div><div class="n">2</div></div><div><h3>We maintain it.</h3><p>We keep it working. Enhancements are priced separately.</p></div></div>
      <div class="stepline"><div><div class="n">3</div></div><div><h3>We manage it end to end.</h3><p>The product is ours to run, improve and keep working.</p></div></div>
    </div>
  </div>
</section>

<section class="section cover">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">04</span><h2>Who it’s for.</h2></div>
      <div class="prose">
        <p class="lede">For many owners, operators and chief executives, software made for their business has never been a real option. Now it is. We help each one find the right way to bring AI and other technology into their organisation, and decide how much of it to hand to us.</p>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Tell us what you want to build.', text: 'Thirty minutes, no cost. We’ll tell you whether we can help and what we’d build first.', secondary: ['Describe what you want to build', '/build-intake'] })}
`,
};
