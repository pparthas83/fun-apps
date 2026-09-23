const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

let passedTests = 0;
let failedTests = 0;
const errorsDetected = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName} - ${details}`);
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class ChromeDevToolsClient {
  constructor(port = 9222) {
    this.port = port;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    let attempts = 0;
    let versionData = null;
    while (attempts < 25) {
      try {
        const res = await fetch(`http://127.0.0.1:${this.port}/json/version`);
        versionData = await res.json();
        break;
      } catch (e) {
        attempts++;
        await sleep(200);
      }
    }

    if (!versionData || !versionData.webSocketDebuggerUrl) {
      throw new Error("Could not connect to Chrome debugging endpoint");
    }

    const listRes = await fetch(`http://127.0.0.1:${this.port}/json/list`);
    const pages = await listRes.json();
    const page = pages.find(p => p.type === 'page') || pages[0];

    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(page.webSocketDebuggerUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.consoleAPICalled') {
          if (msg.params.type === 'error') {
            const errText = msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
            console.error(`    [Browser Console Error] ${errText}`);
            errorsDetected.push(errText);
          }
        }
        if (msg.method === 'Runtime.exceptionThrown') {
          const text = msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || '');
          console.error(`    [Browser Uncaught Exception] ${text}`);
          errorsDetected.push(text);
        }
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          cb(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve) => {
      const id = this.id++;
      this.callbacks.set(id, resolve);
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res && res.exceptionDetails) {
      console.error(`    [Browser Eval Error on "${expression}"]:`, res.exceptionDetails.exception ? (res.exceptionDetails.exception.description || res.exceptionDetails.exception.value) : res.exceptionDetails.text);
    }
    return res && res.result ? res.result.value : null;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runTests() {
  console.log("=== STARTING MODULAR HEADLESS CHROME E2E AUTOMATION TEST SUITE ===");

  const appRoot = path.resolve(__dirname, '../../');
  const testProfileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-test-profile-'));

  const serverProcess = spawn('node', ['server.js'], {
    cwd: appRoot,
    stdio: 'ignore'
  });

  const chromeProcess = spawn('/usr/bin/google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${testProfileDir}`,
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--window-size=1280,900'
  ]);

  chromeProcess.on('error', (err) => {
    console.error("Failed to spawn Chrome:", err);
    process.exit(1);
  });

  await sleep(1500);

  const client = new ChromeDevToolsClient(9222);
  try {
    await client.connect();
    console.log("Connected to Chrome DevTools Protocol successfully.");

    await client.send('Network.enable');
    await client.send('Network.setCacheDisabled', { cacheDisabled: true });
    await client.send('Runtime.enable');
    await client.send('Page.enable');

    // TEST 1: Page Navigation, Favicon & Brand Logo
    console.log("\n--- TEST 1: Page Navigation, Favicon & Brand Logo ---");
    await client.send('Page.navigate', { url: 'http://localhost:8080' });
    await sleep(2000);

    const title = await client.eval("document.title");
    assert(title.includes("Edison Math Trainer"), "Page title is correct", title);

    const faviconHref = await client.eval("document.querySelector('link[rel=\"icon\"]').getAttribute('href')");
    assert(faviconHref === "/assets/favicon.svg", "Favicon link correctly targets /assets/favicon.svg in browser tab markup", faviconHref);

    const faviconFetchStatus = await client.eval("fetch('/assets/favicon.svg').then(r => r.status)");
    assert(faviconFetchStatus === 200, "Favicon SVG asset is served successfully with HTTP 200", `Status: ${faviconFetchStatus}`);

    const logoSrc = await client.eval("document.querySelector('header img').getAttribute('src')");
    assert(logoSrc === "/assets/logo.svg", "Header brand logo renders /assets/logo.svg", logoSrc);

    const logoFetchStatus = await client.eval("fetch('/assets/logo.svg').then(r => r.status)");
    assert(logoFetchStatus === 200, "Logo SVG asset is served successfully with HTTP 200", `Status: ${logoFetchStatus}`);

    const hasKatex = await client.eval("typeof window.renderMathInElement === 'function' && typeof window.katex === 'object'");
    assert(hasKatex, "KaTeX and auto-render libraries are loaded and initialized");

    // TEST 2: Initial Question & Fill-in-the-Blank Elements
    console.log("\n--- TEST 2: Initial Question State & DOM Elements ---");
    const qCounter = await client.eval("document.getElementById('q-counter').innerText");
    assert(qCounter.toLowerCase().includes("question 1 of"), "Question counter shows 'Question 1 of ...'", qCounter);

    const hasInput = await client.eval("document.getElementById('answer-input') !== null");
    assert(hasInput, "Fill-in-the-blank answer input field is rendered");

    const hasSubmitBtn = await client.eval("document.getElementById('submit-answer-btn') !== null");
    assert(hasSubmitBtn, "Check Answer button is rendered");

    const equationText = await client.eval("document.getElementById('equation-display').innerText");
    assert(equationText && equationText.length > 0, "Equation display is populated", equationText);

    // TEST 3: Filter Buttons & Subtopic Filters
    console.log("\n--- TEST 3: Difficulty & Subtopic Filter Tabs ---");
    await client.eval("window.setFilter('1')");
    const l1Text = await client.eval("document.getElementById('q-counter').innerText");
    assert(l1Text.toLowerCase().includes("of 20"), "Level 1 filter loads exactly 20 questions", l1Text);

    await client.eval("window.setFilter('2')");
    const l2Text = await client.eval("document.getElementById('q-counter').innerText");
    assert(l2Text.toLowerCase().includes("of 24"), "Level 2 filter loads exactly 24 questions", l2Text);

    await client.eval("window.setFilter('3')");
    const l3Text = await client.eval("document.getElementById('q-counter').innerText");
    assert(l3Text.toLowerCase().includes("of 8"), "Level 3 filter loads exactly 8 curveball questions", l3Text);

    await client.eval("window.setFilter('graphs')");
    const graphsText = await client.eval("document.getElementById('q-counter').innerText");
    assert(graphsText.toLowerCase().includes("of 8"), "Graphs filter loads exactly 8 questions", graphsText);

    await client.eval("window.setFilter('eval')");
    const evalText = await client.eval("document.getElementById('q-counter').innerText");
    assert(evalText.toLowerCase().includes("of 8"), "Evaluating Expressions filter loads exactly 8 questions", evalText);

    await client.eval("window.setFilter('word')");
    const wordText = await client.eval("document.getElementById('q-counter').innerText");
    assert(wordText.toLowerCase().includes("of 5"), "Real-world word problems filter loads 5 questions", wordText);

    await client.eval("window.setFilter('all')");
    const allText = await client.eval("document.getElementById('q-counter').innerText");
    assert(allText.toLowerCase().includes("of 52"), "All Questions filter restores all 52 questions", allText);

    // TEST 4: Quick Insert Chips & Fill-in-the-Blank Answer Interaction
    console.log("\n--- TEST 4: Answer Interaction & Dig Deeper Drawer ---");
    await client.eval("window.insertSymbol('No solution')");
    const chipVal = await client.eval("document.getElementById('answer-input').value");
    assert(chipVal === "No solution", "Quick-insert chip sets 'No solution'", chipVal);

    await client.eval("window.clearAnswerInput()");
    const clearedVal = await client.eval("document.getElementById('answer-input').value");
    assert(clearedVal === "", "Clear button empties answer input", clearedVal);

    // Test | | quick insert chip
    await client.eval("window.insertSymbol('| |')");
    const absVal = await client.eval("document.getElementById('answer-input').value");
    assert(absVal.includes("||"), "Quick-insert chip '| x |' adds absolute value bars", absVal);
    await client.eval("window.clearAnswerInput()");

    // Enter correct answer without braces (testing flexible normalization: "-6, 2" for "{-6, 2}")
    await client.eval("document.getElementById('answer-input').value = '-6, 2'");
    await client.eval("window.submitAnswer()");

    const isFeedbackVisible = await client.eval("!document.getElementById('feedback-card').classList.contains('hidden')");
    assert(isFeedbackVisible, "Feedback card appears on answer submission");

    const feedbackText = await client.eval("document.getElementById('feedback-card').innerText");
    assert(feedbackText.includes("Spot on"), "Feedback shows success message", feedbackText);

    const scoreVal = await client.eval("document.getElementById('stat-score').innerText");
    assert(scoreVal === "1", "Score display increments to 1", `Score is ${scoreVal}`);

    const streakVal = await client.eval("document.getElementById('stat-streak').innerText");
    assert(streakVal === "1", "Streak display increments to 1", `Streak is ${streakVal}`);

    // Test Dig Deeper Open/Close
    await client.eval("window.toggleDigDeeper()");
    const isDdOpen = await client.eval("!document.getElementById('dig-deeper-card').classList.contains('hidden')");
    assert(isDdOpen, "Dig Deeper drawer opens on toggle click");

    const stepsCount = await client.eval("document.querySelectorAll('#dd-steps-box li').length");
    assert(stepsCount >= 3, "Dig Deeper displays teacher's step-by-step breakdown", `Steps: ${stepsCount}`);

    const hasNumberLineSvg = await client.eval("document.querySelector('#numberline-canvas-container svg') !== null");
    assert(hasNumberLineSvg, "SVG Number Line visualizer rendered correctly inside Dig Deeper");

    await client.eval("window.toggleDigDeeper()");
    const isDdClosed = await client.eval("document.getElementById('dig-deeper-card').classList.contains('hidden')");
    assert(isDdClosed, "Dig Deeper drawer collapses on toggle close");

    // TEST 5: Next Question & Incorrect Answer Handling
    console.log("\n--- TEST 5: Next Question & Incorrect Handling ---");
    await client.eval("window.nextQuestion()");
    const qCounter2 = await client.eval("document.getElementById('q-counter').innerText");
    assert(qCounter2.toLowerCase().includes("question 2 of"), "Next Question advances to Question 2", qCounter2);

    const inputCleared = await client.eval("document.getElementById('answer-input').value === ''");
    assert(inputCleared, "Answer input field is cleared for the new question");

    // Submit an incorrect answer
    await client.eval("document.getElementById('answer-input').value = '999'");
    await client.eval("window.submitAnswer()");

    const streakAfterWrong = await client.eval("document.getElementById('stat-streak').innerText");
    assert(streakAfterWrong === "0", "Streak resets to 0 on incorrect answer", `Streak: ${streakAfterWrong}`);

    const ddAutoOpened = await client.eval("!document.getElementById('dig-deeper-card').classList.contains('hidden')");
    assert(ddAutoOpened, "Dig Deeper drawer auto-opens on incorrect answer so student learns immediately");

    // TEST 6: Algorithmic Clone Generator
    console.log("\n--- TEST 6: Dynamic Clone Generation ---");
    const countBeforeClone = await client.eval("document.getElementById('q-counter').innerText");
    await client.eval("window.practiceClone()");
    const countAfterClone = await client.eval("document.getElementById('q-counter').innerText");
    assert(countAfterClone.toLowerCase().includes("of 53"), "Try Similar Clone injects new question into active list (53 total)", countAfterClone);

    // TEST 6B: Graph Questions & Inline SVG Number Line
    console.log("\n--- TEST 6B: Graph Questions & Inline SVG Number Line ---");
    await client.eval("window.setFilter('graphs')");
    const isGraphVisible = await client.eval("!document.getElementById('inline-graph-container').classList.contains('hidden')");
    assert(isGraphVisible, "Inline number line graph container is visible for Graph questions");

    const hasGraphSvg = await client.eval("document.querySelector('#inline-graph-svg svg') !== null");
    assert(hasGraphSvg, "SVG Number line is rendered inside inline graph container");

    // Submit correct equation for GRAPH-01 (|x| = 1)
    await client.eval("document.getElementById('answer-input').value = '|x| = 1'");
    await client.eval("window.submitAnswer()");
    const graphFeedback = await client.eval("document.getElementById('feedback-card').innerText");
    assert(graphFeedback.includes("Spot on"), "Equation '|x| = 1' evaluated correctly as Spot on", graphFeedback);

    // TEST 6C: Evaluating Expression Questions
    console.log("\n--- TEST 6C: Evaluating Expression Questions ---");
    await client.eval("window.setFilter('eval')");
    const isEqVisible = await client.eval("!document.getElementById('equation-card-box').classList.contains('hidden')");
    assert(isEqVisible, "Equation box is visible for evaluation questions");

    const ansLabelText = await client.eval("document.getElementById('answer-label').innerText");
    assert(ansLabelText.toLowerCase().includes("value"), "Answer label displays 'Your Answer (Value):'", ansLabelText);

    // Submit correct answer for EVAL-01 (|2 - 5| - 1 = 3 - 1 = 2)
    await client.eval("document.getElementById('answer-input').value = '2'");
    await client.eval("window.submitAnswer()");
    const evalFeedback = await client.eval("document.getElementById('feedback-card').innerText");
    assert(evalFeedback.includes("Spot on"), "Value 2 evaluated correctly as Spot on", evalFeedback);

    // Restore to all questions
    await client.eval("window.setFilter('all')");

    // TEST 7: Teacher's 5-Point Checklist Functionality
    console.log("\n--- TEST 7: Teacher's 5-Point Checklist Functionality ---");
    const checklistExists = await client.eval("document.getElementById('checklist-card') !== null");
    assert(checklistExists, "Teacher's 5-point checklist card element exists on the right column");

    const stepCheckCount = await client.eval("document.querySelectorAll('.step-check').length");
    assert(stepCheckCount === 5, "Checklist contains exactly 5 interactive step checkboxes", `Found: ${stepCheckCount}`);

    // Check step 1
    await client.eval(`
      (() => {
        const cb = document.getElementById('check-step-1');
        cb.checked = true;
        cb.dispatchEvent(new Event('change'));
      })()
    `);
    const progressText1 = await client.eval("document.getElementById('checklist-progress-text').innerText");
    assert(progressText1.includes("1 / 5"), "Progress updates to 1 / 5 Steps when step 1 is checked", progressText1);

    // Check all 5 steps
    await client.eval(`
      (() => {
        document.querySelectorAll('.step-check').forEach(cb => {
          cb.checked = true;
          cb.dispatchEvent(new Event('change'));
        });
      })()
    `);
    const progressTextAll = await client.eval("document.getElementById('checklist-progress-text').innerText");
    assert(progressTextAll.includes("All 5 Steps Done"), "Progress shows completion when all 5 steps are checked", progressTextAll);

    // Reset checklist via button
    await client.eval("document.getElementById('checklist-reset-btn').click()");
    const progressTextReset = await client.eval("document.getElementById('checklist-progress-text').innerText");
    const allUnchecked = await client.eval("Array.from(document.querySelectorAll('.step-check')).every(cb => !cb.checked)");
    assert(allUnchecked && progressTextReset.includes("0 / 5"), "Reset checklist clears all checkboxes to 0 / 5", progressTextReset);

    // TEST 7b: Cranking for More Problems (Crank +10, Instant Clone, and Infinite Practice)
    console.log("\n--- TEST 7b: Problem Cranker & Infinite Practice ---");
    await client.eval("window.setFilter('all')");

    // Test Crank +10 More
    await client.eval("window.crankMoreProblems(10)");
    const qCounterAfterCrank = await client.eval("document.getElementById('q-counter').innerText");
    assert(qCounterAfterCrank.toLowerCase().includes("of 62"), "q-counter reflects updated 62 question count", qCounterAfterCrank);

    // Test Toast notification
    const toastText = await client.eval("document.getElementById('toast-text').innerText");
    assert(toastText.includes("Cranked +10"), "Toast notification displays crank success message", toastText);

    // Test Instant Clone
    await client.eval("window.crankCurrentClone()");
    const qCounterAfterClone = await client.eval("document.getElementById('q-counter').innerText");
    assert(qCounterAfterClone.toLowerCase().includes("question 2 of 63"), "Crank Clone inserts clone and advances immediately to Question 2", qCounterAfterClone);

    // Test Infinite Practice Mode
    await client.eval("window.setFilter('infinite')");
    const infModeTitle = await client.eval("document.getElementById('q-counter').innerText");
    assert(infModeTitle.toLowerCase().includes("infinite practice"), "Infinite Mode updates counter to Infinite Practice", infModeTitle);

    // TEST 8: LocalStorage Persistence Across Reload & Reset
    console.log("\n--- TEST 8: LocalStorage Persistence & Reset ---");
    await client.send('Page.reload');
    await sleep(2000);

    const reloadedBestStreak = await client.eval("document.getElementById('stat-best-streak').innerText");
    assert(parseInt(reloadedBestStreak, 10) >= 1, "Best Streak persisted across page reload", `Best streak: ${reloadedBestStreak}`);

    await client.eval("window.resetAllProgress(true)");
    const resetBestStreak = await client.eval("document.getElementById('stat-best-streak').innerText");
    assert(resetBestStreak === "0", "Reset clears best streak back to 0", `Best: ${resetBestStreak}`);

    // TEST 9: Browser Console & Runtime Error Check
    console.log("\n--- TEST 9: Browser Console & Runtime Error Check ---");
    assert(errorsDetected.length === 0, `Zero browser runtime/console errors detected during full test run (errors: ${errorsDetected.length})`);
    if (errorsDetected.length > 0) {
      console.error("Detected errors:", errorsDetected);
    }

  } catch (err) {
    console.error("Unexpected test execution error:", err);
    failedTests++;
  } finally {
    client.close();
    chromeProcess.kill('SIGKILL');
    serverProcess.kill('SIGKILL');
  }

  console.log(`\n========================================`);
  console.log(`E2E BROWSER TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log(`========================================`);

  if (failedTests > 0 || errorsDetected.length > 0) {
    process.exit(1);
  } else {
    console.log("All Features & End-to-End Browser Tests Passed with ZERO BUGS!");
  }
}

runTests();
