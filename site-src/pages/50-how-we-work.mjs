import { SITE, stairs, ctaBand } from '../layout.mjs';

export default {
  path: '/how-we-work',
  title: 'How we work',
  description: 'Build first, learn fast, repeat. What we believe, from one leader in coaching to a system for a whole business.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">How we work</div>
    <h1>Build first. Learn fast. Repeat.</h1>
    <p class="dek">Whether it’s one leader in coaching or a system for a whole business, we get something real into your hands early and let what happens next decide the plan.</p>
  </div>
  ${stairs('small')}
</section>

<section class="section">
  <div class="wrap">
    <div class="loop">
      <div><div class="w">Build.</div><p>Start with a real problem and make a first version in hours, on made-up data.</p></div>
      <div><div class="w">Learn.</div><p>Put it in front of the people who would use it. What they do with it tells you more than any plan.</p></div>
      <div><div class="w">Repeat.</div><p>Refine, then decide together: keep building, buy something instead, or stop and rethink.</p></div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">01</span><h2>What we believe.</h2></div>
    </div>
    <div class="principles">
      <div class="principle"><h3>Start with a real problem.</h3><p>Something that costs you time or money today, in your own words.</p></div>
      <div class="principle"><h3>Safe before real.</h3><p>Made-up data first. Real data only once the privacy and security work is done.</p></div>
      <div class="principle"><h3>A person makes the call.</h3><p>AI suggests. People decide.</p></div>
      <div class="principle"><h3>Small steps, honest exits.</h3><p>Stopping is a good outcome when the evidence says stop.</p></div>
    </div>
  </div>
</section>

${ctaBand()}
`,
};
