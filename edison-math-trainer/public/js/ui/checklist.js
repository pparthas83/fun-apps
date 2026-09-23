// Teacher's 5-Point Checklist Controller

export function updateChecklistProgress() {
  const checkboxes = document.querySelectorAll('.step-check');
  if (!checkboxes || checkboxes.length === 0) return;
  
  let checkedCount = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) checkedCount++;
  });
  
  const textEl = document.getElementById('checklist-progress-text');
  const barEl = document.getElementById('checklist-progress-bar');
  
  if (textEl) {
    textEl.textContent = `${checkedCount} / ${checkboxes.length} Steps`;
    if (checkedCount === checkboxes.length) {
      textEl.textContent = `All ${checkboxes.length} Steps Done! 🎉`;
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

export function resetChecklist() {
  const checkboxes = document.querySelectorAll('.step-check');
  checkboxes.forEach(cb => {
    cb.checked = false;
  });
  updateChecklistProgress();
}

export function initChecklistListeners() {
  const checkboxes = document.querySelectorAll('.step-check');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateChecklistProgress);
  });
  
  const resetBtn = document.getElementById('checklist-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetChecklist);
  }
}
