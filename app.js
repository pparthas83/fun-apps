// Edison 7th Grade Algebra 1 - 2.5 Absolute Value Practice App
// Pure Client-Side Logic with Fill-in-the-Blank Answer Input & Zero Token Cost

const STORAGE_KEY = 'edison_math_progress_v1';

let userProgress = {
  bestStreak: 0,
  masteredIds: {},
  lifetimeAnswered: 0,
  lifetimeCorrect: 0
};

let activeQuestions = [];
let currentIndex = 0;
let currentFilter = 'all'; // 'all', '1', '2', '3', 'quiz'
let score = 0;
let streak = 0;
let totalAnswered = 0;
let answered = false;

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  initInputListeners();
  setFilter('all');
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ],
      throwOnError: false
    });
  }
});

function initInputListeners() {
  const input = document.getElementById('answer-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitAnswer();
      }
    });
  }
}

function insertSymbol(sym) {
  const input = document.getElementById('answer-input');
  if (!input || answered) return;
  input.focus();
  
  if (sym === 'No solution') {
    input.value = 'No solution';
    return;
  }
  
  if (sym === '{ , }') {
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const val = input.value;
    input.value = val.substring(0, start) + '{' + val.substring(start, end) + '}' + val.substring(end);
    input.setSelectionRange(start + 1, start + 1);
    return;
  }

  if (sym === '| |') {
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const val = input.value;
    input.value = val.substring(0, start) + '|' + val.substring(start, end) + '|' + val.substring(end);
    input.setSelectionRange(start + 1, start + 1);
    return;
  }

  const start = input.selectionStart || 0;
  const end = input.selectionEnd || 0;
  input.value = input.value.substring(0, start) + sym + input.value.substring(end);
  input.setSelectionRange(start + sym.length, start + sym.length);
}

function clearAnswerInput() {
  const input = document.getElementById('answer-input');
  if (input && !answered) {
    input.value = '';
    input.focus();
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      userProgress.bestStreak = data.bestStreak || 0;
      userProgress.masteredIds = data.masteredIds || {};
      userProgress.lifetimeAnswered = data.lifetimeAnswered || 0;
      userProgress.lifetimeCorrect = data.lifetimeCorrect || 0;
    }
  } catch (e) {
    console.warn("localStorage not available:", e);
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

function resetAllProgress(skipConfirm = false) {
  if (skipConfirm || confirm("Reset all saved progress, best streak, and mastered badges on this device?")) {
    userProgress = {
      bestStreak: 0,
      masteredIds: {},
      lifetimeAnswered: 0,
      lifetimeCorrect: 0
    };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    score = 0;
    streak = 0;
    totalAnswered = 0;
    updateStatsDisplay();
    renderCurrentQuestion();
  }
}

function updateStatsDisplay() {
  const sEl = document.getElementById('stat-score');
  const strEl = document.getElementById('stat-streak');
  const bStrEl = document.getElementById('stat-best-streak');
  const tEl = document.getElementById('stat-total');
  const mEl = document.getElementById('stat-mastered');

  if (sEl) sEl.innerText = score;
  if (strEl) strEl.innerText = streak;
  if (bStrEl) bStrEl.innerText = userProgress.bestStreak;
  if (tEl) tEl.innerText = totalAnswered;
  if (mEl) {
    const masteredCount = Object.keys(userProgress.masteredIds).length;
    mEl.innerText = `${masteredCount}/${QUESTION_BANK.length}`;
  }
}

function setFilter(filter) {
  currentFilter = filter;
  answered = false;
  
  if (filter === 'quiz') {
    score = 0;
    streak = 0;
    totalAnswered = 0;
  }
  updateStatsDisplay();

  document.querySelectorAll('.filter-btn').forEach(btn => {
    if (btn.dataset.filter === filter) {
      btn.className = "filter-btn px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-md shadow-blue-200 transition";
    } else {
      btn.className = "filter-btn px-4 py-2 rounded-xl text-sm font-semibold bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 transition";
    }
  });

  if (filter === 'all') {
    activeQuestions = [...QUESTION_BANK];
  } else if (filter === '1') {
    activeQuestions = QUESTION_BANK.filter(q => q.level === 1);
  } else if (filter === '2') {
    activeQuestions = QUESTION_BANK.filter(q => q.level === 2);
  } else if (filter === '3') {
    activeQuestions = QUESTION_BANK.filter(q => q.level === 3);
  } else if (filter === 'quiz') {
    const l1 = shuffleArray(QUESTION_BANK.filter(q => q.level === 1)).slice(0, 3);
    const l2 = shuffleArray(QUESTION_BANK.filter(q => q.level === 2)).slice(0, 4);
    const l3 = shuffleArray(QUESTION_BANK.filter(q => q.level === 3)).slice(0, 3);
    activeQuestions = shuffleArray([...l1, ...l2, ...l3]);
  } else if (filter === 'infinite') {
    activeQuestions = Array.from({ length: 10 }, () => ProblemGenerator.generateRandom());
    showToast('♾️ Infinite Practice Mode: Endless problems across all topics!');
  } else if (filter === 'graphs') {
    activeQuestions = QUESTION_BANK.filter(q => q.type === 'write_equation' || (q.subtopic && q.subtopic.includes('Writing Equations')));
  } else if (filter === 'eval') {
    activeQuestions = QUESTION_BANK.filter(q => q.type === 'eval' || (q.subtopic && q.subtopic.includes('Evaluating')));
  } else if (filter === 'word') {
    activeQuestions = QUESTION_BANK.filter(q => q.type === 'word_problem' || (q.subtopic && (q.subtopic.includes('Tolerance') || q.subtopic.includes('Real-World'))));
  }

  currentIndex = 0;
  renderCurrentQuestion();
}

function shuffleArray(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

function renderCurrentQuestion() {
  if (activeQuestions.length === 0) return;
  const q = activeQuestions[currentIndex];
  answered = false;

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
  if (currentFilter === 'infinite') {
    document.getElementById('q-counter').innerText = `Question ${currentIndex + 1} (Infinite Practice)`;
    document.getElementById('progress-bar').style.width = '100%';
  } else {
    document.getElementById('q-counter').innerText = `Question ${currentIndex + 1} of ${activeQuestions.length}`;
    const pct = Math.round(((currentIndex + 1) / activeQuestions.length) * 100);
    document.getElementById('progress-bar').style.width = `${pct}%`;
  }

  // Badges
  const badgeColors = {
    1: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    2: 'bg-amber-100 text-amber-800 border-amber-300',
    3: 'bg-rose-100 text-rose-800 border-rose-300'
  };
  const isMastered = q.id && userProgress.masteredIds[q.id];

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
  badgeContainer.innerHTML = `
    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${badgeColors[q.level]}">
      ${q.levelName}
    </span>
    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
      ${q.subtopic}
    </span>
    ${sourceBadge}
    ${isMastered ? `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">⭐ Mastered</span>` : ''}
  `;

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
    if (ansLabel) ansLabel.innerText = "Your Equation (or Solution Set):";
    if (input) input.placeholder = "e.g. |x + 3| = 2 or {-5, -1}";
  } else if (q.type === 'eval') {
    if (graphContainer) graphContainer.classList.add('hidden');
    if (eqBox) eqBox.classList.remove('hidden');
    if (eqDisplay) eqDisplay.innerHTML = `$$${q.equation}$$`;
    if (ansLabel) ansLabel.innerText = "Your Answer (Value):";
    if (input) input.placeholder = "e.g. 9";
  } else {
    if (graphContainer) graphContainer.classList.add('hidden');
    if (eqBox) eqBox.classList.remove('hidden');
    if (eqDisplay) eqDisplay.innerHTML = `$$${q.equation}$$`;
    if (ansLabel) ansLabel.innerText = "Your Solution Set:";
    if (input) input.placeholder = "e.g. {-6, 2} or No solution";
  }

  document.getElementById('prompt-display').innerHTML = q.prompt;

  // Hide feedback & Dig Deeper initially
  document.getElementById('feedback-card').classList.add('hidden');
  document.getElementById('dig-deeper-card').classList.add('hidden');
  document.getElementById('dig-deeper-toggle-btn').classList.add('hidden');
  document.getElementById('next-btn-container').classList.add('hidden');

  // Trigger KaTeX render
  if (window.renderMathInElement) {
    renderMathInElement(document.getElementById('question-card'), {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ],
      throwOnError: false
    });
  }
}

// ==========================================
// MATHEMATICAL NORMALIZATION & ANSWER CHECKING
// ==========================================
function buildNumberLineSVG(points, showPointLabels = true) {
  if (!points || points.length === 0) return '';
  const minVal = Math.min(...points);
  const maxVal = Math.max(...points);
  const span = Math.max(maxVal - minVal, 8);
  const padding = Math.max(3, Math.ceil(span * 0.3));
  const start = Math.floor(minVal - padding);
  const end = Math.ceil(maxVal + padding);

  const width = 600;
  const height = 80;
  const y = 45;

  let svg = `<svg viewBox="0 0 ${width} ${height}" class="w-full max-w-xl mx-auto overflow-visible">`;
  svg += `<line x1="20" y1="${y}" x2="${width - 20}" y2="${y}" stroke="#64748b" stroke-width="3" />`;
  svg += `<polygon points="15,${y} 25,${y - 5} 25,${y + 5}" fill="#64748b" />`;
  svg += `<polygon points="${width - 15},${y} ${width - 25},${y - 5} ${width - 25},${y + 5}" fill="#64748b" />`;

  const scale = (val) => 40 + ((val - start) / (end - start)) * (width - 80);

  const range = end - start;
  let step = 1;
  if (range > 20) step = 2;
  if (range > 50) step = 5;
  if (range > 100) step = 10;

  for (let v = start; v <= end; v += step) {
    const x = scale(v);
    svg += `<line x1="${x}" y1="${y - 6}" x2="${x}" y2="${y + 6}" stroke="#94a3b8" stroke-width="1.5" />`;
    svg += `<text x="${x}" y="${y + 22}" font-size="11" font-weight="600" text-anchor="middle" fill="#64748b">${v}</text>`;
  }

  points.forEach(pt => {
    const x = scale(pt);
    svg += `<circle cx="${x}" cy="${y}" r="8" fill="#2563eb" stroke="#ffffff" stroke-width="2.5" />`;
    if (showPointLabels) {
      svg += `<text x="${x}" y="${y - 12}" font-size="12" font-weight="bold" text-anchor="middle" fill="#1d4ed8">${Number.isInteger(pt) ? pt : pt.toFixed(2)}</text>`;
    }
  });

  svg += `</svg>`;
  return svg;
}

function parseAbsoluteValueEquation(str) {
  if (!str) return null;
  const s = str.replace(/\s+/g, '');
  const m = s.match(/^\|([a-zA-Z])(?:([+-])([0-9.]+))?\|=([0-9.]+)$/);
  if (!m) return null;
  const variable = m[1];
  const sign = m[2];
  const offset = m[3] ? parseFloat(m[3]) : 0;
  const dist = parseFloat(m[4]);

  let midpoint = 0;
  if (sign === '-') midpoint = offset;
  else if (sign === '+') midpoint = -offset;

  return {
    variable,
    midpoint,
    dist,
    r1: midpoint - dist,
    r2: midpoint + dist
  };
}

function parseNumberOrFraction(str) {
  str = str.trim();
  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) return num / den;
    }
  }
  const val = parseFloat(str);
  return isNaN(val) ? null : val;
}

function parseAnswers(inputStr) {
  if (!inputStr) return { isNoSolution: false, numbers: [] };
  const raw = inputStr.trim().toLowerCase();
  
  const noSolPatterns = ["no solution", "no sol", "none", "empty", "∅", "{}", "phi", "null", "no real", "\\emptyset"];
  for (const pat of noSolPatterns) {
    if (raw.includes(pat) || raw === "{}") return { isNoSolution: true, numbers: [] };
  }
  
  // Clean out common prefix variables, curly braces, and units
  let cleaned = raw.replace(/[{}x=fmkwhyd\\$]/gi, " ");
  cleaned = cleaned.replace(/and/gi, ",");
  cleaned = cleaned.replace(/ml|miles|mile/gi, " ");
  
  const tokens = cleaned.split(/[\s,]+/).map(t => t.trim()).filter(Boolean);
  const numbers = [];
  for (const tok of tokens) {
    const val = parseNumberOrFraction(tok);
    if (val !== null) numbers.push(val);
  }
  return { isNoSolution: false, numbers };
}

function evaluateStudentAnswer(userInput, expectedSolutionSet, expectedNumberLine, currentQ) {
  if (!userInput) return { isCorrect: false, formattingTip: null };

  // Case 1: Expression Evaluation (single numerical value)
  if (currentQ && (currentQ.type === 'eval' || (currentQ.subtopic && currentQ.subtopic.includes('Evaluating')))) {
    const parsedUser = parseAnswers(userInput);
    const parsedExp = parseAnswers(expectedSolutionSet);
    if (parsedUser.numbers.length === 1 && parsedExp.numbers.length === 1) {
      if (Math.abs(parsedUser.numbers[0] - parsedExp.numbers[0]) < 0.01) {
        return { isCorrect: true, formattingTip: null };
      }
    }
    return { isCorrect: false, formattingTip: null };
  }

  // Case 2: Writing Equation from Graph
  if (currentQ && (currentQ.type === 'write_equation' || (currentQ.subtopic && currentQ.subtopic.includes('Writing Equations')) || currentQ.graphPoints)) {
    // Check if user entered equation: e.g. |x + 3| = 2 or |x| = 1
    const parsedEq = parseAbsoluteValueEquation(userInput);
    if (parsedEq) {
      const expMidpoint = currentQ.midpoint !== undefined ? currentQ.midpoint : (currentQ.graphPoints ? (currentQ.graphPoints[0] + currentQ.graphPoints[1]) / 2 : 0);
      const expDist = currentQ.distance !== undefined ? currentQ.distance : (currentQ.graphPoints ? Math.abs(currentQ.graphPoints[1] - expMidpoint) : 0);

      const midMatch = Math.abs(parsedEq.midpoint - expMidpoint) < 0.01;
      const distMatch = Math.abs(parsedEq.dist - expDist) < 0.01;
      if (midMatch && distMatch) {
        return {
          isCorrect: true,
          formattingTip: "Perfect equation! Accurately formulated as $|x - \\text{midpoint}| = \\text{distance}$."
        };
      }
    }

    // Also accept student entering the solution set points: e.g. {-5, -1}
    const parsedUserPts = parseAnswers(userInput);
    const targetPoints = currentQ.graphPoints || expectedNumberLine || [];
    if (parsedUserPts.numbers.length === targetPoints.length && targetPoints.length > 0) {
      const uSorted = [...parsedUserPts.numbers].sort((a, b) => a - b);
      const tSorted = [...targetPoints].sort((a, b) => a - b);
      if (uSorted.every((u, i) => Math.abs(u - tSorted[i]) < 0.01)) {
        return {
          isCorrect: true,
          formattingTip: `Great job identifying the solution points! The target equation is: $${currentQ.targetEquation || currentQ.equation}$.`
        };
      }
    }

    return { isCorrect: false, formattingTip: null };
  }

  // Case 3: Real-World Word Problems
  if (currentQ && currentQ.type === 'word_problem') {
    const parsedEq = parseAbsoluteValueEquation(userInput);
    if (parsedEq && currentQ.equation) {
      const expEq = parseAbsoluteValueEquation(currentQ.equation);
      if (expEq && Math.abs(parsedEq.midpoint - expEq.midpoint) < 0.01 && Math.abs(parsedEq.dist - expEq.dist) < 0.01) {
        return { isCorrect: true, formattingTip: `Spot on! Solution: $${currentQ.solutionSet}$.` };
      }
    }
  }

  // Case 4: Standard Solving of Absolute Value Equations
  const parsedUser = parseAnswers(userInput);
  const parsedExpected = parseAnswers(expectedSolutionSet);
  
  const isExpectedNoSol = expectedSolutionSet === "∅" || parsedExpected.isNoSolution || (!expectedNumberLine || expectedNumberLine.length === 0);
  
  if (isExpectedNoSol) {
    return {
      isCorrect: parsedUser.isNoSolution,
      formattingTip: null
    };
  }
  
  if (parsedUser.isNoSolution) {
    return {
      isCorrect: false,
      formattingTip: null
    };
  }
  
  // Target values from expected solutionSet or numberLine
  const targetNumbers = parsedExpected.numbers.length > 0 ? parsedExpected.numbers : (expectedNumberLine || []);
  
  if (parsedUser.numbers.length === 0 || parsedUser.numbers.length !== targetNumbers.length) {
    return {
      isCorrect: false,
      formattingTip: null
    };
  }
  
  const userSorted = [...parsedUser.numbers].sort((a,b) => a - b);
  const expSorted = [...targetNumbers].sort((a,b) => a - b);
  
  const numbersMatch = userSorted.every((u, i) => Math.abs(u - expSorted[i]) < 0.01);
  if (!numbersMatch) {
    return {
      isCorrect: false,
      formattingTip: null
    };
  }
  
  // Numbers are correct! Check if student used set notation
  const trimmed = userInput.trim();
  const hasBraces = trimmed.startsWith('{') && trimmed.endsWith('}');
  let formattingTip = null;
  if (!hasBraces) {
    formattingTip = "Great work! Pro tip: For Algebra 1 tests in Edison, teachers love set notation in braces: $\\{" + expSorted.join(', ') + "\\}$.";
  }
  
  return {
    isCorrect: true,
    formattingTip
  };
}

function submitAnswer() {
  if (answered) return;
  const input = document.getElementById('answer-input');
  const userRaw = input ? input.value.trim() : '';
  
  if (!userRaw) {
    if (input) {
      input.focus();
      input.classList.add('border-rose-400', 'bg-rose-50/50');
      setTimeout(() => input.classList.remove('border-rose-400', 'bg-rose-50/50'), 1000);
    }
    return;
  }

  const q = activeQuestions[currentIndex];
  answered = true;
  totalAnswered++;
  userProgress.lifetimeAnswered++;

  const evalResult = evaluateStudentAnswer(userRaw, q.solutionSet, q.numberLine, q);
  const isCorrect = evalResult.isCorrect;

  // Lock input
  if (input) {
    input.disabled = true;
    if (isCorrect) {
      input.className = "w-full px-4 py-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50 text-emerald-950 text-lg font-bold outline-none shadow-sm";
    } else {
      input.className = "w-full px-4 py-3.5 rounded-2xl border-2 border-rose-500 bg-rose-50 text-rose-950 text-lg font-bold outline-none shadow-sm";
    }
  }
  const submitBtn = document.getElementById('submit-answer-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }

  // Feedback Card
  const feedbackCard = document.getElementById('feedback-card');
  feedbackCard.classList.remove('hidden');

  let formattedCorrect = "";
  if (q.type === 'eval') {
    formattedCorrect = `${q.solutionSet}`;
  } else if (q.type === 'write_equation') {
    formattedCorrect = `${q.targetEquation || q.equation} \\iff \\{${q.graphPoints ? q.graphPoints.join(', ') : ''}\\}`;
  } else if (q.solutionSet === "∅") {
    formattedCorrect = "\\emptyset \\text{ (No Solution)}";
  } else {
    formattedCorrect = `\\{${(q.solutionSet.replace(/[{}]/g, ''))}\\}`;
  }

  if (isCorrect) {
    score++;
    streak++;
    userProgress.lifetimeCorrect++;
    if (streak > userProgress.bestStreak) {
      userProgress.bestStreak = streak;
    }
    if (q.id && !q.id.startsWith('GEN-')) {
      userProgress.masteredIds[q.id] = true;
    }
    saveProgress();

    feedbackCard.className = "p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 shadow-sm animate-bounce-short";
    feedbackCard.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-3xl">🎉</span>
        <div>
          <h4 class="font-black text-lg text-emerald-800">Spot on! Excellent work!</h4>
          <p class="text-sm text-emerald-800 mt-0.5">Solution: <strong class="font-bold text-base text-emerald-900">$${formattedCorrect}$</strong></p>
          ${evalResult.formattingTip ? `<p class="text-xs text-emerald-700 mt-2 bg-emerald-100/60 p-2 rounded-lg font-medium">${evalResult.formattingTip}</p>` : ''}
        </div>
      </div>
    `;
  } else {
    streak = 0;
    saveProgress();

    feedbackCard.className = "p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-900 shadow-sm";
    feedbackCard.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-3xl">💡</span>
        <div>
          <h4 class="font-black text-lg text-rose-800">Not quite - let's check the steps!</h4>
          <p class="text-sm text-rose-700 mt-0.5">You entered: <code class="px-1.5 py-0.5 bg-rose-100 text-rose-900 rounded font-bold">${userRaw}</code></p>
          <p class="text-sm text-rose-800 mt-1">The correct result is: <strong class="font-bold text-base text-rose-950">$${formattedCorrect}$</strong>.</p>
          <p class="text-xs text-rose-700 mt-2">Click <strong>"Dig Deeper"</strong> below to see the teacher's exact step-by-step breakdown!</p>
        </div>
      </div>
    `;
  }

  // Update Score Board
  updateStatsDisplay();

  // Reveal Dig Deeper & Next Buttons
  document.getElementById('dig-deeper-toggle-btn').classList.remove('hidden');
  document.getElementById('next-btn-container').classList.remove('hidden');

  // Populate Dig Deeper Card content
  populateDigDeeper(q);

  // If wrong, auto-open Dig Deeper so he learns right away!
  if (!isCorrect) {
    openDigDeeper();
  }

  if (window.renderMathInElement) {
    renderMathInElement(feedbackCard, {
      delimiters: [{left: '$', right: '$', display: false}],
      throwOnError: false
    });
  }
}

function populateDigDeeper(q) {
  const card = document.getElementById('dig-deeper-card');
  const ruleBox = document.getElementById('dd-rule-box');
  const stepsBox = document.getElementById('dd-steps-box');
  const nlBox = document.getElementById('dd-numberline-box');

  ruleBox.innerHTML = `
    <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-sm">
      <div class="font-bold text-amber-800 mb-1 flex items-center gap-2">
        <span>⚡ Teacher Rule / Trap Alert:</span>
      </div>
      <div>${q.digDeeper.rule}</div>
    </div>
  `;

  stepsBox.innerHTML = q.digDeeper.steps.map(step => `
    <li class="p-3 bg-white rounded-xl border border-slate-200 text-slate-800 text-sm shadow-2xs leading-relaxed">
      ${step}
    </li>
  `).join('');

  if (q.numberLine && q.numberLine.length > 0) {
    nlBox.classList.remove('hidden');
    drawNumberLine(q.numberLine);
  } else {
    nlBox.classList.add('hidden');
  }

  if (window.renderMathInElement) {
    renderMathInElement(card, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ],
      throwOnError: false
    });
  }
}

function toggleDigDeeper() {
  const card = document.getElementById('dig-deeper-card');
  if (card.classList.contains('hidden')) {
    openDigDeeper();
  } else {
    card.classList.add('hidden');
  }
}

function openDigDeeper() {
  const card = document.getElementById('dig-deeper-card');
  card.classList.remove('hidden');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function drawNumberLine(points) {
  const container = document.getElementById('numberline-canvas-container');
  if (container) {
    container.innerHTML = buildNumberLineSVG(points, true);
  }
}

function nextQuestion() {
  if (currentFilter === 'infinite') {
    if (currentIndex >= activeQuestions.length - 2) {
      activeQuestions.push(ProblemGenerator.generateRandom());
    }
    currentIndex++;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (currentIndex < activeQuestions.length - 1) {
    currentIndex++;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    showSummaryModal();
  }
}

function practiceClone() {
  const currentQ = activeQuestions[currentIndex];
  const clone = ProblemGenerator.generateCloneFor(currentQ);
  activeQuestions.splice(currentIndex + 1, 0, clone);
  nextQuestion();
  showToast('🔄 Generated similar problem clone!');
}

function crankCurrentClone() {
  if (activeQuestions.length === 0) return;
  const currentQ = activeQuestions[currentIndex];
  const clone = ProblemGenerator.generateCloneFor(currentQ);
  activeQuestions.splice(currentIndex + 1, 0, clone);
  currentIndex++;
  renderCurrentQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast('🔄 Cranked fresh clone with new numbers!');
}

function crankMoreProblems(n = 10) {
  const newProblems = [];
  for (let i = 0; i < n; i++) {
    let p;
    if (currentFilter === '1') {
      p = ProblemGenerator.generateLevel1();
    } else if (currentFilter === '2') {
      p = ProblemGenerator.generateLevel2();
    } else if (currentFilter === '3') {
      p = ProblemGenerator.generateLevel3();
    } else if (currentFilter === 'graphs') {
      p = ProblemGenerator.generateWritingEquationFromGraph();
    } else if (currentFilter === 'eval') {
      p = ProblemGenerator.generateEvaluatingExpression();
    } else if (currentFilter === 'word') {
      p = ProblemGenerator.generateToleranceWordProblem();
    } else {
      p = ProblemGenerator.generateRandom();
    }
    newProblems.push(p);
  }

  activeQuestions.push(...newProblems);
  if (currentFilter !== 'infinite') {
    document.getElementById('q-counter').innerText = `Question ${currentIndex + 1} of ${activeQuestions.length}`;
    const pct = Math.round(((currentIndex + 1) / activeQuestions.length) * 100);
    document.getElementById('progress-bar').style.width = `${pct}%`;
  }
  showToast(`🎲 Cranked +${n} fresh practice problems! (Queue: ${activeQuestions.length})`);
}

function showToast(msg, icon = '🎲') {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast || !toastText) return;

  toastText.innerText = msg;
  if (toastIcon) toastIcon.innerText = icon;

  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  if (window.toastTimer) clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2500);
}

function showSummaryModal() {
  const modal = document.getElementById('summary-modal');
  modal.classList.remove('hidden');
  const pct = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
  document.getElementById('summary-score').innerText = `${score} / ${totalAnswered}`;
  document.getElementById('summary-pct').innerText = `${pct}%`;
  
  let msg = "Great practice session! Keep going!";
  if (pct >= 90) msg = "🔥 Outstanding! You are in great shape for Thursday's quiz!";
  else if (pct >= 75) msg = "💪 Solid work! Focus on the Level 2 & 3 traps to ace Thursday!";
  else msg = "📚 Good effort! Review the 'Dig Deeper' teacher steps on the questions you missed.";
  document.getElementById('summary-msg').innerText = msg;
}

function restartPractice() {
  document.getElementById('summary-modal').classList.add('hidden');
  score = 0;
  streak = 0;
  totalAnswered = 0;
  updateStatsDisplay();
  setFilter(currentFilter);
}

// ==========================================
// TEACHER'S 5-POINT CHECKLIST CONTROLLER
// ==========================================
function updateChecklistProgress() {
  const checkboxes = document.querySelectorAll('.step-check');
  if (!checkboxes || checkboxes.length === 0) return;
  
  let checkedCount = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) checkedCount++;
  });
  
  const textEl = document.getElementById('checklist-progress-text');
  const barEl = document.getElementById('checklist-progress-bar');
  
  if (textEl) {
    textEl.innerText = `${checkedCount} / ${checkboxes.length} Steps`;
    if (checkedCount === checkboxes.length) {
      textEl.innerText = `All ${checkboxes.length} Steps Done! 🎉`;
    }
  }
  
  if (barEl) {
    const pct = Math.round((checkedCount / checkboxes.length) * 100);
    barEl.style.width = `${pct}%`;
    if (checkedCount === checkboxes.length) {
      barEl.className = "bg-emerald-500 h-full w-full transition-all duration-300";
    } else {
      barEl.className = "bg-indigo-600 h-full transition-all duration-300";
    }
  }
}

function resetChecklist() {
  const checkboxes = document.querySelectorAll('.step-check');
  checkboxes.forEach(cb => {
    cb.checked = false;
  });
  updateChecklistProgress();
}

// Safe Stubs for backward-compatibility
function clearCanvas() {}
function undoCanvas() {}
function setPenColor() {}
function setEraser() {}
function saveUndoState() {}
