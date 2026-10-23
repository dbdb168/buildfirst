// The build form: eight short steps, then a review, then FormSubmit emails the answers to David.
let currentStep = 0;
let selectedTools = [];
let maxStepReached = 0;

// Required fields per step
const requiredByStep = {
  0: ['f-name', 'f-email', 'f-role'],
  1: ['f-industry', 'f-context'],
  2: ['f-build'],
  3: ['f-who', 'f-howmany'],
  4: ['f-process'],
  5: ['f-outcome'],
  6: [],
  7: [],
};

// ---- PARTIAL SAVE & ANALYTICS ----
// The Make.com scenario behind this webhook is switched off; answers reach David by FormSubmit below.
const WEBHOOK_URL = 'https://hook.us2.make.com/6942t09md4wpx7nb6rpimv70rcu63f8z';

function gatherPartialData() {
  return {
    name: document.getElementById('f-name').value || '',
    email: document.getElementById('f-email').value || '',
    role: document.getElementById('f-role').value || '',
    industry: document.getElementById('f-industry').value || '',
    context: document.getElementById('f-context').value || '',
    build: document.getElementById('f-build').value || '',
    who: document.getElementById('f-who') ? document.getElementById('f-who').value || '' : '',
    howmany: document.getElementById('f-howmany') ? document.getElementById('f-howmany').value || '' : '',
    process: document.getElementById('f-process') ? document.getElementById('f-process').value || '' : '',
    outcome: document.getElementById('f-outcome') ? document.getElementById('f-outcome').value || '' : '',
    tools: selectedTools.join(', '),
    systems: document.getElementById('f-systems') ? document.getElementById('f-systems').value || '' : '',
    anything: document.getElementById('f-anything') ? document.getElementById('f-anything').value || '' : '',
    step_reached: maxStepReached,
    completed: false,
    timestamp: new Date().toISOString(),
  };
}

function savePartial() {
  const data = gatherPartialData();
  if (!data.email) return;

  if (WEBHOOK_URL) {
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(function(err) { console.warn('[BuildFirst] Save failed:', err); });
  }
}

function saveOnExit() {
  const data = gatherPartialData();
  if (!data.email || data.completed) return;
  data.dropped = true;
  data.drop_step = currentStep;

  if (WEBHOOK_URL) {
    navigator.sendBeacon(WEBHOOK_URL, JSON.stringify(data));
  }
}

function trackEvent(action, label, value) {
  if (typeof gtag === 'function') {
    gtag('event', action, {
      event_category: 'build_intake',
      event_label: label,
      value: value || 0,
    });
  }
}

window.addEventListener('beforeunload', function() {
  if (currentStep > 0 && currentStep <= 7) {
    saveOnExit();
    trackEvent('intake_drop', 'step_' + currentStep, currentStep);
  }
});

// ---- VALIDATION ----
function validate(step) {
  const fields = requiredByStep[step] || [];
  let valid = true;

  document.querySelectorAll('.field-error').forEach(function(e) { e.remove(); });
  document.querySelectorAll('.error').forEach(function(e) { e.classList.remove('error'); });

  for (var i = 0; i < fields.length; i++) {
    var id = fields[i];
    var el = document.getElementById(id);
    var val = el.value.trim();
    if (!val) {
      valid = false;
      el.classList.add('error');
      var msg = document.createElement('div');
      msg.className = 'field-error';
      msg.textContent = 'Please fill this in';
      el.parentNode.appendChild(msg);
    }
    if (id === 'f-email' && val && !val.includes('@')) {
      valid = false;
      el.classList.add('error');
      var msg2 = document.createElement('div');
      msg2.className = 'field-error';
      msg2.textContent = 'Please enter a valid email address';
      el.parentNode.appendChild(msg2);
    }
  }

  return valid;
}

function goTo(step) {
  if (step > currentStep) {
    if (!validate(currentStep)) return;
    trackEvent('intake_step_complete', 'step_' + currentStep, currentStep);
    if (currentStep >= 0) savePartial();
  }

  document.querySelectorAll('.form-step').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById('step-' + step).classList.add('active');

  document.querySelectorAll('.step-dot').forEach(function(d, i) {
    d.className = 'step-dot';
    if (i < step) d.classList.add('done');
    if (i === step) d.classList.add('active');
  });

  if (step === 7) buildReview();

  if (step > maxStepReached) maxStepReached = step;
  currentStep = step;
  document.querySelector('.intake .steps').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleOption(el, group) {
  var val = el.dataset.val;
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    selectedTools = selectedTools.filter(function(t) { return t !== val; });
  } else {
    el.classList.add('selected');
    selectedTools.push(val);
  }
}

function buildReview() {
  var fields = [
    { label: 'Name', val: document.getElementById('f-name').value },
    { label: 'Email', val: document.getElementById('f-email').value },
    { label: 'Role', val: document.getElementById('f-role').value },
    { label: 'Industry', val: document.getElementById('f-industry').value },
    { label: 'Your business', val: document.getElementById('f-context').value },
    { label: 'What you want to build', val: document.getElementById('f-build').value },
    { label: 'Who would use it', val: document.getElementById('f-who').value },
    { label: 'How many people', val: document.getElementById('f-howmany').value },
    { label: 'What happens today', val: document.getElementById('f-process').value },
    { label: 'What would change', val: document.getElementById('f-outcome').value },
    { label: 'AI tools', val: selectedTools.join(', ') },
    { label: 'Systems', val: document.getElementById('f-systems').value },
  ];

  var container = document.getElementById('review-container');
  container.innerHTML = fields.map(function(f) {
    var isEmpty = !f.val || f.val.trim() === '';
    return '<div class="review-card">' +
      '<div class="review-label">' + f.label + '</div>' +
      '<div class="review-value ' + (isEmpty ? 'empty' : '') + '">' + (isEmpty ? 'Not provided' : escapeHtml(f.val)) + '</div>' +
    '</div>';
  }).join('');
}

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function submitForm() {
  var data = {
    name: document.getElementById('f-name').value,
    email: document.getElementById('f-email').value,
    role: document.getElementById('f-role').value,
    industry: document.getElementById('f-industry').value,
    context: document.getElementById('f-context').value,
    build: document.getElementById('f-build').value,
    who: document.getElementById('f-who').value,
    howmany: document.getElementById('f-howmany').value,
    process: document.getElementById('f-process').value,
    outcome: document.getElementById('f-outcome').value,
    tools: selectedTools.join(', '),
    systems: document.getElementById('f-systems').value,
    anything: document.getElementById('f-anything').value,
  };

  trackEvent('intake_submitted', data.email, 8);

  // Mark as completed and do final save
  var finalData = gatherPartialData();
  finalData.completed = true;
  finalData.step_reached = 8;
  if (WEBHOOK_URL) {
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData),
    }).catch(function(err) { console.warn('[BuildFirst] Final save failed:', err); });
  }

  // Email the answers to David through FormSubmit (same route as the assessment)
  fetch('https://formsubmit.co/ajax/david@thisisluminary.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      '_subject': 'BuildFirst: Build Inquiry from ' + (data.name || 'Website'),
      '_template': 'table',
      '_captcha': 'false',
      '_replyto': data.email,
      'Name': data.name,
      'Email': data.email,
      'Role': data.role,
      'Industry': data.industry,
      'Business Context': data.context,
      'What They Want to Build': data.build,
      'Who Has This Problem': data.who,
      'How Many People Affected': data.howmany,
      'Current Process': data.process,
      'Most Desired Outcome': data.outcome,
      'Current AI Tools': data.tools || 'Not specified',
      'Existing Systems': data.systems || 'Not specified',
      'Anything Else': data.anything || 'None',
    }),
  }).catch(function(err) { console.warn('[BuildFirst] Email send failed:', err); });

  document.querySelectorAll('.form-step').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById('step-success').classList.add('active');
  document.querySelectorAll('.step-dot').forEach(function(d) {
    d.className = 'step-dot done';
  });
  document.querySelector('.intake .steps').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Track form start
trackEvent('intake_started', 'step_0', 0);
