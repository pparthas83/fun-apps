// Algorithmic Question Generator for 2.5 Absolute Value Equations
// Pure JavaScript - 100% Free & Zero-Token Usage

const ProblemGenerator = {
  randInt(min, max, excludeZero = false) {
    let val = Math.floor(Math.random() * (max - min + 1)) + min;
    if (excludeZero && val === 0) return 1;
    return val;
  },

  // Ensures 4 strictly distinct choices
  createUniqueOptions(correctAns, candidates, fallbackFn) {
    const set = new Set([correctAns]);
    const unique = [correctAns];

    for (const c of candidates) {
      if (c && !set.has(c)) {
        set.add(c);
        unique.push(c);
        if (unique.length === 4) break;
      }
    }

    let offset = 1;
    while (unique.length < 4) {
      const fb = fallbackFn(offset);
      if (fb && !set.has(fb)) {
        set.add(fb);
        unique.push(fb);
      }
      offset++;
    }

    return this.shuffleOptions(unique, 0);
  },

  shuffleOptions(options, correctOriginalIndex) {
    const list = options.map((opt, i) => ({ text: opt, isCorrect: i === correctOriginalIndex }));
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    const shuffledTexts = list.map(item => item.text);
    const newCorrectIndex = list.findIndex(item => item.isCorrect);
    return { options: shuffledTexts, correctIndex: newCorrectIndex };
  },

  generateLevel1() {
    const type = this.randInt(1, 3);
    const varName = ['x', 'y', 'm', 'p', 'w'][this.randInt(0, 4)];

    if (type === 1) {
      const a = this.randInt(-12, 12, true);
      const b = this.randInt(3, 18);
      const s1 = b - a;
      const s2 = -b - a;
      const minSol = Math.min(s1, s2);
      const maxSol = Math.max(s1, s2);
      const aSign = a > 0 ? `+ ${a}` : `- ${Math.abs(a)}`;

      const correctAns = `\\{${minSol}, ${maxSol}\\}`;
      const candidates = [
        `\\{${-maxSol}, ${-minSol}\\}`,
        `\\{${minSol - 2}, ${maxSol + 2}\\}`,
        `\\{${minSol + 1}, ${maxSol - 1}\\}`,
        `\\{${-b}, ${b}\\}`,
        `\\emptyset`
      ];

      const shuf = this.createUniqueOptions(
        correctAns,
        candidates,
        (off) => `\\{${minSol - off * 3}, ${maxSol + off * 3}\\}`
      );

      return {
        id: "GEN-L1-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 1,
        levelName: "Level 1: Foundational (Generated)",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Basic Two-Case Split",
        source: "Infinite Practice Generator",
        equation: `|${varName} ${aSign}| = ${b}`,
        prompt: `Solve for $${varName}$: $|${varName} ${aSign}| = ${b}$. Write the solution set ordered least to greatest.`,
        options: shuf.options,
        correctIndex: shuf.correctIndex,
        solutionSet: `{${minSol}, ${maxSol}}`,
        numberLine: [minSol, maxSol],
        digDeeper: {
          rule: "The absolute value is already isolated. Drop bars and set up two cases: one equal to +" + b + " and one equal to -" + b + ".",
          steps: [
            `**Step 1: Isolate:** Already isolated: $|${varName} ${aSign}| = ${b}$.`,
            `**Step 2: 2 Cases:**<br>• Case 1: $${varName} ${aSign} = ${b}$<br>• Case 2: $${varName} ${aSign} = -${b}$`,
            `**Step 3: Solve:**<br>• Case 1: $${varName} = ${b} - (${a}) = ${s1}$<br>• Case 2: $${varName} = -${b} - (${a}) = ${s2}$`,
            `**Step 4: Solution Set:** $\\{${minSol}, ${maxSol}\\}$.`
          ]
        }
      };
    } else if (type === 2) {
      const a = this.randInt(-8, 8, true);
      const c = this.randInt(2, 9);
      const d = c + this.randInt(3, 15);
      const dist = d - c;
      const s1 = dist - a;
      const s2 = -dist - a;
      const minSol = Math.min(s1, s2);
      const maxSol = Math.max(s1, s2);
      const aSign = a > 0 ? `+ ${a}` : `- ${Math.abs(a)}`;

      const correctAns = `\\{${minSol}, ${maxSol}\\}`;
      const candidates = [
        `\\{${-maxSol}, ${-minSol}\\}`,
        `\\{${minSol - 2}, ${maxSol + 2}\\}`,
        `\\{${minSol + 2}, ${maxSol - 2}\\}`,
        `\\emptyset`,
        `\\{${-dist}, ${dist}\\}`
      ];

      const shuf = this.createUniqueOptions(
        correctAns,
        candidates,
        (off) => `\\{${minSol - off * 2}, ${maxSol + off * 2}\\}`
      );

      return {
        id: "GEN-L1-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 1,
        levelName: "Level 1: Foundational (Generated)",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Single-Step Addition Outside",
        source: "Infinite Practice Generator",
        equation: `|${varName} ${aSign}| + ${c} = ${d}`,
        prompt: `Solve for $${varName}$: $|${varName} ${aSign}| + ${c} = ${d}$.`,
        options: shuf.options,
        correctIndex: shuf.correctIndex,
        solutionSet: `{${minSol}, ${maxSol}}`,
        numberLine: [minSol, maxSol],
        digDeeper: {
          rule: `Always subtract ${c} from both sides first to isolate the absolute value!`,
          steps: [
            `**Step 1: Isolate:** Subtract ${c} from both sides:<br>$|${varName} ${aSign}| = ${d} - ${c} = ${dist}$.`,
            `**Step 2: 2 Cases:**<br>• $${varName} ${aSign} = ${dist}$<br>• $${varName} ${aSign} = -${dist}$`,
            `**Step 3: Solve:**<br>• $${varName} = ${s1}$<br>• $${varName} = ${s2}$`,
            `**Step 4: Solution Set:** $\\{${minSol}, ${maxSol}\\}$.`
          ]
        }
      };
    } else {
      const a = this.randInt(2, 4);
      const sol1 = this.randInt(-5, 5);
      const diff = this.randInt(1, 5) * 2;
      const sol2 = sol1 + diff;
      const minSol = sol1;
      const maxSol = sol2;
      const c = (a * diff) / 2;
      const b = c - (a * maxSol);
      const bSign = b > 0 ? `+ ${b}` : (b < 0 ? `- ${Math.abs(b)}` : "");

      const correctAns = `\\{${minSol}, ${maxSol}\\}`;
      const candidates = [
        `\\{${-maxSol}, ${-minSol}\\}`,
        `\\{${minSol + 1}, ${maxSol - 1}\\}`,
        `\\{${minSol - 2}, ${maxSol + 2}\\}`,
        `\\emptyset`,
        `\\{${-c}, ${c}\\}`
      ];

      const shuf = this.createUniqueOptions(
        correctAns,
        candidates,
        (off) => `\\{${minSol - off * 2}, ${maxSol + off * 2}\\}`
      );

      return {
        id: "GEN-L1-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 1,
        levelName: "Level 1: Foundational (Generated)",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Coefficient Inside Bars",
        source: "Infinite Practice Generator",
        equation: `|${a}${varName} ${bSign}| = ${c}`,
        prompt: `Solve for $${varName}$: $|${a}${varName} ${bSign}| = ${c}$.`,
        options: shuf.options,
        correctIndex: shuf.correctIndex,
        solutionSet: `{${minSol}, ${maxSol}}`,
        numberLine: [minSol, maxSol],
        digDeeper: {
          rule: "Do not divide inside the bars. Create two linear cases first!",
          steps: [
            `**Step 1: Isolate:** It is already isolated: $|${a}${varName} ${bSign}| = ${c}$.`,
            `**Step 2: 2 Cases:**<br>• Case 1: $${a}${varName} ${bSign} = ${c}$<br>• Case 2: $${a}${varName} ${bSign} = -${c}$`,
            `**Step 3: Solve:**<br>• Case 1 gives $${varName} = ${maxSol}$<br>• Case 2 gives $${varName} = ${minSol}$`,
            `**Step 4: Solution Set:** $\\{${minSol}, ${maxSol}\\}$.`
          ]
        }
      };
    }
  },

  generateLevel2() {
    const subType = this.randInt(1, 3);
    const varName = ['x', 'w', 'k', 'n'][this.randInt(0, 3)];

    if (subType === 1) {
      const k = this.randInt(2, 5);
      const dist = this.randInt(4, 10);
      const m = k * dist;
      const a = this.randInt(-6, 6, true);
      const aSign = a > 0 ? `+ ${a}` : `- ${Math.abs(a)}`;
      const s1 = dist - a;
      const s2 = -dist - a;
      const minSol = Math.min(s1, s2);
      const maxSol = Math.max(s1, s2);

      const correctAns = `\\{${minSol}, ${maxSol}\\}`;
      const candidates = [
        `\\emptyset \\text{ (No Solution)}`,
        `\\{${-maxSol}, ${-minSol}\\}`,
        `\\{${minSol - 2}, ${maxSol + 2}\\}`,
        `\\{${minSol + 1}, ${maxSol - 1}\\}`
      ];

      const shuf = this.createUniqueOptions(
        correctAns,
        candidates,
        (off) => `\\{${minSol - off * 3}, ${maxSol + off * 3}\\}`
      );

      return {
        id: "GEN-L2-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 2,
        levelName: "Level 2: Multi-Step & Traps (Generated)",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Negative Multiplier Trap",
        source: "Infinite Practice Generator",
        equation: `-${k}|${varName} ${aSign}| = -${m}`,
        prompt: `Solve for $${varName}$: $-${k}|${varName} ${aSign}| = -${m}$.`,
        options: shuf.options,
        correctIndex: shuf.correctIndex,
        solutionSet: `{${minSol}, ${maxSol}}`,
        numberLine: [minSol, maxSol],
        digDeeper: {
          rule: `TRAP ALERT: Don't be fooled by the negative on the right! When you divide by -${k}, the right side becomes POSITIVE (${-m} / -${k} = +${dist}).`,
          steps: [
            `**Step 1: Isolate:** Divide both sides by $-${k}$:<br>$\\frac{-${k}|${varName} ${aSign}|}{-${k}} = \\frac{-${m}}{-${k}}$<br>$|${varName} ${aSign}| = ${dist}$`,
            `**Step 2: 2 Cases:**<br>• $${varName} ${aSign} = ${dist}$<br>• $${varName} ${aSign} = -${dist}$`,
            `**Step 3: Solve:** $${varName} = ${s1}$ and $${varName} = ${s2}$`,
            `**Step 4: Solution Set:** $\\{${minSol}, ${maxSol}\\}$.`
          ]
        }
      };
    } else if (subType === 2) {
      const a = this.randInt(-5, 5, true);
      const aSign = a > 0 ? `+ ${a}` : `- ${Math.abs(a)}`;
      const k = this.randInt(3, 8);
      const diff = this.randInt(3, 8);
      const m = k + diff;

      const correctAns = `\\emptyset \\text{ (No Solution)}`;
      const s1 = diff - a;
      const s2 = -diff - a;
      const candidates = [
        `\\{${Math.min(s1, s2)}, ${Math.max(s1, s2)}\\}`,
        `\\{${-m}, ${m}\\}`,
        `\\{${k - m}\\}`,
        `\\{${-diff}, ${diff}\\}`
      ];

      const shuf = this.createUniqueOptions(
        correctAns,
        candidates,
        (off) => `\\{${-off * 4}, ${off * 4}\\}`
      );

      return {
        id: "GEN-L2-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 2,
        levelName: "Level 2: Multi-Step & Traps (Generated)",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Isolates to Negative Trap",
        source: "Infinite Practice Generator",
        equation: `${k} - |${varName} ${aSign}| = ${m}`,
        prompt: `Solve for $${varName}$: $${k} - |${varName} ${aSign}| = ${m}$.`,
        options: shuf.options,
        correctIndex: shuf.correctIndex,
        solutionSet: "∅",
        numberLine: [],
        digDeeper: {
          rule: `TRAP ALERT: Subtracting ${k} gives -|${varName} ${aSign}| = ${diff}, so |${varName} ${aSign}| = -${diff}. An absolute value can NEVER equal a negative distance!`,
          steps: [
            `**Step 1: Isolate:**<br>• Subtract ${k}: $-|${varName} ${aSign}| = ${m} - ${k} = ${diff}$<br>• Divide by -1: $|${varName} ${aSign}| = -${diff}$`,
            `**Step 2: Inspect:** Distance can never be negative (-${diff})!`,
            `**Step 3: Conclusion:** $\\emptyset$ (No Solution).`
          ]
        }
      };
    } else {
      const a = this.randInt(2, 4);
      const b = this.randInt(2, 4);
      const dist = this.randInt(2, 6);
      const d = this.randInt(3, 8);
      const e = a * dist - d;
      const c = this.randInt(1, 9);
      const num1 = dist + c;
      const num2 = -dist + c;

      const fmtFrac = (n, d) => {
        const gcd = (x, y) => (!y ? Math.abs(x) : gcd(y, x % y));
        const g = gcd(n, d);
        let num = n / g;
        let den = d / g;
        if (den < 0) { num = -num; den = -den; }
        if (den === 1) return `${num}`;
        return `\\frac{${num}}{${den}}`;
      };

      const frac1 = fmtFrac(num1, b);
      const frac2 = fmtFrac(num2, b);
      const val1 = num1 / b;
      const val2 = num2 / b;
      const minFrac = val1 < val2 ? frac1 : frac2;
      const maxFrac = val1 < val2 ? frac2 : frac1;
      const minVal = Math.min(val1, val2);
      const maxVal = Math.max(val1, val2);

      const correctAns = `\\{${minFrac}, ${maxFrac}\\}`;
      const candidates = [
        `\\{-${maxFrac}, ${minFrac}\\}`,
        `\\emptyset`,
        `\\{${fmtFrac(num1 + 2, b)}, ${fmtFrac(num2 - 2, b)}\\}`,
        `\\{${fmtFrac(num1 - 1, b)}, ${fmtFrac(num2 + 1, b)}\\}`
      ];

      const shuf = this.createUniqueOptions(
        correctAns,
        candidates,
        (off) => `\\{${fmtFrac(num1 + off * 3, b)}, ${fmtFrac(num2 - off * 3, b)}\\}`
      );

      return {
        id: "GEN-L2-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 2,
        levelName: "Level 2: Multi-Step & Traps (Generated)",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Multi-Step Isolation with Fractions",
        source: "Infinite Practice Generator",
        equation: `${a}|${b}${varName} - ${c}| - ${d} = ${e}`,
        prompt: `Solve for $${varName}$: $${a}|${b}${varName} - ${c}| - ${d} = ${e}$. Write answers as simplified fractions ordered least to greatest.`,
        options: shuf.options,
        correctIndex: shuf.correctIndex,
        solutionSet: `{${minFrac}, ${maxFrac}}`,
        numberLine: [minVal, maxVal],
        digDeeper: {
          rule: `Add ${d} to both sides first, then divide by ${a} before splitting into two cases!`,
          steps: [
            `**Step 1: Isolate:**<br>• Add ${d}: $${a}|${b}${varName} - ${c}| = ${e + d}$<br>• Divide by ${a}: $|${b}${varName} - ${c}| = ${dist}$`,
            `**Step 2: 2 Cases:**<br>• Case 1: $${b}${varName} - ${c} = ${dist}$<br>• Case 2: $${b}${varName} - ${c} = -${dist}$`,
            `**Step 3: Solve:**<br>• Case 1: $${b}${varName} = ${num1} \\implies ${varName} = ${frac1}$<br>• Case 2: $${b}${varName} = ${num2} \\implies ${varName} = ${frac2}$`,
            `**Step 4: Solution Set:** $\\{${minFrac}, ${maxFrac}\\}$.`
          ]
        }
      };
    }
  },

  // Generator for Writing Equations from Number Line Graphs
  generateWritingEquationFromGraph() {
    const m = this.randInt(-8, 8);
    const d = this.randInt(1, 6);
    const p1 = m - d;
    const p2 = m + d;

    let eqStr;
    if (m === 0) {
      eqStr = `|x| = ${d}`;
    } else if (m > 0) {
      eqStr = `|x - ${m}| = ${d}`;
    } else {
      eqStr = `|x + ${Math.abs(m)}| = ${d}`;
    }

    const correctAns = eqStr;
    const candidates = [
      m === 0 ? `|x| = ${d + 1}` : `|x + ${m}| = ${d}`,
      `|x - ${d}| = ${Math.abs(m) || 2}`,
      `|x| = ${p2}`,
      `|x + ${d}| = ${Math.abs(m) || 1}`
    ];

    const shuf = this.createUniqueOptions(
      correctAns,
      candidates,
      (off) => `|x - ${m + off}| = ${d + off}`
    );

    return {
      id: "GEN-GRAPH-" + Date.now() + Math.random().toString(36).substr(2, 4),
      level: 2,
      levelName: "Level 2: Multi-Step & Traps (Generated)",
      type: "write_equation",
      topic: "2.5 Absolute Value Equations",
      subtopic: "Writing Equations from Graphs",
      source: "Infinite Practice Generator",
      equation: eqStr,
      prompt: "Write an absolute value equation for the graph shown below. Use the formula: $|x - \\text{midpoint}| = \\text{distance}$.",
      targetEquation: eqStr,
      graphPoints: [p1, p2],
      midpoint: m,
      distance: d,
      options: shuf.options,
      correctIndex: shuf.correctIndex,
      solutionSet: `{${p1}, ${p2}}`,
      numberLine: [p1, p2],
      digDeeper: {
        rule: "Formula: $|x - \\text{midpoint}| = \\text{distance}$, where $\\text{midpoint} = \\frac{\\text{pt}_1 + \\text{pt}_2}{2}$ and $\\text{distance} = |\\text{pt}_2 - \\text{midpoint}|$.",
        steps: [
          `**Step 1: Identify endpoints:** The dots are at $${p1}$ and $${p2}$.`,
          `**Step 2: Calculate midpoint:** $\\text{midpoint} = \\frac{${p1} + ${p2}}{2} = ${m}$.`,
          `**Step 3: Calculate distance:** Distance from $${m}$ to $${p2}$ is $${d}$.`,
          `**Step 4: Write equation:** $${eqStr}$.`
        ]
      }
    };
  },

  // Generator for Evaluating Absolute Value Expressions
  generateEvaluatingExpression() {
    const archetype = this.randInt(1, 4);

    if (archetype === 1) {
      const a = this.randInt(-6, 6, true);
      const p = this.randInt(-6, 6, true);
      const q = this.randInt(1, 8);
      const inner = a - p;
      const ans = Math.abs(inner) - q;
      const pSign = p > 0 ? `- ${p}` : `+ ${Math.abs(p)}`;
      const eqStr = `|a ${pSign}| - ${q}`;

      return {
        id: "GEN-EVAL-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 1,
        levelName: "Level 1: Foundational (Generated)",
        type: "eval",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Evaluating Expressions",
        source: "Infinite Practice Generator",
        equation: eqStr,
        prompt: `Evaluate the expression if $a = ${a}$.`,
        options: [`${ans}`, `${ans + 2}`, `${-ans}`, `${ans - 2}`],
        correctIndex: 0,
        solutionSet: `${ans}`,
        numberLine: [ans],
        digDeeper: {
          rule: `Substitute $a = ${a}$, evaluate inside bars, take the absolute value, then subtract ${q}.`,
          steps: [
            `**Step 1: Substitute $a = ${a}$:** $|(${a}) ${pSign}| - ${q}$`,
            `**Step 2: Inside bars:** $${a} ${pSign} = ${inner} \\implies |${inner}| - ${q}$`,
            `**Step 3: Absolute value:** $|${inner}| = ${Math.abs(inner)} \\implies ${Math.abs(inner)} - ${q}$`,
            `**Step 4: Result:** $${ans}$.`
          ]
        }
      };
    } else if (archetype === 2) {
      const x = this.randInt(-5, 5);
      const y = this.randInt(-5, 5);
      const c = this.randInt(2, 9);
      const inner = x - y;
      const ans = Math.abs(inner) + c;
      const eqStr = `|x - y| + ${c}`;

      return {
        id: "GEN-EVAL-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 1,
        levelName: "Level 1: Foundational (Generated)",
        type: "eval",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Evaluating Expressions",
        source: "Infinite Practice Generator",
        equation: eqStr,
        prompt: `Evaluate the expression if $x = ${x}$ and $y = ${y}$.`,
        options: [`${ans}`, `${ans + 1}`, `${Math.max(1, ans - 3)}`, `${ans + 4}`],
        correctIndex: 0,
        solutionSet: `${ans}`,
        numberLine: [ans],
        digDeeper: {
          rule: `Substitute $x$ and $y$, calculate the difference, take absolute value, and add ${c}.`,
          steps: [
            `**Step 1: Substitute:** $|(${x}) - (${y})| + ${c}$`,
            `**Step 2: Inside bars:** $${x} - (${y}) = ${inner} \\implies |${inner}| + ${c}$`,
            `**Step 3: Absolute value:** $|${inner}| = ${Math.abs(inner)} \\implies ${Math.abs(inner)} + ${c}$`,
            `**Step 4: Result:** $${ans}$.`
          ]
        }
      };
    } else if (archetype === 3) {
      const p = this.randInt(2, 4);
      const z = this.randInt(-4, 4);
      const q = this.randInt(-5, 5, true);
      const k = this.randInt(12, 22);
      const inner = p * z + q;
      const ans = k - Math.abs(inner);
      const qSign = q > 0 ? `+ ${q}` : `- ${Math.abs(q)}`;
      const eqStr = `${k} - |${p}z ${qSign}|`;

      return {
        id: "GEN-EVAL-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 1,
        levelName: "Level 1: Foundational (Generated)",
        type: "eval",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Evaluating Expressions",
        source: "Infinite Practice Generator",
        equation: eqStr,
        prompt: `Evaluate the expression if $z = ${z}$.`,
        options: [`${ans}`, `${ans + 3}`, `${ans - 3}`, `${k + Math.abs(inner)}`],
        correctIndex: 0,
        solutionSet: `${ans}`,
        numberLine: [ans],
        digDeeper: {
          rule: `Multiply inside bars first, add ${q}, evaluate absolute value, then subtract from ${k}.`,
          steps: [
            `**Step 1: Substitute $z = ${z}$:** $${k} - |${p}(${z}) ${qSign}|$`,
            `**Step 2: Multiply inside bars:** $${p}(${z}) = ${p * z} \\implies ${k} - |${inner}|$`,
            `**Step 3: Absolute value:** $|${inner}| = ${Math.abs(inner)} \\implies ${k} - ${Math.abs(inner)}$`,
            `**Step 4: Result:** $${ans}$.`
          ]
        }
      };
    } else {
      const a = this.randInt(1, 5);
      const b = this.randInt(-5, -1);
      const c = this.randInt(-6, -2);
      const inner = a + b;
      const ans = Math.abs(inner) - c;
      const eqStr = `|a + b| - c`;

      return {
        id: "GEN-EVAL-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 1,
        levelName: "Level 1: Foundational (Generated)",
        type: "eval",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Evaluating Expressions",
        source: "Infinite Practice Generator",
        equation: eqStr,
        prompt: `Evaluate the expression if $a = ${a}, b = ${b}$, and $c = ${c}$. (Beware of signs!)`,
        options: [`${ans}`, `${ans - 2}`, `${Math.abs(inner) + c}`, `${ans + 4}`],
        correctIndex: 0,
        solutionSet: `${ans}`,
        numberLine: [ans],
        digDeeper: {
          rule: `Watch the signs! Subtracting a negative number becomes addition: $-(${c}) = +${Math.abs(c)}$.`,
          steps: [
            `**Step 1: Substitute:** $|(${a}) + (${b})| - (${c})$`,
            `**Step 2: Inside bars:** $${a} + (${b}) = ${inner} \\implies |${inner}| - (${c})$`,
            `**Step 3: Absolute value:** $|${inner}| = ${Math.abs(inner)} \\implies ${Math.abs(inner)} - (${c})$`,
            `**Step 4: Subtract negative:** $${Math.abs(inner)} + ${Math.abs(c)} = ${ans}$.`
          ]
        }
      };
    }
  },

  // Generator for Real-World Tolerance Word Problems
  generateToleranceWordProblem() {
    const isTemp = Math.random() < 0.5;

    if (isTemp) {
      const temps = [26, 28, 32, 68, 72, 78, 82, 85];
      const target = temps[this.randInt(0, temps.length - 1)];
      const tol = [1.5, 2, 2.5][this.randInt(0, 2)];
      const minVal = target - tol;
      const maxVal = target + tol;

      return {
        id: "GEN-WORD-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 2,
        levelName: "Level 2: Multi-Step & Traps (Generated)",
        type: "word_problem",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Real-World Tolerance & Temperature",
        source: "Infinite Practice Generator",
        equation: `|t - ${target}| = ${tol}`,
        prompt: `**TEMPERATURE:** A thermometer is guaranteed to give a temperature no more than $${tol}^\\circ\\text{F}$ from the actual temperature. If the thermometer reads $${target}^\\circ\\text{F}$, write and solve an equation to find the maximum and minimum actual temperature.`,
        solutionSet: `{${minVal}, ${maxVal}}`,
        numberLine: [minVal, maxVal],
        digDeeper: {
          rule: `Equation: $|t - \\text{reading}| = \\text{error margin}$. Target is ${target}^\\circ\\text{F}$ and error is ${tol}^\\circ\\text{F}.`,
          steps: [
            `**Step 1: Target and Margin:** Target = $${target}^\\circ\\text{F}$, Margin = $${tol}^\\circ\\text{F}$.`,
            `**Step 2: Write Equation:** $|t - ${target}| = ${tol}$`,
            `**Step 3: Solve:**<br>• $t - ${target} = ${tol} \\implies t = ${maxVal}^\\circ\\text{F}$<br>• $t - ${target} = -${tol} \\implies t = ${minVal}^\\circ\\text{F}$`,
            `**Step 4: Solution Set:** $\\{${minVal}, ${maxVal}\\}$.`
          ]
        }
      };
    } else {
      const names = ["Taisha", "Tanisha", "Marcus", "David", "Aria", "Sophia"];
      const name = names[this.randInt(0, names.length - 1)];
      const goals = [240, 260, 280, 300, 320, 350];
      const target = goals[this.randInt(0, goals.length - 1)];
      const tols = [15, 20, 25, 30];
      const tol = tols[this.randInt(0, tols.length - 1)];
      const minVal = target - tol;
      const maxVal = target + tol;

      return {
        id: "GEN-WORD-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 2,
        levelName: "Level 2: Multi-Step & Traps (Generated)",
        type: "word_problem",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Real-World Tolerance & Calories",
        source: "Infinite Practice Generator",
        equation: `|c - ${target}| = ${tol}`,
        prompt: `**FITNESS:** ${name} uses the elliptical cross-trainer at the gym. Their general goal is to burn ${target} Calories per workout, but varies by as much as ${tol} Calories on any given day. Write and solve an equation to find the maximum and minimum number of Calories ${name} burns.`,
        solutionSet: `{${minVal}, ${maxVal}}`,
        numberLine: [minVal, maxVal],
        digDeeper: {
          rule: `Equation: $|c - \\text{goal}| = \\text{variance}$. Goal is ${target} Calories, variance is ${tol} Calories.`,
          steps: [
            `**Step 1: Goal and Variance:** Goal = $${target}$ Cal, Variance = $${tol}$ Cal.`,
            `**Step 2: Write Equation:** $|c - ${target}| = ${tol}$`,
            `**Step 3: Solve:**<br>• $c - ${target} = ${tol} \\implies c = ${maxVal}$<br>• $c - ${target} = -${tol} \\implies c = ${minVal}$`,
            `**Step 4: Solution Set:** $\\{${minVal}, ${maxVal}\\}$.`
          ]
        }
      };
    }
  },

  // Generator for Level 3: Edison Curveballs (Extraneous solutions & Absolute value on both sides)
  generateLevel3() {
    const subtype = this.randInt(1, 3);
    const varName = ['x', 'y', 'm', 'n'][this.randInt(0, 3)];

    if (subtype === 1) {
      // One valid solution, one extraneous solution
      const b = this.randInt(2, 8);
      const d = this.randInt(1, 6);
      const sol1 = b + d;
      const num2 = d - b;
      let sol2Str;
      if (num2 % 3 === 0) {
        sol2Str = `${num2 / 3}`;
      } else {
        sol2Str = `\\frac{${num2}}{3}`;
      }

      return {
        id: "GEN-L3-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 3,
        levelName: "Level 3: Edison Curveball (Generated)",
        topic: "2.5 Absolute Value Equations",
        subtopic: "One Valid, One Extraneous Solution",
        source: "Infinite Practice Generator",
        equation: `|${varName} + ${b}| = 2${varName} - ${d}`,
        prompt: `Solve for $${varName}$: $|${varName} + ${b}| = 2${varName} - ${d}$. Check for extraneous solutions!`,
        options: [
          `\\{${sol1}\\}`,
          `\\{${sol2Str}, ${sol1}\\}`,
          `\\{${sol2Str}\\}`,
          `\\emptyset \\text{ (No Solution)}`
        ],
        correctIndex: 0,
        solutionSet: `{${sol1}}`,
        numberLine: [sol1],
        digDeeper: {
          rule: `CURVEBALL: When a variable is outside the absolute value bars, you MUST test candidate solutions in the original equation! Candidate solutions that make the other side negative are extraneous.`,
          steps: [
            `**Step 1: Set up 2 cases:**<br>• Case 1: $${varName} + ${b} = 2${varName} - ${d}$<br>• Case 2: $${varName} + ${b} = -(2${varName} - ${d}) = -2${varName} + ${d}$`,
            `**Step 2: Solve Case 1:**<br>$${varName} = ${b + d} = ${sol1}$.<br>Test: Right side is $2(${sol1}) - ${d} = ${2 * sol1 - d} > 0$ ✓ (VALID).`,
            `**Step 3: Solve Case 2:**<br>$3${varName} = ${num2} \\implies ${varName} = ${sol2Str}$.<br>Test: Right side is $2(${sol2Str}) - ${d} < 0$ ✗ (EXTRANEOUS).`,
            `**Step 4: Solution Set:** $\\{${sol1}\\}$.`
          ]
        }
      };
    } else if (subtype === 2) {
      // Both solutions extraneous -> No solution (Ø)
      const a = this.randInt(2, 6);
      const b = this.randInt(3, 8);
      return {
        id: "GEN-L3-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 3,
        levelName: "Level 3: Edison Curveball (Generated)",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Extraneous Solution Trap (Variable on Both Sides)",
        source: "Infinite Practice Generator",
        equation: `|3${varName} + ${a}| = ${varName} - ${b}`,
        prompt: `Solve for $${varName}$: $|3${varName} + ${a}| = ${varName} - ${b}$. Remember to check for extraneous solutions!`,
        options: [
          `\\emptyset \\text{ (No Solution)}`,
          `\\{-\\frac{${a + b}}{2}, \\frac{${b - a}}{4}\\}`,
          `\\{-\\frac{${a + b}}{2}\\}`,
          `\\{\\frac{${b - a}}{4}\\}`
        ],
        correctIndex: 0,
        solutionSet: "∅",
        numberLine: [],
        digDeeper: {
          rule: `When variables appear outside the bars, candidate roots can make the right side negative. If both candidates make the right side negative, the solution set is $\\emptyset$.`,
          steps: [
            `**Step 1: Set up two cases:**<br>• Case 1: $3${varName} + ${a} = ${varName} - ${b}$<br>• Case 2: $3${varName} + ${a} = -(${varName} - ${b}) = -${varName} + ${b}$`,
            `**Step 2: Solve Case 1:**<br>$2${varName} = -${a + b} \\implies ${varName} = -\\frac{${a + b}}{2}$.<br>Test: Right-hand side is negative, so this candidate is **extraneous**!`,
            `**Step 3: Solve Case 2:**<br>$4${varName} = ${b - a} \\implies ${varName} = \\frac{${b - a}}{4}$.<br>Test: Right-hand side is negative, so this candidate is also **extraneous**!`,
            `**Step 4: Conclusion:** Both roots are extraneous $\\implies \\emptyset$ (No solution).`
          ]
        }
      };
    } else {
      // Absolute value on both sides: |2x + b| = |x - d|
      const b = this.randInt(1, 7);
      const d = this.randInt(2, 9);
      const sol1 = -d - b;
      const num2 = d - b;
      let sol2Str, sol2Val;
      if (num2 % 3 === 0) {
        sol2Val = num2 / 3;
        sol2Str = `${sol2Val}`;
      } else {
        sol2Val = num2 / 3;
        sol2Str = `${num2}/3`;
      }
      const minVal = Math.min(sol1, sol2Val);
      const maxVal = Math.max(sol1, sol2Val);
      const solSet = minVal === sol1 ? `{${sol1}, ${sol2Str}}` : `{${sol2Str}, ${sol1}}`;

      return {
        id: "GEN-L3-" + Date.now() + Math.random().toString(36).substr(2, 4),
        level: 3,
        levelName: "Level 3: Edison Curveball (Generated)",
        topic: "2.5 Absolute Value Equations",
        subtopic: "Absolute Value on Both Sides",
        source: "Infinite Practice Generator",
        equation: `|2${varName} + ${b}| = |${varName} - ${d}|`,
        prompt: `Solve for $${varName}$: $|2${varName} + ${b}| = |${varName} - ${d}|$. Ordered least to greatest.`,
        options: [
          `\\{${minVal === sol1 ? `${sol1}, \\frac{${num2}}{3}` : `\\frac{${num2}}{3}, ${sol1}`}\\}`,
          `\\{${sol1}\\}`,
          `\\emptyset`,
          `\\{${sol1 + 2}, ${sol2Str}\\}`,
        ],
        correctIndex: 0,
        solutionSet: solSet,
        numberLine: [minVal, maxVal],
        digDeeper: {
          rule: `When absolute value is on both sides $|A| = |B|$, create two cases: $A = B$ and $A = -B$. Since both sides are non-negative, neither case is extraneous!`,
          steps: [
            `**Step 1: Set up two cases:**<br>• Case 1: $2${varName} + ${b} = ${varName} - ${d}$<br>• Case 2: $2${varName} + ${b} = -(${varName} - ${d}) = -${varName} + ${d}$`,
            `**Step 2: Solve Case 1:**<br>$2${varName} - ${varName} = -${d} - ${b} \\implies ${varName} = ${sol1}$`,
            `**Step 3: Solve Case 2:**<br>$2${varName} + ${varName} = ${d} - ${b} \\implies 3${varName} = ${num2} \\implies ${varName} = ${sol2Str}$`,
            `**Step 4: Solution Set:** $\\{${minVal === sol1 ? `${sol1}, ${sol2Str}` : `${sol2Str}, ${sol1}`}\\}$.`
          ]
        }
      };
    }
  },

  // Generates a random problem across all curriculum archetypes
  generateRandom() {
    const pick = this.randInt(1, 6);
    if (pick === 1) return this.generateLevel1();
    if (pick === 2) return this.generateLevel2();
    if (pick === 3) return this.generateLevel3();
    if (pick === 4) return this.generateWritingEquationFromGraph();
    if (pick === 5) return this.generateEvaluatingExpression();
    return this.generateToleranceWordProblem();
  },

  // Smart Clone Dispatcher: Produces an exact clone of the current question's archetype
  generateCloneFor(q) {
    if (!q) return this.generateLevel1();
    if (q.type === 'eval' || (q.subtopic && q.subtopic.includes('Evaluating'))) {
      return this.generateEvaluatingExpression();
    }
    if (q.type === 'write_equation' || (q.subtopic && q.subtopic.includes('Writing Equations')) || q.graphPoints) {
      return this.generateWritingEquationFromGraph();
    }
    if (q.type === 'word_problem' || (q.subtopic && (q.subtopic.includes('Tolerance') || q.subtopic.includes('Real-World')))) {
      return this.generateToleranceWordProblem();
    }
    if (q.level === 1) {
      return this.generateLevel1();
    }
    if (q.level === 3) {
      return this.generateLevel3();
    }
    return this.generateLevel2();
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ProblemGenerator };
}
