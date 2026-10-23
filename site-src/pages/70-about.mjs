import { SITE, stairs, ctaBand } from '../layout.mjs';

export default {
  path: '/about',
  title: 'About',
  description: 'BuildFirst is David Beath: a strategist and product leader with 25 years inside big organisations, who now builds with AI every day.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">About</div>
    <h1>Built by someone who’s been on both sides.</h1>
    <p class="dek">I’m David Beath. For 25 years I worked inside big organisations and the consultancies that advise them. I’ve sold the vision, and I’ve been the one trying to make it real.</p>
  </div>
  ${stairs('small')}
</section>

<section class="section">
  <div class="wrap">
    <div class="split">
      <div class="portrait" role="img" aria-label="Portrait of David Beath (photo to come)"><span>Photo to come</span></div>
      <div class="prose">
        <p class="lede">Now I build AI tools every day, and I write down what I learn, breakage included, in The AI Cookbook.</p>
        <p>BuildFirst exists because of something I kept seeing. Capable leaders, told to run the business and work out AI at the same time, with nobody to show them how. They’d read everything. It still felt hollow, because reading never shows you what AI can do.</p>
        <p>You can’t get fluent by reading about it. You build, break it and go again. That’s what we do together.</p>
        <p>I work in Claude most days, but I’m tool-agnostic, so we use whatever fits you best. I’m based in Richmond, Virginia, and I teach product innovation as an adjunct at Virginia Commonwealth University.</p>
      </div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">01</span><h2>Where the method comes from.</h2></div>
      <p class="lede">Every part of BuildFirst is something I learned the hard way somewhere else.</p>
    </div>
    <div class="principles">
      <div class="principle"><h3>Prototype first.</h3><p>At IDEO, in London, Singapore and Dubai, I learned to make an idea real before arguing about it. At 3Pillar Global, prototype-first selling became a way of winning work.</p></div>
      <div class="principle"><h3>Experiment at scale.</h3><p>At DBS Bank in Singapore, I ran innovation management for India’s first digital-only bank, which ran more than a thousand experiments in its first year.</p></div>
      <div class="principle"><h3>Simplify the work.</h3><p>At Capital One, I led product managers who brought thousands of workflows down to a couple of hundred, by acting them out before redesigning them.</p></div>
      <div class="principle"><h3>Design the whole experience.</h3><p>From the founding team at lastminute.com to new hotel brands in the Middle East, I learned that a brand is what people experience, not only what they’re told.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">02</span><h2>Not a big firm. Not alone, either.</h2></div>
      <div class="prose">
        <p class="lede">You work with me directly. When a project needs more, I bring in people I trust.</p>
        <p>Designers, engineers and specialists in fields like healthcare join when the work calls for them, under the same rules about your data and the same promise that a person makes the call. You’ll always know who is involved, and why.</p>
      </div>
    </div>
  </div>
</section>

<section class="section cover">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">03</span><h2>Why it’s called BuildFirst.</h2></div>
      <div class="prose">
        <p class="lede">Because the build comes first. Before the strategy deck, before the vendor shortlist, before the policy.</p>
        <p>Build first, learn fast, repeat. It’s how I coach, how I run a workshop and how I build a system. It’s also how I run this business. <a href="/how-we-work">How we work</a> says more.</p>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: 'Let’s have a conversation.', text: 'Tell me what you’re trying to do with AI, and you’ll get an honest answer on whether this can help.' })}
`,
};
