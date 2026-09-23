// Pure Mathematical Parsing & Answer Evaluation Engine
// Zero DOM references, pure input-output functions for 100% testability

function shuffleArray(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

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

export {
  shuffleArray,
  buildNumberLineSVG,
  parseAbsoluteValueEquation,
  parseNumberOrFraction,
  parseAnswers,
  evaluateStudentAnswer
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    shuffleArray,
    buildNumberLineSVG,
    parseAbsoluteValueEquation,
    parseNumberOrFraction,
    parseAnswers,
    evaluateStudentAnswer
  };
}
