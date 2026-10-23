// Markup only; styles and script live in assets/site/build-intake.{css,js}.
// Answers go to David by email through FormSubmit (see build-intake.js).

const next = (n) => `<button type="button" class="button" onclick="goTo(${n})">Next <span class="arrow">→</span></button>`;
const back = (n) => `<button type="button" class="button ghost" onclick="goTo(${n})">← Back</button>`;
const req = '<span class="req" aria-hidden="true">*</span>';

const tool = (val, note) => `
        <button type="button" class="option-card" onclick="toggleOption(this,'tools')" data-val="${val}">
          <span class="t">${val}</span><span class="d">${note}</span>
        </button>`;

export default {
  path: '/build-intake',
  title: 'Tell us what you want to build',
  description: 'A few minutes describing the problem. We’ll bring a working prototype to the first conversation, not a proposal.',
  ground: 'paper',
  head: '<link rel="stylesheet" href="/assets/site/build-intake.css">',
  body: `
<section class="section intake-wrap">
  <div class="wrap">
<div class="intake" id="intake">

  <div class="page-head">
    <div class="eyebrow">Builds · About five minutes</div>
    <h1>Tell us what you want to build.</h1>
    <p class="dek">You spend a few minutes telling us what you need. We spend the time to bring a working prototype to the first conversation. Not a proposal, not a slide: something you can react to.</p>
  </div>

  <div class="steps" aria-hidden="true">
    <i class="step-dot active"></i><i class="step-dot"></i><i class="step-dot"></i><i class="step-dot"></i><i class="step-dot"></i><i class="step-dot"></i><i class="step-dot"></i><i class="step-dot"></i>
  </div>

  <!-- STEP 1: WHO ARE YOU -->
  <div class="form-step active" id="step-0">
    <div class="step-label">Step 1 of 8</div>
    <h2 class="step-question">First, a bit about you.</h2>
    <p class="step-hint">So we know who we’re talking to.</p>
    <div class="field-group">
      <label class="field-label" for="f-name">Your name ${req}</label>
      <input type="text" id="f-name" autocomplete="name">
    </div>
    <div class="field-group">
      <label class="field-label" for="f-email">Email ${req}</label>
      <input type="email" id="f-email" autocomplete="email">
    </div>
    <div class="field-group">
      <label class="field-label" for="f-role">Your role ${req}</label>
      <input type="text" id="f-role" placeholder="For example: COO, founder, head of operations">
    </div>
    <div class="btn-row">${next(1)}</div>
  </div>

  <!-- STEP 2: INDUSTRY AND CONTEXT -->
  <div class="form-step" id="step-1">
    <div class="step-label">Step 2 of 8</div>
    <h2 class="step-question">What world do you work in?</h2>
    <p class="step-hint">Your industry, the size of the business, the kind of work your team does day to day. It helps us understand the ground before we talk.</p>
    <div class="field-group">
      <label class="field-label" for="f-industry">Industry ${req}</label>
      <select id="f-industry">
        <option value="">Choose your industry</option>
        <option>Healthcare</option>
        <option>Financial services</option>
        <option>Insurance</option>
        <option>Legal</option>
        <option>Technology</option>
        <option>Professional services</option>
        <option>Education</option>
        <option>Media and publishing</option>
        <option>Manufacturing</option>
        <option>Real estate</option>
        <option>Government and public sector</option>
        <option>Non-profit</option>
        <option>Other</option>
      </select>
    </div>
    <div class="field-group">
      <label class="field-label" for="f-context">Tell us about the business in a sentence or two. ${req}</label>
      <textarea id="f-context" rows="3" placeholder="For example: a 200-person insurance broker. My team handles commercial underwriting, about 500 submissions a month."></textarea>
    </div>
    <div class="btn-row">${back(0)}${next(2)}</div>
  </div>

  <!-- STEP 3: WHAT TO BUILD -->
  <div class="form-step" id="step-2">
    <div class="step-label">Step 3 of 8</div>
    <h2 class="step-question"><label for="f-build">What do you want to build? ${req}</label></h2>
    <p class="step-hint">No need for technical detail. Describe it the way you would to a colleague. What would this thing do?</p>
    <div class="field-group">
      <textarea id="f-build" rows="5" placeholder="For example: a tool that reads our client intake forms, pulls out the key data and fills in our underwriting templates. Today it’s all by hand and takes about two hours a submission."></textarea>
    </div>
    <div class="btn-row">${back(1)}${next(3)}</div>
  </div>

  <!-- STEP 4: WHO HAS THIS PROBLEM -->
  <div class="form-step" id="step-3">
    <div class="step-label">Step 4 of 8</div>
    <h2 class="step-question">Who has this problem?</h2>
    <p class="step-hint">You? Your team? Your customers? Knowing who feels it helps us build the right thing.</p>
    <div class="field-group">
      <label class="field-label" for="f-who">Who would use this? ${req}</label>
      <textarea id="f-who" rows="3" placeholder="For example: my underwriting team of eight. They spend hours on data entry. Some are comfortable with new tools, some aren’t."></textarea>
    </div>
    <div class="field-group">
      <label class="field-label" for="f-howmany">Roughly how many people does it touch? ${req}</label>
      <input type="text" id="f-howmany" placeholder="For example: eight on my team, and 50 brokers downstream">
    </div>
    <div class="btn-row">${back(2)}${next(4)}</div>
  </div>

  <!-- STEP 5: WHAT HAPPENS TODAY -->
  <div class="form-step" id="step-4">
    <div class="step-label">Step 5 of 8</div>
    <h2 class="step-question"><label for="f-process">Walk us through what happens today. ${req}</label></h2>
    <p class="step-hint">The process, step by step. Where does it start and end? Where does it break or slow down? This is the most useful part: the more you share, the better the prototype we can bring.</p>
    <div class="field-group">
      <textarea id="f-process" rows="6" placeholder="For example:&#10;1. A broker emails us a submission PDF&#10;2. An underwriter reads 20 to 40 pages&#10;3. They pull out revenue, claims history and limits by hand&#10;4. They type it into our quoting system&#10;5. They check it against our appetite guide&#10;About two hours each, 25 a day"></textarea>
    </div>
    <div class="btn-row">${back(3)}${next(5)}</div>
  </div>

  <!-- STEP 6: WHAT CHANGES -->
  <div class="form-step" id="step-5">
    <div class="step-label">Step 6 of 8</div>
    <h2 class="step-question"><label for="f-outcome">If this worked perfectly, what would change? ${req}</label></h2>
    <p class="step-hint">Time saved, revenue unlocked, fewer errors, a team freed up. What are you really after?</p>
    <div class="field-group">
      <textarea id="f-outcome" rows="4" placeholder="For example: two hours back on every submission, about 1,000 hours a month. We take on more without hiring, and the data entry errors go."></textarea>
    </div>
    <div class="btn-row">${back(4)}${next(6)}</div>
  </div>

  <!-- STEP 7: WHAT EXISTS TODAY -->
  <div class="form-step" id="step-6">
    <div class="step-label">Step 7 of 8</div>
    <h2 class="step-question">What are you working with today?</h2>
    <p class="step-hint">The tools, systems and AI you already use. It tells us what we’d be building on, or replacing. Pick any that apply.</p>
    <div class="option-grid">${tool('No AI yet', 'Not started with AI tools')}${tool('ChatGPT / OpenAI', 'ChatGPT or the OpenAI API')}${tool('Copilot / Microsoft', 'Microsoft 365 Copilot')}${tool('Claude / Anthropic', 'Already using Claude')}
    </div>
    <div class="field-group">
      <label class="field-label" for="f-systems">Any particular systems involved? <span class="opt">Optional</span></label>
      <input type="text" id="f-systems" placeholder="For example: Salesforce, Excel, SharePoint, an in-house CRM">
    </div>
    <div class="btn-row">${back(5)}${next(7)}</div>
  </div>

  <!-- STEP 8: REVIEW AND SEND -->
  <div class="form-step" id="step-7">
    <div class="step-label">Step 8 of 8</div>
    <h2 class="step-question">Here’s what we have.</h2>
    <p class="step-hint">Check it looks right. When you send it, it comes straight to us and we’ll come prepared.</p>
    <div id="review-container" class="review"></div>
    <div class="field-group">
      <label class="field-label" for="f-anything">Anything else we should know? <span class="opt">Optional</span></label>
      <textarea id="f-anything" rows="3" placeholder="Timing, budget, who else is involved, any worries"></textarea>
    </div>
    <div class="btn-row">${back(6)}<button type="button" class="button" onclick="submitForm()">Send it <span class="arrow">→</span></button></div>
  </div>

  <!-- SENT -->
  <div class="form-step" id="step-success">
    <div class="success">
      <div class="success-mark" aria-hidden="true">✓</div>
      <h2>Got it. Now it’s our turn.</h2>
      <p>You’ve done your part. We’ll read everything you shared and start building. When we meet, we’ll have a prototype for you to react to, not a pitch deck.</p>
      <div class="btn-row">
        <a class="button" href="https://calendar.app.google/rkTTjqxVoTrrZAki8" target="_blank" rel="noopener">Book thirty minutes <span class="arrow">→</span></a>
        <a class="button ghost" href="/builds">Back to Builds</a>
      </div>
    </div>
  </div>

</div>
  </div>
</section>
<script src="/assets/site/build-intake.js"></script>`,
};
