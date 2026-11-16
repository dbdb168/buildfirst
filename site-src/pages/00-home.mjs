import { SITE, stairs, ctaBand, clientsBlock } from '../layout.mjs';

const theme = (title, items) => `
    <div class="two-col" style="margin-top:40px">
      <div><h3>${title}</h3></div>
      <div class="prose">
        <ul class="squares">${items.map(([head, text]) => `
          <li><strong>${head}</strong> ${text}</li>`).join('')}
        </ul>
      </div>
    </div>`;

export const buildSteps = (first, second, third, fourth) => `
    <div class="steps">
      <div class="stepline"><div><div class="n">1</div><div class="dur">Day one</div></div><div><h3>Prototype.</h3><p>${first}</p></div></div>
      <div class="stepline"><div><div class="n">2</div><div class="dur">Two to six weeks</div></div><div><h3>Discovery to prototype.</h3><p>${second}</p></div></div>
      <div class="stepline"><div><div class="n">3</div><div class="dur">A few weeks, live</div></div><div><h3>Pilot on real data.</h3><p>${third}</p></div></div>
      <div class="stepline"><div><div class="n">4</div><div class="dur">Launch</div></div><div><h3>Production.</h3><p>${fourth}</p></div></div>
      <div class="stepline"><div><div class="n">5</div><div class="dur">Three months</div></div><div><h3>Improvement after launch.</h3><p>We improve it from user feedback once it’s in real use.</p></div></div>
    </div>`;

export const howWeBuild = `
    <div class="principles">
      <div class="principle"><h3>Context first.</h3><p>We map your files and write the fact sheets the AI reads before any agent runs.</p></div>
      <div class="principle"><h3>Tested on your questions.</h3><p>The people who will use it write real questions, and it has to answer them before launch.</p></div>
      <div class="principle"><h3>Every answer shows its source.</h3><p>Down to the page.</p></div>
      <div class="principle"><h3>A person decides.</h3><p>The system suggests. Nothing important happens without a check.</p></div>
      <div class="principle"><h3>Your tools.</h3><p>We build on the AI tools and systems you already use, whichever they are, in your own environment or hosted by us.</p></div>
    </div>`;

export default {
  path: '/',
  title: 'AI agents and software for your business',
  description: 'We build AI agents and software that find new revenue, give your people back hours, catch errors and show you the whole business.',
  body: `
<section class="hero">
  <div class="wrap">
    <div class="eyebrow">AI agents and software</div>
    <h1>We build AI agents and software that do real work in your business.</h1>
    <p class="dek">They find new revenue, give your people back hours, catch errors before they cost you and show you the whole business. For banks, insurers, healthcare companies, schools and property businesses.</p>
    <div class="actions">
      <a class="button" href="${SITE.calendar}">Book a 30-minute conversation <span class="arrow">→</span></a>
      <a class="textlink" href="/build-intake">Describe what you want to build</a>
    </div>
  </div>
  ${stairs()}
</section>

<section class="section">
  <div class="wrap">
    <div><span class="num">01</span><h2>What we’ve built.</h2></div>
    ${theme('Find new revenue', [
      ['Sales leads, twice a day · Fortune 500 healthcare technology.', 'An agent checks about 50 state procurement sources and delivers leads to sellers, with what changed and why it matters. Passed the company’s security, legal and insurance reviews. In production, and more product teams are asking for it.'],
      ['New prospects to call · insurance brokerage.', 'A prototype that finds businesses worth approaching in a target market.'],
      ['Every enquiry answered · real estate.', 'An email agent drafts replies in the owner’s voice, follows the owner’s rules and keeps track of who is interested in what.'],
    ])}
    ${theme('Give your people back hours', [
      ['Event emails without the production grind · Fortune 500 insurer.', 'One draft becomes a finished, on-brand email inside the company’s CRM, with two human checks before anything goes out.'],
      ['The monthly report writes itself · financial services.', 'A technology executive’s report for his CIO, hours of work, now drafted from his own email and chats.'],
      ['Three agents of his own · financial services.', 'Calendar, the week’s priorities and deck preparation, built by the leader himself in coaching.'],
      ['Deal models in minutes · homebuilder.', 'Analysis that took hours now takes 15 to 20 minutes.'],
      ['Staff questions answered · homebuilder.', 'A prototype that answers questions on the employee handbook and benefits.'],
    ])}
    ${theme('Catch errors before they cost you', [
      ['Problems spotted the same day · special education school.', 'Paper program books become one live record that applies the school’s own rules and suggests the next step. A person decides. In build now.'],
      ['Errors three people missed · homebuilder.', 'A check of a benefits analysis found formula errors after three people had reviewed it.'],
      ['Risk read first · homebuilder.', 'Letters of intent reviewed for risk and the terms to push back on, before they go to the lawyer.'],
    ])}
    ${theme('See the whole business and decide faster', [
      ['Growth in one view · insurance brokerage.', 'A dashboard built with the chief executive in coaching.'],
      ['A supply-chain command centre · Fortune 500 healthcare technology.', 'A prototype.'],
      ['Twenty-five years of records, asked in plain words · property developer.', 'Every answer linked to its source page. First phase starting.'],
      ['Board papers at your fingertips · non-profit board.', 'A board member’s own searchable library, built in coaching.'],
    ])}
    ${theme('Teach your leaders to build their own', [
      ['Engineering leadership day · Fortune 500 bank.', 'Thirteen senior engineering leaders each built working tools in one day, inside the bank’s own AI tools and rules.'],
      ['<a href="/coaching">Coaching.</a>', 'We coach leaders and their teams, we help them build their own AI tools on their own work, starting in their first session.'],
    ])}
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head">
      <div><span class="num">02</span><h2>How a build works.</h2></div>
      <p class="lede">Each step is priced when you reach it. You can stop at any step.</p>
    </div>
    ${buildSteps(
      'Built on made-up data, usually ready for our first conversation.',
      'We work with the people who will use it and tell you whether to build or buy.',
      'Privacy and security work first. A small group uses it, and we measure the change against how things were.',
      'Launched for everyone who needs it, in your environment or hosted by us.',
    )}
  </div>
</section>

<section class="section cover">
  <div class="wrap">
    <div class="two-col">
      <div><span class="num">03</span><h2>After launch.</h2></div>
      <div class="prose">
        <p class="lede">Once a build is live, you choose how much to hand to us: run it yourself with our code and documentation, have us maintain it, or have us manage it end to end. Software made for how you work, without a bloated SaaS bill or an outsourcing contract that keeps growing.</p>
        <p><a class="textlink" href="/looking-after">How we look after what we build</a></p>
      </div>
    </div>
  </div>
</section>

${clientsBlock('04')}

${ctaBand({ title: 'Tell us what you want to build.', text: 'Thirty minutes, no cost. We’ll tell you whether we can help and what we’d build first.', secondary: ['Describe what you want to build', '/build-intake'] })}
`,
};
