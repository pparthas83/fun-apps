// View Controller & DOM Renderers for Edison Math Trainer
import { getState, saveProgress } from '../core/state.js';
import { buildNumberLineSVG } from '../engines/evaluator.js';
import { resetChecklist } from './checklist.js';

let toastTimer = null;

export function triggerMathTypeset(targetElement = document.body) {
  if (typeof window !== 'undefined' && window.renderMathInElement) {
    window.renderMathInElement(targetElement, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ],
      throwOnError: false
    });
  }
}

export function updateStatsDisplay() {
  const state = getState();
  const sEl = document.getElementById('stat-score');
  const strEl = document.getElementById('stat-streak');
  const bStrEl = document.getElementById('stat-best-streak');
  const tEl = document.getElementById('stat-total');
  const mEl = document.getElementById('stat-mastered');

  if (sEl) sEl.textContent = state.score;
  if (strEl) strEl.textContent = state.streak;
  if (bStrEl) bStrEl.textContent = state.userProgress.bestStreak;
  if (tEl) tEl.textContent = state.totalAnswered;
  if (mEl) {
    const masteredCount = Object.keys(state.userProgress.masteredIds).length;
    mEl.textContent = `${masteredCount}/22`;
  }
}

export function renderCurrentQuestion() {
  const state = getState();
  if (!state.activeQuestions || state.activeQuestions.length === 0) return;
  const q = state.activeQuestions[state.currentIndex];
  state.answered = false;

  // Reset 5-step checklist and clear input for new question
  resetChecklist();
  const input = document.getElementById('answer-input');
  if (input) {
    input.value = '';
    input.disabled = false;
    input.className = "w-full px-4 py-3.5 rounded-2xl border-2 border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-lg font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-normal outline-none transition shadow-inner bg-slate-50/50";
    setTimeout(() => input.focus(), 50);
  }
  const submitBtn = document.getElementById('submit-answer-btn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  }

  // Progress indicators
  const qCounter = document.getElementById('q-counter');
  const progressBar = document.getElementById('progress-bar');
  if (state.currentFilter === 'infinite') {
    if (qCounter) qCounter.textContent = `Question ${state.currentIndex + 1} (Infinite Practice)`;
    if (progressBar) progressBar.style.width = '100%';
  } else {
    if (qCounter) qCounter.textContent = `Question ${state.currentIndex + 1} of ${state.activeQuestions.length}`;
    const pct = Math.round(((state.currentIndex + 1) / state.activeQuestions.length) * 100);
    if (progressBar) progressBar.style.width = `${pct}%`;
  }

  // Badges
  const badgeColors = {
    1: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    2: 'bg-amber-100 text-amber-800 border-amber-300',
    3: 'bg-rose-100 text-rose-800 border-rose-300'
  };
  const isMastered = q.id && state.userProgress.masteredIds[q.id];

  let sourceBadge = '';
  if (q.source) {
    if (q.source.includes('Teacher')) {
      sourceBadge = `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">🍎 Teacher Slide</span>`;
    } else if (q.source.includes('Skills Practice')) {
      sourceBadge = `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200">📝 2.5 Skills Practice</span>`;
    } else if (q.source.includes('Writing Equations')) {
      sourceBadge = `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 border border-violet-200">📈 2.5 Writing Equations</span>`;
    } else if (q.source.includes('Practice')) {
      sourceBadge = `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700 border border-teal-200">📄 2.5 Practice</span>`;
    } else if (q.source.includes('Generator')) {
      sourceBadge = `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">🔄 Infinite Clone</span>`;
    }
  }

  const badgeContainer = document.getElementById('q-badges');
  if (badgeContainer) {
    badgeContainer.innerHTML = `
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${badgeColors[q.level] || badgeColors[1]}">
        ${q.levelName || 'Level ' + q.level}
      </span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
        ${q.subtopic || 'Algebra 1'}
      </span>
      ${sourceBadge}
      ${isMastered ? `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">⭐ Mastered</span>` : ''}
    `;
  }

  // Equation / Graph & Prompt Layout
  const graphContainer = document.getElementById('inline-graph-container');
  const graphSvg = document.getElementById('inline-graph-svg');
  const eqBox = document.getElementById('equation-card-box');
  const eqDisplay = document.getElementById('equation-display');
  const ansLabel = document.getElementById('answer-label');

  if (q.type === 'write_equation' || q.graphPoints) {
    if (graphContainer && graphSvg) {
      graphContainer.classList.remove('hidden');
      graphSvg.innerHTML = buildNumberLineSVG(q.graphPoints, true);
    }
    if (eqBox) eqBox.classList.add('hidden');
    if (ansLabel) ansLabel.textContent = "Your Equation (or Solution Set):";
    if (input) input.placeholder = "e.g. |x + 3| = 2 or {-5, -1}";
  } else if (q.type === 'eval') {
    if (graphContainer) graphContainer.classList.add('hidden');
    if (eqBox) eqBox.classList.remove('hidden');
    if (eqDisplay) eqDisplay.innerHTML = `$$${q.equation}$$`;
    if (ansLabel) ansLabel.textContent = "Your Answer (Value):";
    if (input) input.placeholder = "e.g. 9";
  } else {
    if (graphContainer) graphContainer.classList.add('hidden');
    if (eqBox) eqBox.classList.remove('hidden');
    if (eqDisplay) eqDisplay.innerHTML = `$$${q.equation}$$`;
    if (ansLabel) ansLabel.textContent = "Your Solution Set:";
    if (input) input.placeholder = "e.g. {-6, 2} or No solution";
  }

  const promptDisplay = document.getElementById('prompt-display');
  if (promptDisplay) promptDisplay.innerHTML = q.prompt;

  // Hide feedback & Dig Deeper initially
  const feedbackCard = document.getElementById('feedback-card');
  const digDeeperCard = document.getElementById('dig-deeper-card');
  const digDeeperBtn = document.getElementById('dig-deeper-toggle-btn');
  const nextBtnContainer = document.getElementById('next-btn-container');

  if (feedbackCard) feedbackCard.classList.add('hidden');
  if (digDeeperCard) digDeeperCard.classList.add('hidden');
  if (digDeeperBtn) digDeeperBtn.classList.add('hidden');
  if (nextBtnContainer) nextBtnContainer.classList.add('hidden');

  // Trigger KaTeX render
  const questionCard = document.getElementById('question-card');
  if (questionCard) triggerMathTypeset(questionCard);
}

export function populateDigDeeper(q) {
  const card = document.getElementById('dig-deeper-card');
  const ruleBox = document.getElementById('dd-rule-box');
  const stepsBox = document.getElementById('dd-steps-box');
  const nlBox = document.getElementById('dd-numberline-box');

  if (ruleBox && q.digDeeper) {
    ruleBox.innerHTML = `
      <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-sm">
        <div class="font-bold text-amber-800 mb-1 flex items-center gap-2">
          <span>⚡ Teacher Rule / Trap Alert:</span>
        </div>
        <div>${q.digDeeper.rule}</div>
      </div>
    `;
  }

  if (stepsBox && q.digDeeper && Array.isArray(q.digDeeper.steps)) {
    stepsBox.innerHTML = q.digDeeper.steps.map(step => `
      <li class="p-3 bg-white rounded-xl border border-slate-200 text-slate-800 text-sm shadow-2xs leading-relaxed">
        ${step}
      </li>
    `).join('');
  }

  if (nlBox) {
    if (q.numberLine && q.numberLine.length > 0) {
      nlBox.classList.remove('hidden');
      drawNumberLine(q.numberLine);
    } else {
      nlBox.classList.add('hidden');
    }
  }

  if (card) triggerMathTypeset(card);
}

export function toggleDigDeeper() {
  const card = document.getElementById('dig-deeper-card');
  if (!card) return;
  if (card.classList.contains('hidden')) {
    openDigDeeper();
  } else {
    card.classList.add('hidden');
  }
}

export function openDigDeeper() {
  const card = document.getElementById('dig-deeper-card');
  if (card) {
    card.classList.remove('hidden');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

export function drawNumberLine(points) {
  const container = document.getElementById('numberline-canvas-container');
  if (container) {
    container.innerHTML = buildNumberLineSVG(points, true);
  }
}

export function showToast(msg, icon = '🎲') {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast || !toastText) return;

  toastText.textContent = msg;
  if (toastIcon) toastIcon.textContent = icon;

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2500);
}

export function showSummaryModal() {
  const state = getState();
  const modal = document.getElementById('summary-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  const pct = state.totalAnswered > 0 ? Math.round((state.score / state.totalAnswered) * 100) : 0;
  
  const scoreEl = document.getElementById('summary-score');
  const pctEl = document.getElementById('summary-pct');
  const msgEl = document.getElementById('summary-msg');

  if (scoreEl) scoreEl.textContent = `${state.score} / ${state.totalAnswered}`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  
  let msg = "Great practice session! Keep going!";
  if (pct >= 90) msg = "🔥 Outstanding! You are in great shape for Thursday's quiz!";
  else if (pct >= 75) msg = "💪 Solid work! Focus on the Level 2 & 3 traps to ace Thursday!";
  else msg = "📚 Good effort! Review the 'Dig Deeper' teacher steps on the questions you missed.";
  if (msgEl) msgEl.textContent = msg;
}
