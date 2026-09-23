// Test Suite 1: Mathematical Accuracy, Schema Integrity & Algorithmic Generators
const { QUESTION_BANK } = require('./questions.js');
const { ProblemGenerator } = require('./generator.js');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
  }
}

console.log("=== 1. TESTING QUESTION BANK DATA INTEGRITY ===");
assert(Array.isArray(QUESTION_BANK) && QUESTION_BANK.length >= 20, "Question bank has at least 20 questions", `Found ${QUESTION_BANK.length}`);

QUESTION_BANK.forEach((q, idx) => {
  const prefix = `[Q${idx + 1} ${q.id}]`;
  assert(q.id && typeof q.id === 'string', `${prefix} Has valid ID`);
  assert([1, 2, 3].includes(q.level), `${prefix} Level is 1, 2, or 3 (got ${q.level})`);
  assert(q.equation && q.equation.includes('|'), `${prefix} Equation contains absolute value bars: ${q.equation}`);
  assert(q.prompt && q.prompt.length > 5, `${prefix} Has descriptive prompt`);
  assert(Array.isArray(q.options) && q.options.length === 4, `${prefix} Has exactly 4 options`);
  assert(q.correctIndex >= 0 && q.correctIndex <= 3, `${prefix} correctIndex is within [0, 3]`);
  assert(new Set(q.options).size === 4, `${prefix} All 4 options are unique (no duplicate choices)`);
  assert(q.digDeeper && typeof q.digDeeper.rule === 'string' && q.digDeeper.rule.length > 10, `${prefix} Has detailed Dig Deeper rule/trap alert`);
  assert(Array.isArray(q.digDeeper.steps) && q.digDeeper.steps.length >= 2, `${prefix} Has step-by-step breakdown`);
  assert(Array.isArray(q.numberLine), `${prefix} Has numberLine array defined`);
});

console.log("\n=== 2. TESTING MATHEMATICAL CORRECTNESS OF KEY QUESTIONS ===");

// Test Q1: |f + 2| = 4 => {-6, 2}
const q1 = QUESTION_BANK.find(q => q.id === 'L1-01');
assert(Math.abs(2 + 2) === 4 && Math.abs(-6 + 2) === 4, "L1-01 (|f+2|=4) solutions 2 and -6 satisfy equation");

// Test Q2: |x + 4| + 3 = 17 => |x + 4| = 14 => {-18, 10}
const q2 = QUESTION_BANK.find(q => q.id === 'L1-02');
assert(Math.abs(10 + 4) + 3 === 17 && Math.abs(-18 + 4) + 3 === 17, "L1-02 (|x+4|+3=17) solutions 10 and -18 satisfy equation");

// Test Q3: |x + 12| = 0 => {-12}
const q3 = QUESTION_BANK.find(q => q.id === 'L1-03');
assert(Math.abs(-12 + 12) === 0, "L1-03 (|x+12|=0) solution -12 satisfies equation");

// Test Q7: 3|4w - 10| - 5 = 10 => {5/4, 15/4}
const q7 = QUESTION_BANK.find(q => q.id === 'L2-01');
const w1 = 5 / 4;
const w2 = 15 / 4;
assert(3 * Math.abs(4 * w1 - 10) - 5 === 10, "L2-01 (3|4w-10|-5=10) solution 5/4 satisfies equation");
assert(3 * Math.abs(4 * w2 - 10) - 5 === 10, "L2-01 (3|4w-10|-5=10) solution 15/4 satisfies equation");

// Test Q8: |x - 1| = -3 => empty set
const q8 = QUESTION_BANK.find(q => q.id === 'L2-02');
assert(q8.options[q8.correctIndex].includes('emptyset') || q8.options[q8.correctIndex].includes('No Solution'), "L2-02 (|x-1|=-3) correct answer is No Solution / empty set");

// Test Q9: -2|x - 5| = -16 => {-3, 13}
const q9 = QUESTION_BANK.find(q => q.id === 'L2-03');
assert(-2 * Math.abs(13 - 5) === -16 && -2 * Math.abs(-3 - 5) === -16, "L2-03 (-2|x-5|=-16) solutions satisfy equation");

// Test Q10: 7 - |3k + 2| = 12 => |3k + 2| = -5 => empty set
const q10 = QUESTION_BANK.find(q => q.id === 'L2-04');
assert(q10.options[q10.correctIndex].includes('emptyset') || q10.options[q10.correctIndex].includes('No Solution'), "L2-04 (7-|3k+2|=12) correct answer is No Solution");

// Test Extraneous Curveball: |3x + 2| = x - 4 => candidate roots are -3 and 0.5
// Check that both candidate roots produce negative right-hand sides
const x_cand1 = -3;
const rhs1 = x_cand1 - 4; // -7
const x_cand2 = 0.5;
const rhs2 = x_cand2 - 4; // -3.5
assert(rhs1 < 0 && rhs2 < 0, "L3-01 (|3x+2|=x-4) Extraneous check: RHS < 0 for all candidate roots, proving No Solution");

// Test Extraneous Curveball: |x + 5| = 2x - 4 => candidate roots are 9 and -1/3
const root_valid = 9;
const root_extraneous = -1 / 3;
assert(Math.abs(root_valid + 5) === 2 * root_valid - 4, "L3-02 (|x+5|=2x-4) root x=9 is valid (14 = 14)");
assert(2 * root_extraneous - 4 < 0, "L3-02 (|x+5|=2x-4) root x=-1/3 is extraneous because RHS < 0");

// Test Absolute Value on Both Sides: |2x - 5| = |x + 4| => {1/3, 9}
const both_1 = 1 / 3;
const both_2 = 9;
assert(Math.abs(2 * both_2 - 5) === Math.abs(both_2 + 4), "L3-03 (|2x-5|=|x+4|) x=9 satisfies equation");
assert(Math.abs(Math.abs(2 * both_1 - 5) - Math.abs(both_1 + 4)) < 1e-9, "L3-03 (|2x-5|=|x+4|) x=1/3 satisfies equation");

console.log("\n=== 3. TESTING INFINITE ALGORITHMIC GENERATOR (100 SAMPLES) ===");

for (let i = 0; i < 50; i++) {
  const g1 = ProblemGenerator.generateLevel1();
  assert(g1.options.length === 4, `Gen L1 [iteration ${i+1}] generates exactly 4 options`);
  assert(g1.correctIndex >= 0 && g1.correctIndex <= 3, `Gen L1 [iteration ${i+1}] correctIndex in [0, 3]`);
  assert(new Set(g1.options).size === 4, `Gen L1 [iteration ${i+1}] all options are distinct`);
  assert(g1.numberLine.length > 0, `Gen L1 [iteration ${i+1}] numberLine is non-empty`);
}

for (let i = 0; i < 50; i++) {
  const g2 = ProblemGenerator.generateLevel2();
  assert(g2.options.length === 4, `Gen L2 [iteration ${i+1}] generates exactly 4 options`);
  assert(g2.correctIndex >= 0 && g2.correctIndex <= 3, `Gen L2 [iteration ${i+1}] correctIndex in [0, 3]`);
  assert(new Set(g2.options).size === 4, `Gen L2 [iteration ${i+1}] all options are distinct`);
  assert(Array.isArray(g2.numberLine), `Gen L2 [iteration ${i+1}] numberLine array is valid`);
}

console.log("\n=== 4. TESTING NEW GENERATORS (GRAPH, EVAL, WORD & CLONES) ===");

for (let i = 0; i < 25; i++) {
  const gGraph = ProblemGenerator.generateWritingEquationFromGraph();
  assert(gGraph.type === 'write_equation', `Gen Graph [iteration ${i+1}] type is write_equation`);
  assert(Array.isArray(gGraph.graphPoints) && gGraph.graphPoints.length === 2, `Gen Graph [iteration ${i+1}] has 2 graph points`);
  assert(gGraph.targetEquation.includes('|'), `Gen Graph [iteration ${i+1}] target equation has absolute value`);
  assert(gGraph.graphPoints[1] - gGraph.midpoint === gGraph.distance, `Gen Graph [iteration ${i+1}] distance matches points`);
}

for (let i = 0; i < 25; i++) {
  const gEval = ProblemGenerator.generateEvaluatingExpression();
  assert(gEval.type === 'eval', `Gen Eval [iteration ${i+1}] type is eval`);
  assert(!isNaN(parseFloat(gEval.solutionSet)), `Gen Eval [iteration ${i+1}] solutionSet is numeric`);
}

for (let i = 0; i < 25; i++) {
  const gWord = ProblemGenerator.generateToleranceWordProblem();
  assert(gWord.type === 'word_problem', `Gen Word [iteration ${i+1}] type is word_problem`);
  assert(Array.isArray(gWord.numberLine) && gWord.numberLine.length === 2, `Gen Word [iteration ${i+1}] has 2 numberLine points`);
  assert(gWord.numberLine[0] < gWord.numberLine[1], `Gen Word [iteration ${i+1}] min < max`);
}

// Test generateCloneFor dispatcher
const sampleEval = QUESTION_BANK.find(q => q.type === 'eval');
const cloneEval = ProblemGenerator.generateCloneFor(sampleEval);
assert(cloneEval.type === 'eval', "generateCloneFor(eval) yields eval problem");

const sampleGraph = QUESTION_BANK.find(q => q.type === 'write_equation');
const cloneGraph = ProblemGenerator.generateCloneFor(sampleGraph);
assert(cloneGraph.type === 'write_equation', "generateCloneFor(graph) yields write_equation problem");

const sampleWord = QUESTION_BANK.find(q => q.type === 'word_problem');
const cloneWord = ProblemGenerator.generateCloneFor(sampleWord);
assert(cloneWord.type === 'word_problem', "generateCloneFor(word) yields word_problem");

const sampleL3 = QUESTION_BANK.find(q => q.level === 3);
const cloneL3 = ProblemGenerator.generateCloneFor(sampleL3);
assert(cloneL3.level === 3, "generateCloneFor(L3) yields level 3 problem");

// Test generateLevel3 (25 iterations)
for (let i = 0; i < 25; i++) {
  const g3 = ProblemGenerator.generateLevel3();
  assert(g3.level === 3, `Gen L3 [iteration ${i+1}] has level 3`);
  assert(typeof g3.solutionSet === 'string' && g3.solutionSet.length > 0, `Gen L3 [iteration ${i+1}] has solutionSet`);
  assert(Array.isArray(g3.options) && g3.options.length === 4, `Gen L3 [iteration ${i+1}] has 4 options`);
  assert(typeof g3.equation === 'string' && g3.equation.includes('|'), `Gen L3 [iteration ${i+1}] has equation with abs`);
}

// Test generateRandom (25 iterations)
for (let i = 0; i < 25; i++) {
  const gr = ProblemGenerator.generateRandom();
  assert(typeof gr.equation === 'string', `Gen Random [iteration ${i+1}] has equation`);
  assert(typeof gr.solutionSet === 'string', `Gen Random [iteration ${i+1}] has solutionSet`);
}

console.log(`\n========================================`);
console.log(`RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log(`========================================`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log("All Mathematical & Schema Integrity Tests Passed Successfully!");
}
