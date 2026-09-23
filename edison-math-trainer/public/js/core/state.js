// Centralized Unidirectional State Management & Storage Adapter

const STORAGE_KEY = 'edison_math_progress_v1';

const state = {
  userProgress: {
    bestStreak: 0,
    masteredIds: {},
    lifetimeAnswered: 0,
    lifetimeCorrect: 0
  },
  activeQuestions: [],
  currentIndex: 0,
  currentFilter: 'all',
  score: 0,
  streak: 0,
  totalAnswered: 0,
  answered: false
};

const listeners = new Set();

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  for (const fn of listeners) {
    try {
      fn(state);
    } catch (e) {
      console.error("State listener error:", e);
    }
  }
}

export function updateState(partial) {
  Object.assign(state, partial);
  notify();
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      state.userProgress.bestStreak = data.bestStreak || 0;
      state.userProgress.masteredIds = data.masteredIds || {};
      state.userProgress.lifetimeAnswered = data.lifetimeAnswered || 0;
      state.userProgress.lifetimeCorrect = data.lifetimeCorrect || 0;
    }
  } catch (e) {
    console.warn("localStorage not available:", e);
  }
  notify();
}

export function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userProgress));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

export function resetAllProgress(skipConfirm = false) {
  if (skipConfirm || (typeof window !== 'undefined' && window.confirm("Reset all saved progress, best streak, and mastered badges on this device?"))) {
    state.userProgress = {
      bestStreak: 0,
      masteredIds: {},
      lifetimeAnswered: 0,
      lifetimeCorrect: 0
    };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    state.score = 0;
    state.streak = 0;
    state.totalAnswered = 0;
    notify();
  }
}
