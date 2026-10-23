import { SITE, stairs, ctaBand } from '../layout.mjs';

export default {
  path: '/writing',
  title: 'Writing and tools',
  description: 'The AI Cookbook, a running write-up of what works and what breaks, plus free tools: the BuildFirst assessment and Groundwork.',
  body: `
<section class="hero compact">
  <div class="wrap">
    <div class="eyebrow">Writing and tools</div>
    <h1>What we’re building, written down.</h1>
    <p class="dek">The AI Cookbook is where we share what works, what breaks and what we’d do differently. The tools below are free, and need no sign-up.</p>
    <div class="actions">
      <a class="button" href="${SITE.substack}">Read The AI Cookbook <span class="arrow">→</span></a>
      <a class="textlink" href="${SITE.substack}/subscribe">Subscribe</a>
    </div>
  </div>
  ${stairs('small')}
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">01</span><h2>Latest from The AI Cookbook.</h2></div>
      <p class="lede">Recipes you can follow, and essays on what it takes for AI to stick inside a business.</p>
    </div>
    <div class="posts" data-cookbook="8">
      <a class="post" href="${SITE.substack}"><div class="label">Recipe</div><h3>Start with a real problem</h3></a>
      <a class="post" href="${SITE.substack}"><div class="label">Essay</div><h3>The three principles of adoption</h3></a>
      <a class="post" href="${SITE.substack}"><div class="label">Essay</div><h3>Put authority close to the work</h3></a>
      <a class="post" href="${SITE.substack}"><div class="label">Essay</div><h3>Small but mighty teams</h3></a>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>Free tools.</h2></div>
      <p class="lede">Things we use with clients, made available to anyone.</p>
    </div>
    <div class="tools">
      <div class="tool"><div class="label">Five minutes</div><h3>The BuildFirst assessment.</h3><p>Where you are with AI today, across four ways of working and four fluency skills, and what would help most next.</p><a class="textlink" href="/assessment.html">Take the assessment</a></div>
      <div class="tool"><div class="label">A skill for Claude</div><h3>Groundwork.</h3><p>From a long list of AI ideas to three priorities, and the one thing to learn before you commit budget. Built on lean experimentation methods.</p><a class="textlink" href="https://github.com/dbdb168/groundwork">Get Groundwork</a></div>
      <div class="tool"><div class="label">Coming soon</div><h3>IntelligenceOS.</h3><p>The operating system we use to run BuildFirst: frameworks, folders and agents for a small company. We’ll share it when it’s ready.</p></div>
    </div>
  </div>
</section>

${ctaBand()}
`,
};
