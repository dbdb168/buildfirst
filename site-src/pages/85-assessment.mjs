import { stairs } from '../layout.mjs';

// Markup only; styles and script live in assets/site/assessment.{css,js}.
// Answers go to David by email through FormSubmit (see assessment.js).
export default {
  path: '/assessment',
  title: 'The BuildFirst assessment',
  description: 'Ten questions, about ten minutes. See where you are with AI across the four fluency skills, with a prompt to try straight away.',
  ground: 'paper',
  head: '<link rel="stylesheet" href="/assets/site/assessment.css">',
  body: `
<section class="section assess-wrap">
  <div class="wrap">
<div class="progress-bar" id="progressBar" style="width: 0%"></div>

<div class="assess">

  <!-- ============ FORM STATE ============ -->
  <div id="formState">
    <div class="page-head">
      <div class="eyebrow">The BuildFirst assessment</div>
      <h1>Where are you with AI today?</h1>
      <p class="dek">Ten questions and a few short answers, about ten minutes. You’ll see your profile as soon as you finish: where you are across the four fluency skills, and a prompt to try straight away.</p>
    </div>

    <form id="assessmentForm">

      <!-- SECTION 1: About You -->
      <div class="section">
        <h2 class="section-header">About you</h2>
        <div class="section-desc">The basics.</div>
        <div class="field">
          <label for="name">Name</label>
          <input type="text" id="name" name="Name" required>
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input type="email" id="email" name="Email" required>
        </div>
      </div>

      <!-- SECTION 2: Energy Map -->
      <div class="section">
        <h2 class="section-header">Your energy map</h2>
        <div class="section-desc">For each activity, how does it land for you? 1 = drains your energy, 5 = gives you energy. Go with your gut.</div>
        <div class="energy-grid" id="energyGrid"></div>
        <div class="field">
          <label for="handoff">What would you hand off to a machine tomorrow if you could?</label>
          <textarea id="handoff" name="Would hand off to a machine" rows="3" placeholder="The thing that eats your time but doesn't need to be you."></textarea>
        </div>
      </div>

      <!-- SECTION 3: AI Fluency -->
      <div class="section">
        <h2 class="section-header">Your AI fluency</h2>
        <div class="section-desc">Ten questions based on the AI Fluency Framework. Pick the answer closest to where you are today. No wrong answers.</div>
        <div id="fluencyQuestions"></div>
      </div>

      <!-- SECTION 4: Learning Style -->
      <div class="section">
        <h2 class="section-header">How you take things in</h2>
        <div class="section-desc">This helps us shape how we work with you.</div>
        <div class="field">
          <label>When learning something new, I tend to...</label>
          <div class="option-group" id="learningStyle">
            <label class="option-label"><input type="radio" name="Learning Style" value="Big picture first" required> Need the big picture before I dive in</label>
            <label class="option-label"><input type="radio" name="Learning Style" value="Hands on"> Want to try it myself straight away</label>
            <label class="option-label"><input type="radio" name="Learning Style" value="Data and evidence"> Want to see data and evidence first</label>
            <label class="option-label"><input type="radio" name="Learning Style" value="Walk me through it"> Want someone to walk me through it step by step</label>
          </div>
        </div>
      </div>

      <!-- SECTION 5: Working Together -->
      <div class="section">
        <h2 class="section-header">If you were to build something</h2>
        <div class="section-desc">If you were to build something, anything, with AI what would it be? Assume there are no constraints.</div>
        <div class="field">
          <label for="problem">Name one thing in your work that takes too much time or energy.</label>
          <textarea id="problem" name="Problem to Solve" rows="3" required placeholder="Be specific. A task, a process, a recurring headache."></textarea>
        </div>
        <div class="field">
          <label for="problemWhy">Why does that matter? What is it costing you?</label>
          <textarea id="problemWhy" name="Why It Matters" rows="3" placeholder="Time you are not spending elsewhere? Decisions being made too slowly? Something falling through the cracks?"></textarea>
        </div>
        <div class="field">
          <label for="problemDetail">Walk me through it briefly. When does it come up? Who is involved?</label>
          <textarea id="problemDetail" name="Problem Detail" rows="4" placeholder="How often? What format is the information in? Where does it live?"></textarea>
        </div>
        <div class="field">
          <label for="doneWell">If a machine did it well, what would you get back?</label>
          <textarea id="doneWell" name="Done Well Looks Like" rows="3" placeholder="A summary? A recommendation? A draft? A dashboard? What is the output you actually need?"></textarea>
        </div>
        <div class="field">
          <label for="anythingElse">Anything else you would want it to handle while it is at it?</label>
          <textarea id="anythingElse" name="Anything Else" rows="2" placeholder="It is okay to be ambitious at this stage."></textarea>
        </div>
      </div>

      <!-- Submit -->
      <div class="submit-section">
        <button type="submit" id="submitBtn">Send my answers</button>
      </div>
    </form>
  </div>

  <!-- ============ RESULTS STATE ============ -->
  <div class="results-state" id="resultsState">
    <div class="sent-confirmation">
      <div class="check">&#10003;</div>
      <p>Thank you. Your answers are with us, and your profile is below. To keep a copy, save or print this page.<span id="resultEmail" hidden></span></p>
    </div>

    <h1>Your AI profile.</h1>
    <p class="results-intro" id="resultsIntro">Here is where you are today. This is not a grade. It is a mirror.</p>

    <!-- Overall score -->
    <div class="overall-score">
      <div class="score-num" id="overallNum"></div>
      <div class="score-label">Overall Score / 4.0</div>
      <div class="score-bar"><div class="score-bar-fill" id="overallBar"></div></div>
    </div>

    <!-- Spectrum -->
    <div class="spectrum-section">
      <div class="spectrum-bar" id="spectrumBar">
        <div class="spectrum-segment seg-asking" data-stage="asking">Asking</div>
        <div class="spectrum-segment seg-automation" data-stage="automation">Automation</div>
        <div class="spectrum-segment seg-augmentation" data-stage="augmentation">Augmentation</div>
        <div class="spectrum-segment seg-agency" data-stage="agency">Agency</div>
      </div>

      <!-- Three-layer markers -->
      <div class="spectrum-layers">
        <div class="spectrum-layer">
          <div class="spectrum-layer-label">Practice</div>
          <div class="spectrum-track"><div class="layer-marker marker-practice" id="markerPractice"></div></div>
        </div>
        <div class="spectrum-layer">
          <div class="spectrum-layer-label">Thinking</div>
          <div class="spectrum-track"><div class="layer-marker marker-thinking" id="markerThinking"></div></div>
        </div>
        <div class="spectrum-layer">
          <div class="spectrum-layer-label">Ambition</div>
          <div class="spectrum-track"><div class="layer-marker marker-ambition" id="markerAmbition"></div></div>
        </div>
      </div>

      <!-- Legend -->
      <div class="spectrum-legend">
        <div class="legend-item"><div class="legend-dot practice"></div>What you do today</div>
        <div class="legend-item"><div class="legend-dot thinking"></div>How you think about AI</div>
        <div class="legend-item"><div class="legend-dot ambition"></div>Where you want to be</div>
      </div>

      <!-- Narrative -->
      <div class="spectrum-narrative" id="spectrumNarrative"></div>
    </div>

    <!-- 4D Cards -->
    <div class="dimension-section">
      <h2 class="section-header">The four skills.</h2>
      <div class="section-desc">How you scored on each one.</div>
      <div class="dimension-grid" id="dimensionGrid">
        <div class="dim-card card-delegation">
          <div class="dim-card-title">Delegation</div>
          <div class="dim-card-what">Deciding what to hand off to AI</div>
          <div class="dim-card-level" id="delLevel"></div>
          <div class="dim-bar-track"><div class="dim-bar-fill" id="delBar"></div></div>
        </div>
        <div class="dim-card card-description">
          <div class="dim-card-title">Description</div>
          <div class="dim-card-what">Communicating clearly with AI</div>
          <div class="dim-card-level" id="descLevel"></div>
          <div class="dim-bar-track"><div class="dim-bar-fill" id="descBar"></div></div>
        </div>
        <div class="dim-card card-discernment">
          <div class="dim-card-title">Discernment</div>
          <div class="dim-card-what">Evaluating AI output quality</div>
          <div class="dim-card-level" id="discLevel"></div>
          <div class="dim-bar-track"><div class="dim-bar-fill" id="discBar"></div></div>
        </div>
        <div class="dim-card card-diligence">
          <div class="dim-card-title">Diligence</div>
          <div class="dim-card-what">Responsible and safe AI use</div>
          <div class="dim-card-level" id="dilLevel"></div>
          <div class="dim-bar-track"><div class="dim-bar-fill" id="dilBar"></div></div>
        </div>
      </div>
    </div>

    <!-- Focus area -->
    <div class="focus-area" id="focusArea">
      <div class="focus-area-title" id="focusTitle"></div>
      <p id="focusText"></p>
    </div>

    <!-- AI Prompt Section -->
    <div class="ai-prompt-section" id="aiPromptSection">
      <h2 class="section-header">Try this now</h2>
      <p class="ai-prompt-intro">Copy this prompt into any AI tool, whether that’s ChatGPT, Claude or Gemini, and start building your <strong id="promptDimName"></strong> skills right now. <em>You do not need to know how to use AI to do this. That is the point.</em></p>
      <div class="prompt-box" id="promptBox">
        <button class="copy-btn" id="copyBtn" onclick="copyPrompt()">Copy prompt</button>
        <div id="promptText"></div>
      </div>
    </div>

    <!-- Your Responses -->
    <div class="responses-section" id="responsesSection">
      <h2 class="section-header">What you told us</h2>
      <div class="section-desc">Your answers about what to build together.</div>
      <div id="responsesList"></div>
    </div>

    <div class="framework-note">
      Based on the <a href="https://aifluencyframework.org/" target="_blank" rel="noopener">AI Fluency Framework</a> by Professors Rick Dakan &amp; Joseph Feller, in collaboration with <a href="https://www.anthropic.com/ai-fluency/overview" target="_blank" rel="noopener">Anthropic</a>.
    </div>

    <!-- CTA -->
    <div class="results-cta">
      <h3>Talk it through with us.</h3>
      <p>You know where you are. The next question is what to do about it. Book thirty minutes to walk through your results and find the right next step. It costs nothing.</p>
      <a href="https://calendar.app.google/YcKijHth3KuxVZi28" target="_blank" class="btn-cta">Book thirty minutes</a>
    </div>
  </div>
</div>
  </div>
</section>
<script src="/assets/site/assessment.js"></script>
`,
};
