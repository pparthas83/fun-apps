import { getState, loadProgress, saveProgress, resetAllProgress, updateState, subscribe } from './core/state.js';
import { QUESTION_BANK } from './data/questions.js';
import { ProblemGenerator } from './engines/generator.js';
import { evaluateStudentAnswer, shuffleArray } from './engines/evaluator.js';
import {
  renderCurrentQuestion,
  updateStatsDisplay,
  populateDigDeeper,
  toggleDigDeeper,
  openDigDeeper,
  showToast,
  showSummaryModal,
  triggerMathTypeset
} from './ui/render.js';
import { initChecklistListeners, resetChecklist } from './ui/checklist.js';

// Application Initialization
document.addEventListener('DOMContentLoaded', () => {
  subscribe(updateStatsDisplay);
  loadProgress();
  initChecklistListeners();
  initEventListeners();
  setFilter('all');
  triggerMathTypeset(document.body);
});

export function setFilter(filter) {
  const state = getState();
  state.currentFilter = filter;
  state.answered = false;
  
  if (filter === 'quiz') {
    state.score = 0;
    state.streak = 0;
    state.totalAnswered = 0;
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
    state.activeQuestions = [...QUESTION_BANK];
  } else if (filter === '1') {
    state.activeQuestions = QUESTION_BANK.filter(q => q.level === 1);
  } else if (filter === '2') {
    state.activeQuestions = QUESTION_BANK.filter(q => q.level === 2);
  } else if (filter === '3') {
    state.activeQuestions = QUESTION_BANK.filter(q => q.level === 3);
  } else if (filter === 'quiz') {
    const l1 = shuffleArray(QUESTION_BANK.filter(q => q.level === 1)).slice(0, 3);
    const l2 = shuffleArray(QUESTION_BANK.filter(q => q.level === 2)).slice(0, 4);
    const l3 = shuffleArray(QUESTION_BANK.filter(q => q.level === 3)).slice(0, 3);
    state.activeQuestions = shuffleArray([...l1, ...l2, ...l3]);
  } else if (filter === 'infinite') {
    state.activeQuestions = Array.from({ length: 10 }, () => ProblemGenerator.generateRandom());
    showToast('♾️ Infinite Practice Mode: Endless problems across all topics!');
  } else if (filter === 'graphs') {
    state.activeQuestions = QUESTION_BANK.filter(q => q.type === 'write_equation' || (q.subtopic && q.subtopic.includes('Writing Equations')));
  } else if (filter === 'eval') {
    state.activeQuestions = QUESTION_BANK.filter(q => q.type === 'eval' || (q.subtopic && q.subtopic.includes('Evaluating')));
  } else if (filter === 'word') {
    state.activeQuestions = QUESTION_BANK.filter(q => q.type === 'word_problem' || (q.subtopic && (q.subtopic.includes('Tolerance') || q.subtopic.includes('Real-World'))));
  }

  state.currentIndex = 0;
  renderCurrentQuestion();
}

export function submitAnswer() {
  const state = getState();
  if (state.answered) return;
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

  const q = state.activeQuestions[state.currentIndex];
  state.answered = true;
  state.totalAnswered++;
  state.userProgress.lifetimeAnswered++;

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
  if (feedbackCard) feedbackCard.classList.remove('hidden');

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
    state.score++;
    state.streak++;
    state.userProgress.lifetimeCorrect++;
    if (state.streak > state.userProgress.bestStreak) {
      state.userProgress.bestStreak = state.streak;
    }
    if (q.id && !q.id.startsWith('GEN-')) {
      state.userProgress.masteredIds[q.id] = true;
    }
    saveProgress();

    if (feedbackCard) {
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
    }
  } else {
    state.streak = 0;
    saveProgress();

    if (feedbackCard) {
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
  }

  updateStatsDisplay();

  const digDeeperToggleBtn = document.getElementById('dig-deeper-toggle-btn');
  const nextBtnContainer = document.getElementById('next-btn-container');
  if (digDeeperToggleBtn) digDeeperToggleBtn.classList.remove('hidden');
  if (nextBtnContainer) nextBtnContainer.classList.remove('hidden');

  populateDigDeeper(q);

  if (!isCorrect) {
    openDigDeeper();
  }

  if (feedbackCard) triggerMathTypeset(feedbackCard);
}

export function nextQuestion() {
  const state = getState();
  if (state.currentFilter === 'infinite') {
    if (state.currentIndex >= state.activeQuestions.length - 2) {
      state.activeQuestions.push(ProblemGenerator.generateRandom());
    }
    state.currentIndex++;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (state.currentIndex < state.activeQuestions.length - 1) {
    state.currentIndex++;
    renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    showSummaryModal();
  }
}

export function practiceClone() {
  const state = getState();
  const currentQ = state.activeQuestions[state.currentIndex];
  const clone = ProblemGenerator.generateCloneFor(currentQ);
  state.activeQuestions.splice(state.currentIndex + 1, 0, clone);
  nextQuestion();
  showToast('🔄 Generated similar problem clone!');
}

export function crankCurrentClone() {
  const state = getState();
  if (!state.activeQuestions || state.activeQuestions.length === 0) return;
  const currentQ = state.activeQuestions[state.currentIndex];
  const clone = ProblemGenerator.generateCloneFor(currentQ);
  state.activeQuestions.splice(state.currentIndex + 1, 0, clone);
  state.currentIndex++;
  renderCurrentQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast('🔄 Cranked fresh clone with new numbers!');
}

export function crankMoreProblems(n = 10) {
  const state = getState();
  const newProblems = [];
  for (let i = 0; i < n; i++) {
    let p;
    if (state.currentFilter === '1') {
      p = ProblemGenerator.generateLevel1();
    } else if (state.currentFilter === '2') {
      p = ProblemGenerator.generateLevel2();
    } else if (state.currentFilter === '3') {
      p = ProblemGenerator.generateLevel3();
    } else if (state.currentFilter === 'graphs') {
      p = ProblemGenerator.generateWritingEquationFromGraph();
    } else if (state.currentFilter === 'eval') {
      p = ProblemGenerator.generateEvaluatingExpression();
    } else if (state.currentFilter === 'word') {
      p = ProblemGenerator.generateToleranceWordProblem();
    } else {
      p = ProblemGenerator.generateRandom();
    }
    newProblems.push(p);
  }

  state.activeQuestions.push(...newProblems);

  if (state.currentFilter !== 'infinite') {
    const qCounter = document.getElementById('q-counter');
    const progressBar = document.getElementById('progress-bar');
    if (qCounter) qCounter.textContent = `Question ${state.currentIndex + 1} of ${state.activeQuestions.length}`;
    const pct = Math.round(((state.currentIndex + 1) / state.activeQuestions.length) * 100);
    if (progressBar) progressBar.style.width = `${pct}%`;
  }
  showToast(`🎲 Cranked +${n} fresh practice problems! (Queue: ${state.activeQuestions.length})`);
}

export function restartPractice() {
  const modal = document.getElementById('summary-modal');
  if (modal) modal.classList.add('hidden');
  const state = getState();
  state.score = 0;
  state.streak = 0;
  state.totalAnswered = 0;
  updateStatsDisplay();
  setFilter(state.currentFilter);
}

export function insertSymbol(sym) {
  const state = getState();
  const input = document.getElementById('answer-input');
  if (!input || state.answered) return;
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

export function clearAnswerInput() {
  const state = getState();
  const input = document.getElementById('answer-input');
  if (input && !state.answered) {
    input.value = '';
    input.focus();
  }
}

function initEventListeners() {
  // Input keyboard listeners
  const input = document.getElementById('answer-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitAnswer();
      }
    });
  }

  // Answer submission
  const submitBtn = document.getElementById('submit-answer-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitAnswer);
  }

  // Next question
  const nextBtn = document.getElementById('next-question-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', nextQuestion);
  }

  // Dig Deeper toggle and close
  const digDeeperToggleBtn = document.getElementById('dig-deeper-toggle-btn');
  if (digDeeperToggleBtn) {
    digDeeperToggleBtn.addEventListener('click', toggleDigDeeper);
  }
  const closeDigDeeperBtn = document.getElementById('close-dig-deeper-btn');
  if (closeDigDeeperBtn) {
    closeDigDeeperBtn.addEventListener('click', toggleDigDeeper);
  }

  // Practice clone button
  const cloneBtn = document.getElementById('practice-clone-btn');
  if (cloneBtn) {
    cloneBtn.addEventListener('click', practiceClone);
  }

  // Header reset button
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetAllProgress();
      updateStatsDisplay();
      renderCurrentQuestion();
    });
  }

  // Clear answer input
  const clearBtn = document.getElementById('clear-answer-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAnswerInput);
  }

  // Symbol palette buttons
  document.querySelectorAll('.symbol-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sym = btn.dataset.symbol;
      if (sym) insertSymbol(sym);
    });
  });

  // Filter tabs
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      if (f) setFilter(f);
    });
  });

  // Modal actions
  const restartBtn = document.getElementById('modal-restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', restartPractice);
  }

  const drillL3Btn = document.getElementById('modal-drill-l3-btn');
  if (drillL3Btn) {
    drillL3Btn.addEventListener('click', () => {
      const modal = document.getElementById('summary-modal');
      if (modal) modal.classList.add('hidden');
      setFilter('3');
    });
  }

  // Infinite Cranker buttons
  const crankCloneBtn = document.getElementById('crank-clone-btn');
  if (crankCloneBtn) {
    crankCloneBtn.addEventListener('click', crankCurrentClone);
  }

  const crank10Btn = document.getElementById('crank-10-btn');
  if (crank10Btn) {
    crank10Btn.addEventListener('click', () => crankMoreProblems(10));
  }

  const crank25Btn = document.getElementById('crank-25-btn');
  if (crank25Btn) {
    crank25Btn.addEventListener('click', () => crankMoreProblems(25));
  }
}

// Global window exposure for browser test harness backwards compatibility
if (typeof window !== 'undefined') {
  window.submitAnswer = submitAnswer;
  window.nextQuestion = nextQuestion;
  window.setFilter = setFilter;
  window.insertSymbol = insertSymbol;
  window.clearAnswerInput = clearAnswerInput;
  window.practiceClone = practiceClone;
  window.crankCurrentClone = crankCurrentClone;
  window.crankMoreProblems = crankMoreProblems;
  window.resetAllProgress = resetAllProgress;
  window.restartPractice = restartPractice;
  window.toggleDigDeeper = toggleDigDeeper;
  window.openDigDeeper = openDigDeeper;
}
