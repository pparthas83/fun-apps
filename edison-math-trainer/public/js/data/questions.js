const QUESTION_BANK = [
  {
    "id": "L1-01",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Direct 2-Case Split",
    "source": "Teacher Slide Example",
    "equation": "|f + 2| = 4",
    "prompt": "Solve the absolute value equation for $f$. Write your solution set in braces ordered from least to greatest.",
    "options": [
      "\\{-6, 2\\}",
      "\\{-2, 6\\}",
      "\\{-4, 4\\}",
      "\\emptyset"
    ],
    "correctIndex": 0,
    "solutionSet": "{-6, 2}",
    "numberLine": [
      -6,
      2
    ],
    "digDeeper": {
      "rule": "The absolute value is already isolated on the left side. Immediately drop the bars and create two cases: one positive and one negative.",
      "steps": [
        "**Step 1: Isolate absolute value:** It is already isolated: $|f + 2| = 4$.",
        "**Step 2: Drop bars & create 2 cases:**<br>• Case 1 (Positive): $f + 2 = 4$<br>• Case 2 (Negative): $f + 2 = -4$",
        "**Step 3: Solve both cases:**<br>• Case 1: $f = 4 - 2 \\implies f = 2$<br>• Case 2: $f = -4 - 2 \\implies f = -6$",
        "**Step 4: Solution Set:** Write in braces from least to greatest: $\\{-6, 2\\}$.",
        "**Step 5: Check:** $|2 + 2| = |4| = 4$ ✓ and $|-6 + 2| = |-4| = 4$ ✓."
      ]
    }
  },
  {
    "id": "L1-02",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Single-Step Addition/Subtraction",
    "source": "Teacher Slide Example",
    "equation": "|x + 4| + 3 = 17",
    "prompt": "Solve the absolute value equation for $x$. Write your solution set in braces ordered least to greatest.",
    "options": [
      "\\{-18, 10\\}",
      "\\{-10, 18\\}",
      "\\{-14, 14\\}",
      "\\{-20, 12\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{-18, 10}",
    "numberLine": [
      -18,
      10
    ],
    "digDeeper": {
      "rule": "CRITICAL: You must ISOLATE the absolute value bars before creating the two cases. Do NOT drop bars while $+3$ is outside!",
      "steps": [
        "**Step 1: Isolate the absolute value on the left:**<br>Subtract 3 from both sides:<br>$|x + 4| + 3 - 3 = 17 - 3$<br>$|x + 4| = 14$",
        "**Step 2: Drop bars and create 2 cases:**<br>• Case 1: $x + 4 = 14$<br>• Case 2: $x + 4 = -14$",
        "**Step 3: Solve both:**<br>• Case 1: $x = 14 - 4 = 10$<br>• Case 2: $x = -14 - 4 = -18$",
        "**Step 4: Solution Set:** $\\{-18, 10\\}$ (least to greatest).",
        "**Step 5: Check:** $|10 + 4| + 3 = 14 + 3 = 17$ ✓; $|-18 + 4| + 3 = |-14| + 3 = 14 + 3 = 17$ ✓."
      ]
    }
  },
  {
    "id": "L1-03",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Distance equals Zero",
    "source": "Special Case",
    "equation": "|x + 12| = 0",
    "prompt": "Solve for $x$: $|x + 12| = 0$.",
    "options": [
      "\\{-12\\}",
      "\\{-12, 12\\}",
      "\\{0, -12\\}",
      "\\emptyset"
    ],
    "correctIndex": 0,
    "solutionSet": "{-12}",
    "numberLine": [
      -12
    ],
    "digDeeper": {
      "rule": "Zero is neither positive nor negative! When $|expression| = 0$, there is only ONE case: $expression = 0$.",
      "steps": [
        "**Step 1: Isolate:** It is isolated: $|x + 12| = 0$.",
        "**Step 2: Create cases:** Since $+0 = -0 = 0$, there is only 1 equation: $x + 12 = 0$.",
        "**Step 3: Solve:** $x = -12$.",
        "**Step 4: Solution Set:** $\\{-12\\}$ (A single solution, not two!).",
        "**Step 5: Check:** $|-12 + 12| = |0| = 0$ ✓."
      ]
    }
  },
  {
    "id": "L1-04",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Direct 2-Case Split",
    "source": "Standard Practice",
    "equation": "|y - 7| = 15",
    "prompt": "Solve for $y$: $|y - 7| = 15$.",
    "options": [
      "\\{-8, 22\\}",
      "\\{-22, 8\\}",
      "\\{-15, 15\\}",
      "\\{8, 22\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{-8, 22}",
    "numberLine": [
      -8,
      22
    ],
    "digDeeper": {
      "rule": "The distance between $y$ and $7$ on the number line is 15 units. That means $y$ can be 15 units to the right ($7 + 15 = 22$) or 15 units to the left ($7 - 15 = -8$).",
      "steps": [
        "**Step 1: Isolate:** Already isolated: $|y - 7| = 15$.",
        "**Step 2: 2 Cases:**<br>• $y - 7 = 15$<br>• $y - 7 = -15$",
        "**Step 3: Solve:**<br>• $y = 15 + 7 = 22$<br>• $y = -15 + 7 = -8$",
        "**Step 4: Solution Set:** $\\{-8, 22\\}$."
      ]
    }
  },
  {
    "id": "L1-05",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Coefficient Inside",
    "source": "Standard Practice",
    "equation": "|2m + 6| = 18",
    "prompt": "Solve for $m$: $|2m + 6| = 18$.",
    "options": [
      "\\{-12, 6\\}",
      "\\{-6, 12\\}",
      "\\{-9, 9\\}",
      "\\{-15, 3\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{-12, 6}",
    "numberLine": [
      -12,
      6
    ],
    "digDeeper": {
      "rule": "Do NOT divide inside the bars! First branch into two cases, then solve each linear equation.",
      "steps": [
        "**Step 1: Isolate:** Already isolated: $|2m + 6| = 18$.",
        "**Step 2: 2 Cases:**<br>• Case 1: $2m + 6 = 18$<br>• Case 2: $2m + 6 = -18$",
        "**Step 3: Solve:**<br>• Case 1: $2m = 12 \\implies m = 6$<br>• Case 2: $2m = -24 \\implies m = -12$",
        "**Step 4: Solution Set:** $\\{-12, 6\\}$."
      ]
    }
  },
  {
    "id": "L1-06",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Isolating with Subtraction Outside",
    "source": "Standard Practice",
    "equation": "|p| - 9 = 4",
    "prompt": "Solve for $p$: $|p| - 9 = 4$.",
    "options": [
      "\\{-13, 13\\}",
      "\\{-5, 5\\}",
      "\\{-13, 5\\}",
      "\\emptyset"
    ],
    "correctIndex": 0,
    "solutionSet": "{-13, 13}",
    "numberLine": [
      -13,
      13
    ],
    "digDeeper": {
      "rule": "Add 9 to both sides first to isolate $|p|$.",
      "steps": [
        "**Step 1: Isolate:** $|p| = 4 + 9 = 13$.",
        "**Step 2 & 3: 2 Cases:** $p = 13$ or $p = -13$.",
        "**Step 4: Solution Set:** $\\{-13, 13\\}$."
      ]
    }
  },
  {
    "id": "L2-01",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Multi-Step Isolation & Fractions",
    "source": "Teacher Slide Example",
    "equation": "3|4w - 10| - 5 = 10",
    "prompt": "Solve for $w$: $3|4w - 10| - 5 = 10$. Write the solutions as simplified fractions in braces ordered least to greatest.",
    "options": [
      "\\{\\frac{5}{4}, \\frac{15}{4}\\}",
      "\\{-\\frac{15}{4}, \\frac{5}{4}\\}",
      "\\{\\frac{5}{2}, \\frac{15}{2}\\}",
      "\\{-5, 5\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{5/4, 15/4}",
    "numberLine": [
      1.25,
      3.75
    ],
    "digDeeper": {
      "rule": "This is a full multi-step isolation problem from the teacher's slides. You must (1) Add 5, (2) Divide by 3 BEFORE splitting into cases!",
      "steps": [
        "**Step 1: Isolate the absolute value on the left:**<br>• Add 5: $3|4w - 10| = 10 + 5 = 15$<br>• Divide by 3: $|4w - 10| = 5$",
        "**Step 2: Drop bars & branch into 2 cases:**<br>• Case 1: $4w - 10 = 5$<br>• Case 2: $4w - 10 = -5$",
        "**Step 3: Solve each equation:**<br>• Case 1: $4w = 15 \\implies w = \\frac{15}{4}$<br>• Case 2: $4w = 5 \\implies w = \\frac{5}{4}$",
        "**Step 4: Solution Set:** Write least to greatest: $\\{\\frac{5}{4}, \\frac{15}{4}\\}$."
      ]
    }
  },
  {
    "id": "L2-02",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Distance Cannot Be Negative",
    "source": "Teacher Slide Example",
    "equation": "|x - 1| = -3",
    "prompt": "Solve for $x$: $|x - 1| = -3$.",
    "options": [
      "\\emptyset \\text{ (No Solution)}",
      "\\{-2, 4\\}",
      "\\{-4, 2\\}",
      "\\{4\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "∅",
    "numberLine": [],
    "digDeeper": {
      "rule": "TRAP ALERT! Absolute value represents distance from zero on the number line. Distance can NEVER be negative! Therefore, $|expression| = \\text{negative}$ has NO SOLUTION.",
      "steps": [
        "**Step 1: Inspect isolated equation:** $|x - 1| = -3$.",
        "**Step 2: Recognize definition:** Absolute value measures distance. Distance cannot be $-3$.",
        "**Step 3: Conclusion:** Solution is the empty set $\\emptyset$ (No Solution).",
        "**Common Trap:** Students who mindlessly write $x - 1 = -3$ and $x - 1 = 3$ get false solutions $\\{-2, 4\\}$, but neither works: $|-2-1|=|-3|=3 \\neq -3$!"
      ]
    }
  },
  {
    "id": "L2-03",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Negative Coefficient Trap",
    "source": "Edison Trap Classic",
    "equation": "-2|x - 5| = -16",
    "prompt": "Solve for $x$: $-2|x - 5| = -16$.",
    "options": [
      "\\{-3, 13\\}",
      "\\emptyset \\text{ (No Solution)}",
      "\\{-11, 21\\}",
      "\\{3, 13\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{-3, 13}",
    "numberLine": [
      -3,
      13
    ],
    "digDeeper": {
      "rule": "TRAP ALERT: Many students see $-16$ on the right side and shout 'NO SOLUTION!' without isolating! You must divide by $-2$ first: $-16 / -2 = +8$!",
      "steps": [
        "**Step 1: Isolate by dividing by -2:**<br>$\\frac{-2|x - 5|}{-2} = \\frac{-16}{-2}$<br>$|x - 5| = 8$ (Positive! So it DOES have solutions!)",
        "**Step 2: 2 Cases:**<br>• $x - 5 = 8$<br>• $x - 5 = -8$",
        "**Step 3: Solve:**<br>• $x = 13$<br>• $x = -3$",
        "**Step 4: Solution Set:** $\\{-3, 13\\}$."
      ]
    }
  },
  {
    "id": "L2-04",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Hidden Negative Result Trap",
    "source": "Edison Trap Classic",
    "equation": "7 - |3k + 2| = 12",
    "prompt": "Solve for $k$: $7 - |3k + 2| = 12$.",
    "options": [
      "\\emptyset \\text{ (No Solution)}",
      "\\{-1, 1\\}",
      "\\{-\\frac{7}{3}, 1\\}",
      "\\{-3, 3\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "∅",
    "numberLine": [],
    "digDeeper": {
      "rule": "Isolate carefully! Subtract 7, then divide by $-1$. The final isolated absolute value equals a negative number.",
      "steps": [
        "**Step 1: Isolate:**<br>• Subtract 7 from both sides: $-|3k + 2| = 12 - 7 = 5$<br>• Divide by -1: $|3k + 2| = -5$",
        "**Step 2: Check sign:** Absolute value cannot equal $-5$!",
        "**Step 3: Conclusion:** $\\emptyset$ (No Solution)."
      ]
    }
  },
  {
    "id": "L2-05",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Fractional Multiplier Outside",
    "source": "Multi-Step",
    "equation": "\\frac{1}{2}|2x - 8| + 3 = 9",
    "prompt": "Solve for $x$: $\\frac{1}{2}|2x - 8| + 3 = 9$.",
    "options": [
      "\\{-2, 10\\}",
      "\\{-4, 8\\}",
      "\\{2, 10\\}",
      "\\{-10, 2\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{-2, 10}",
    "numberLine": [
      -2,
      10
    ],
    "digDeeper": {
      "rule": "Isolate step-by-step: subtract 3 first, then multiply both sides by 2 to clear the fraction.",
      "steps": [
        "**Step 1: Isolate:**<br>• Subtract 3: $\\frac{1}{2}|2x - 8| = 6$<br>• Multiply by 2: $|2x - 8| = 12$",
        "**Step 2: 2 Cases:**<br>• $2x - 8 = 12$<br>• $2x - 8 = -12$",
        "**Step 3: Solve:**<br>• $2x = 20 \\implies x = 10$<br>• $2x = -4 \\implies x = -2$",
        "**Step 4: Solution Set:** $\\{-2, 10\\}$."
      ]
    }
  },
  {
    "id": "L2-06",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Negative inside the absolute value",
    "source": "Sign Fluency",
    "equation": "|5 - 2x| = 11",
    "prompt": "Solve for $x$: $|5 - 2x| = 11$.",
    "options": [
      "\\{-3, 8\\}",
      "\\{-8, 3\\}",
      "\\{-3, 3\\}",
      "\\{-8, 8\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{-3, 8}",
    "numberLine": [
      -3,
      8
    ],
    "digDeeper": {
      "rule": "Remember when solving $-2x = C$, dividing by a negative flips signs: $-2x = 6 \\implies x = -3$, and $-2x = -16 \\implies x = 8$.",
      "steps": [
        "**Step 1: Isolate:** Already isolated: $|5 - 2x| = 11$.",
        "**Step 2: 2 Cases:**<br>• Case 1: $5 - 2x = 11$<br>• Case 2: $5 - 2x = -11$",
        "**Step 3: Solve:**<br>• Case 1: $-2x = 6 \\implies x = -3$<br>• Case 2: $-2x = -16 \\implies x = 8$",
        "**Step 4: Solution Set:** $\\{-3, 8\\}$ (least to greatest)."
      ]
    }
  },
  {
    "id": "L2-07",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Isolating to Zero",
    "source": "Special Case",
    "equation": "2|3x - 1| + 14 = 14",
    "prompt": "Solve for $x$: $2|3x - 1| + 14 = 14$.",
    "options": [
      "\\{\\frac{1}{3}\\}",
      "\\{-\\frac{1}{3}, \\frac{1}{3}\\}",
      "\\emptyset",
      "\\{0, \\frac{1}{3}\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{1/3}",
    "numberLine": [
      0.333
    ],
    "digDeeper": {
      "rule": "When an absolute value isolates to 0, there is exactly ONE solution because $+0 = -0$.",
      "steps": [
        "**Step 1: Isolate:**<br>• Subtract 14: $2|3x - 1| = 0$<br>• Divide by 2: $|3x - 1| = 0$",
        "**Step 2: 1 Case:** $3x - 1 = 0$",
        "**Step 3: Solve:** $3x = 1 \\implies x = \\frac{1}{3}$.",
        "**Step 4: Solution Set:** $\\{\\frac{1}{3}\\}$."
      ]
    }
  },
  {
    "id": "L2-08",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Fractional Division Bar",
    "source": "Standard Multi-Step",
    "equation": "\\frac{|x - 4|}{3} + 5 = 8",
    "prompt": "Solve for $x$: $\\frac{|x - 4|}{3} + 5 = 8$.",
    "options": [
      "\\{-5, 13\\}",
      "\\{-13, 5\\}",
      "\\{-7, 11\\}",
      "\\{5, 13\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{-5, 13}",
    "numberLine": [
      -5,
      13
    ],
    "digDeeper": {
      "rule": "Isolate $|x - 4|$: first subtract 5, then multiply by 3.",
      "steps": [
        "**Step 1: Isolate:**<br>• Subtract 5: $\\frac{|x - 4|}{3} = 3$<br>• Multiply by 3: $|x - 4| = 9$",
        "**Step 2: 2 Cases:**<br>• $x - 4 = 9 \\implies x = 13$<br>• $x - 4 = -9 \\implies x = -5$",
        "**Step 3: Solution Set:** $\\{-5, 13\\}$."
      ]
    }
  },
  {
    "id": "L3-01",
    "level": 3,
    "levelName": "Level 3: Edison Curveball",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Extraneous Solution Trap (Variable on Both Sides)",
    "source": "Accelerated Algebra 1 Exam",
    "equation": "|3x + 2| = x - 4",
    "prompt": "Solve the equation for $x$: $|3x + 2| = x - 4$. Remember to check for extraneous solutions!",
    "options": [
      "\\emptyset \\text{ (No Solution)}",
      "\\{-3, \\frac{1}{2}\\}",
      "\\{-3\\}",
      "\\{\\frac{1}{2}\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "∅",
    "numberLine": [],
    "digDeeper": {
      "rule": "CURVEBALL ALERT! When the variable is on both sides outside the bars, you MUST substitute your candidate solutions back into the original equation! If the right side produces a negative number, that solution is EXTRANEOUS.",
      "steps": [
        "**Step 1: Set up two cases:**<br>• Case 1: $3x + 2 = x - 4$<br>• Case 2: $3x + 2 = -(x - 4) = -x + 4$",
        "**Step 2: Solve Case 1:**<br>$2x = -6 \\implies x = -3$.<br>**Check $x = -3$ in original:** $|3(-3) + 2| = |-7| = 7$. But right-hand side is $-3 - 4 = -7$. Does $7 = -7$? NO! $x = -3$ is EXTRANEOUS!",
        "**Step 3: Solve Case 2:**<br>$4x = 2 \\implies x = \\frac{1}{2}$.<br>**Check $x = \\frac{1}{2}$ in original:** $|3(0.5) + 2| = |3.5| = 3.5$. But right-hand side is $0.5 - 4 = -3.5$. Does $3.5 = -3.5$? NO! $x = \\frac{1}{2}$ is EXTRANEOUS!",
        "**Step 4: Conclusion:** Both candidate solutions are extraneous. The solution set is $\\emptyset$ (No Solution)!"
      ]
    }
  },
  {
    "id": "L3-02",
    "level": 3,
    "levelName": "Level 3: Edison Curveball",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "One Valid, One Extraneous Solution",
    "source": "Accelerated Algebra 1 Exam",
    "equation": "|x + 5| = 2x - 4",
    "prompt": "Solve for $x$: $|x + 5| = 2x - 4$. Check for extraneous solutions.",
    "options": [
      "\\{9\\}",
      "\\{-\\frac{1}{3}, 9\\}",
      "\\{-\\frac{1}{3}\\}",
      "\\emptyset"
    ],
    "correctIndex": 0,
    "solutionSet": "{9}",
    "numberLine": [
      9
    ],
    "digDeeper": {
      "rule": "CURVEBALL: One candidate solution works, but the other makes the right-hand side negative and is extraneous!",
      "steps": [
        "**Step 1: Set up two cases:**<br>• Case 1: $x + 5 = 2x - 4$<br>• Case 2: $x + 5 = -(2x - 4) = -2x + 4$",
        "**Step 2: Solve Case 1:**<br>Subtract $x$, add 4: $x = 9$.<br>**Check $x = 9$:** Left: $|9 + 5| = 14$. Right: $2(9) - 4 = 14$. $14 = 14$ ✓ (VALID!)",
        "**Step 3: Solve Case 2:**<br>$3x = -1 \\implies x = -\\frac{1}{3}$.<br>**Check $x = -\\frac{1}{3}$:** Right side is $2(-\\frac{1}{3}) - 4 = -\\frac{14}{3} < 0$. An absolute value cannot equal a negative number! (EXTRANEOUS!)",
        "**Step 4: Solution Set:** $\\{9\\}$."
      ]
    }
  },
  {
    "id": "L3-03",
    "level": 3,
    "levelName": "Level 3: Edison Curveball",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Absolute Value on Both Sides",
    "source": "Honors Algebra 1",
    "equation": "|2x - 5| = |x + 4|",
    "prompt": "Solve for $x$: $|2x - 5| = |x + 4|$. Write your solution set ordered least to greatest.",
    "options": [
      "\\{\\frac{1}{3}, 9\\}",
      "\\{-9, \\frac{1}{3}\\}",
      "\\{-\\frac{1}{3}, 9\\}",
      "\\{-1, 9\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{1/3, 9}",
    "numberLine": [
      0.333,
      9
    ],
    "digDeeper": {
      "rule": "When you have $|A| = |B|$, you only need two cases: $A = B$ or $A = -B$. (The other two cases $-A = -B$ and $-A = B$ are mathematically identical).",
      "steps": [
        "**Step 1: Set up two cases:**<br>• Case 1: $2x - 5 = x + 4$<br>• Case 2: $2x - 5 = -(x + 4) = -x - 4$",
        "**Step 2: Solve Case 1:**<br>$2x - x = 4 + 5 \\implies x = 9$.",
        "**Step 3: Solve Case 2:**<br>$2x + x = -4 + 5 \\implies 3x = 1 \\implies x = \\frac{1}{3}$.",
        "**Step 4: Check:**<br>• $x = 9$: $|2(9)-5|=|13|=13$, $|9+4|=|13|=13$ ✓<br>• $x = 1/3$: $|2(1/3)-5|=|-13/3|=13/3$, $|1/3+4|=|13/3|=13/3$ ✓",
        "**Step 5: Solution Set:** $\\{\\frac{1}{3}, 9\\}$."
      ]
    }
  },
  {
    "id": "L3-04",
    "level": 3,
    "levelName": "Level 3: Edison Curveball",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Both Sides - Matching Slopes",
    "source": "Honors Algebra 1 Trap",
    "equation": "|3x + 1| = |3x - 7|",
    "prompt": "Solve for $x$: $|3x + 1| = |3x - 7|$.",
    "options": [
      "\\{1\\}",
      "\\{-1, 1\\}",
      "\\emptyset",
      "\\{1, 7\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{1}",
    "numberLine": [
      1
    ],
    "digDeeper": {
      "rule": "TRAP: In Case 1 ($3x + 1 = 3x - 7$), subtracting $3x$ yields $1 = -7$, which is a contradiction (no solution for that case). But Case 2 yields a valid solution!",
      "steps": [
        "**Step 1: Set up two cases:**<br>• Case 1: $3x + 1 = 3x - 7$<br>• Case 2: $3x + 1 = -(3x - 7) = -3x + 7$",
        "**Step 2: Solve Case 1:**<br>$3x - 3x = -7 - 1 \\implies 0 = -8$ (False! No solution from Case 1).",
        "**Step 3: Solve Case 2:**<br>$3x + 3x = 7 - 1 \\implies 6x = 6 \\implies x = 1$.",
        "**Step 4: Check $x = 1$:**<br>Left: $|3(1)+1| = |4| = 4$. Right: $|3(1)-7| = |-4| = 4$. $4 = 4$ ✓.",
        "**Step 5: Solution Set:** $\\{1\\}$."
      ]
    }
  },
  {
    "id": "L3-05",
    "level": 3,
    "levelName": "Level 3: Edison Curveball",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Error Analysis (Common District Trap)",
    "source": "Edison Curriculum Assessment Style",
    "equation": "-3|x - 2| = 12",
    "prompt": "A student attempted to solve $-3|x - 2| = 12$ by writing:<br>$-3x + 6 = 12$<br>Which statement correctly identifies the student's error and gives the true solution set?",
    "options": [
      "You cannot distribute into absolute value bars; dividing by -3 gives $|x - 2| = -4$, so the solution is $\\emptyset$.",
      "The student should have added 3 to both sides instead; the solution set is $\\{1, 5\\}$.",
      "The student forgot to write the second case $-3x + 6 = -12$; the solution set is $\\{-2, 6\\}$.",
      "The student made an arithmetic error when adding 6; the solution set is $\\{-2\\}$."
    ],
    "correctIndex": 0,
    "solutionSet": "∅",
    "numberLine": [],
    "digDeeper": {
      "rule": "DISTRIBUTION ERROR: Absolute value bars are NOT parentheses! You cannot distribute a coefficient into absolute value bars. You must divide both sides by $-3$.",
      "steps": [
        "**Why distribution fails:** $|a \\cdot b| = |a| \\cdot |b|$. If $a = -3$, then $|-3(x-2)| = 3|x-2| \\neq -3x+6$!",
        "**Correct Method:**<br>$\\frac{-3|x - 2|}{-3} = \\frac{12}{-3}$<br>$|x - 2| = -4$",
        "**Evaluate:** An absolute value represents distance and cannot equal a negative number ($-4$).",
        "**Correct Solution Set:** $\\emptyset$ (No Solution)."
      ]
    }
  },
  {
    "id": "L3-06",
    "level": 3,
    "levelName": "Level 3: Edison Curveball",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Real-World Tolerance Word Problem",
    "source": "NJSLS Modeling Standard",
    "equation": "|x - 250| = 3.5",
    "prompt": "A pharmaceutical scale in an Edison lab measures liquid medicine with an ideal target of $250\\text{ mL}$. The allowable margin of error (tolerance) is $3.5\\text{ mL}$.<br>Which absolute value equation models this situation, and what are the minimum and maximum acceptable volumes?",
    "options": [
      "|x - 250| = 3.5 \\implies \\{246.5\\text{ mL}, 253.5\\text{ mL}\\}",
      "|x + 250| = 3.5 \\implies \\{246.5\\text{ mL}, 253.5\\text{ mL}\\}",
      "|x - 3.5| = 250 \\implies \\{246.5\\text{ mL}, 253.5\\text{ mL}\\}",
      "|x - 250| = 7 \\implies \\{243\\text{ mL}, 257\\text{ mL}\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{246.5, 253.5}",
    "numberLine": [
      246.5,
      253.5
    ],
    "digDeeper": {
      "rule": "The standard tolerance model is: $|\\text{Actual} - \\text{Ideal}| = \\text{Tolerance}$.",
      "steps": [
        "**Formula:** $|x - \\text{target}| = \\text{margin of error}$.",
        "**Substitute values:** Target $= 250$, Tolerance $= 3.5 \\implies |x - 250| = 3.5$.",
        "**Case 1 (Maximum):** $x - 250 = 3.5 \\implies x = 253.5\\text{ mL}$.",
        "**Case 2 (Minimum):** $x - 250 = -3.5 \\implies x = 246.5\\text{ mL}$.",
        "**Solution Set:** $\\{246.5, 253.5\\}$."
      ]
    }
  },
  {
    "id": "L3-07",
    "level": 3,
    "levelName": "Level 3: Edison Curveball",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Turnpike Distance Word Problem",
    "source": "Edison Real-World Application",
    "equation": "|m - 150| = 42",
    "prompt": "Two utility vans leave maintenance depot located at Mile Marker 150 on the New Jersey Turnpike and travel in opposite directions. Both vans stop when they are exactly 42 miles from the depot.<br>Write an absolute value equation for their locations $m$, and find their mile markers.",
    "options": [
      "|m - 150| = 42 \\implies \\{108, 192\\}",
      "|m + 150| = 42 \\implies \\{108, 192\\}",
      "|m - 42| = 150 \\implies \\{108, 192\\}",
      "|m - 150| = 84 \\implies \\{66, 234\\}"
    ],
    "correctIndex": 0,
    "solutionSet": "{108, 192}",
    "numberLine": [
      108,
      192
    ],
    "digDeeper": {
      "rule": "Distance between two points $a$ and $b$ on a line is $|a - b|$. Here, the distance from marker 150 is $|m - 150| = 42$.",
      "steps": [
        "**Equation:** $|m - 150| = 42$",
        "**Case 1 (Traveling North):** $m - 150 = 42 \\implies m = 192$.",
        "**Case 2 (Traveling South):** $m - 150 = -42 \\implies m = 108$.",
        "**Solution Set:** $\\{108, 192\\}$."
      ]
    }
  },
  {
    "id": "L3-08",
    "level": 3,
    "levelName": "Level 3: Edison Curveball",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Variable on Both Sides with 2 Valid Solutions",
    "source": "Accelerated Algebra 1 Exam",
    "equation": "|2x - 3| = x + 6",
    "prompt": "Solve for $x$: $|2x - 3| = x + 6$. Check both candidate solutions.",
    "options": [
      "\\{-1, 9\\}",
      "\\{9\\}",
      "\\{-1\\}",
      "\\emptyset"
    ],
    "correctIndex": 0,
    "solutionSet": "{-1, 9}",
    "numberLine": [
      -1,
      9
    ],
    "digDeeper": {
      "rule": "Always check candidate solutions when the variable is on both sides. In this problem, BOTH candidate solutions are valid because both make the RHS positive!",
      "steps": [
        "**Step 1: 2 Cases:**<br>• Case 1: $2x - 3 = x + 6$<br>• Case 2: $2x - 3 = -(x + 6) = -x - 6$",
        "**Step 2: Solve:**<br>• Case 1: $x = 9$<br>• Case 2: $3x = -3 \\implies x = -1$",
        "**Step 3: Check $x = 9$:** $|2(9)-3| = |15| = 15$; $9+6=15$. (Valid!)",
        "**Step 4: Check $x = -1$:** $|2(-1)-3| = |-5| = 5$; $-1+6=5$. (Valid!)",
        "**Step 5: Solution Set:** $\\{-1, 9\\}$."
      ]
    }
  },
  {
    "id": "EVAL-01",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "eval",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Evaluating Expressions",
    "source": "2.5 Skills Practice (#1)",
    "equation": "|a - 5| - 1",
    "prompt": "Evaluate the expression if $a = 2, b = -3$, and $c = -4$.",
    "solutionSet": "2",
    "numberLine": [
      2
    ],
    "digDeeper": {
      "rule": "Substitute the given value for $a$, simplify the expression inside the absolute value bars first, take the absolute value, and then perform the remaining operations.",
      "steps": [
        "**Step 1: Substitute $a = 2$:** $|(2) - 5| - 1$",
        "**Step 2: Simplify inside absolute value:** $2 - 5 = -3 \\implies |-3| - 1$",
        "**Step 3: Evaluate absolute value:** $|-3| = 3 \\implies 3 - 1$",
        "**Step 4: Subtract:** $3 - 1 = 2$."
      ]
    },
    "options": [
      "2",
      "4",
      "-2",
      "0"
    ],
    "correctIndex": 0
  },
  {
    "id": "EVAL-02",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "eval",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Evaluating Expressions",
    "source": "2.5 Skills Practice (#2)",
    "equation": "|b + 1| + 8",
    "prompt": "Evaluate the expression if $a = 2, b = -3$, and $c = -4$.",
    "solutionSet": "10",
    "numberLine": [
      10
    ],
    "digDeeper": {
      "rule": "Substitute $b = -3$. Remember that $|-2| = +2$.",
      "steps": [
        "**Step 1: Substitute $b = -3$:** $|(-3) + 1| + 8$",
        "**Step 2: Simplify inside absolute value:** $-3 + 1 = -2 \\implies |-2| + 8$",
        "**Step 3: Evaluate absolute value:** $|-2| = 2 \\implies 2 + 8$",
        "**Step 4: Add:** $2 + 8 = 10$."
      ]
    },
    "options": [
      "10",
      "12",
      "-10",
      "8"
    ],
    "correctIndex": 0
  },
  {
    "id": "EVAL-03",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "eval",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Evaluating Expressions",
    "source": "2.5 Skills Practice (#3)",
    "equation": "5 - |c + 1|",
    "prompt": "Evaluate the expression if $a = 2, b = -3$, and $c = -4$.",
    "solutionSet": "2",
    "numberLine": [
      2
    ],
    "digDeeper": {
      "rule": "Substitute $c = -4$. Evaluate inside the bars first, then subtract from 5.",
      "steps": [
        "**Step 1: Substitute $c = -4$:** $5 - |(-4) + 1|$",
        "**Step 2: Simplify inside absolute value:** $-4 + 1 = -3 \\implies 5 - |-3|$",
        "**Step 3: Evaluate absolute value:** $|-3| = 3 \\implies 5 - 3$",
        "**Step 4: Subtract:** $5 - 3 = 2$."
      ]
    },
    "options": [
      "2",
      "4",
      "-2",
      "0"
    ],
    "correctIndex": 0
  },
  {
    "id": "EVAL-04",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "eval",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Evaluating Expressions",
    "source": "2.5 Skills Practice (#4)",
    "equation": "|a + b| - c",
    "prompt": "Evaluate the expression if $a = 2, b = -3$, and $c = -4$.",
    "solutionSet": "5",
    "numberLine": [
      5
    ],
    "digDeeper": {
      "rule": "Watch your double negatives! Subtracting a negative number becomes addition: $- (-4) = +4$.",
      "steps": [
        "**Step 1: Substitute values:** $|(2) + (-3)| - (-4)$",
        "**Step 2: Simplify inside bars:** $2 + (-3) = -1 \\implies |-1| - (-4)$",
        "**Step 3: Absolute value:** $|-1| = 1 \\implies 1 - (-4)$",
        "**Step 4: Subtract negative:** $1 + 4 = 5$."
      ]
    },
    "options": [
      "5",
      "7",
      "-5",
      "3"
    ],
    "correctIndex": 0
  },
  {
    "id": "EVAL-05",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "eval",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Evaluating Expressions",
    "source": "2.5 Practice (#1)",
    "equation": "16 - |2z + 1|",
    "prompt": "Evaluate the expression if $x = -1, y = 3$, and $z = -4$.",
    "solutionSet": "9",
    "numberLine": [
      9
    ],
    "digDeeper": {
      "rule": "Follow order of operations: multiplication inside the bars comes before addition inside the bars.",
      "steps": [
        "**Step 1: Substitute $z = -4$:** $16 - |2(-4) + 1|$",
        "**Step 2: Multiply inside bars:** $2(-4) = -8 \\implies 16 - |-8 + 1|$",
        "**Step 3: Add inside bars:** $-8 + 1 = -7 \\implies 16 - |-7|$",
        "**Step 4: Absolute value & subtract:** $16 - 7 = 9$."
      ]
    },
    "options": [
      "9",
      "11",
      "-9",
      "7"
    ],
    "correctIndex": 0
  },
  {
    "id": "EVAL-06",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "eval",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Evaluating Expressions",
    "source": "2.5 Practice (#2)",
    "equation": "|x - y| + 4",
    "prompt": "Evaluate the expression if $x = -1, y = 3$, and $z = -4$.",
    "solutionSet": "8",
    "numberLine": [
      8
    ],
    "digDeeper": {
      "rule": "Substitute $x = -1$ and $y = 3$. Calculate $-1 - 3 = -4$.",
      "steps": [
        "**Step 1: Substitute values:** $|(-1) - 3| + 4$",
        "**Step 2: Subtract inside bars:** $-1 - 3 = -4 \\implies |-4| + 4$",
        "**Step 3: Absolute value:** $|-4| = 4 \\implies 4 + 4$",
        "**Step 4: Add:** $4 + 4 = 8$."
      ]
    },
    "options": [
      "8",
      "10",
      "-8",
      "6"
    ],
    "correctIndex": 0
  },
  {
    "id": "EVAL-07",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "eval",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Evaluating Expressions",
    "source": "2.5 Practice (#3)",
    "equation": "|-3y + z| - x",
    "prompt": "Evaluate the expression if $x = -1, y = 3$, and $z = -4$.",
    "solutionSet": "14",
    "numberLine": [
      14
    ],
    "digDeeper": {
      "rule": "Substitute all three variables carefully and beware of signs.",
      "steps": [
        "**Step 1: Substitute:** $|-3(3) + (-4)| - (-1)$",
        "**Step 2: Simplify inside bars:** $-9 + (-4) = -13 \\implies |-13| - (-1)$",
        "**Step 3: Absolute value:** $|-13| = 13 \\implies 13 - (-1)$",
        "**Step 4: Subtract negative:** $13 + 1 = 14$."
      ]
    },
    "options": [
      "14",
      "16",
      "-14",
      "12"
    ],
    "correctIndex": 0
  },
  {
    "id": "EVAL-08",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "eval",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Evaluating Expressions",
    "source": "2.5 Practice (#4)",
    "equation": "3|z - x| + |2 - y|",
    "prompt": "Evaluate the expression if $x = -1, y = 3$, and $z = -4$.",
    "solutionSet": "10",
    "numberLine": [
      10
    ],
    "digDeeper": {
      "rule": "Evaluate each absolute value expression independently before multiplying and adding.",
      "steps": [
        "**Step 1: Substitute:** $3|(-4) - (-1)| + |2 - 3|$",
        "**Step 2: Simplify inside both bars:**<br>• $-4 - (-1) = -4 + 1 = -3$<br>• $2 - 3 = -1$<br>$\\implies 3|-3| + |-1|$",
        "**Step 3: Evaluate absolute values:** $3(3) + 1$",
        "**Step 4: Multiply and add:** $9 + 1 = 10$."
      ]
    },
    "options": [
      "10",
      "12",
      "-10",
      "8"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-01",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Single-Step Addition Inside",
    "source": "2.5 Skills Practice (#5)",
    "equation": "|w + 1| = 5",
    "prompt": "Solve the equation for $w$. Graph the solution set.",
    "solutionSet": "{-6, 4}",
    "numberLine": [
      -6,
      4
    ],
    "digDeeper": {
      "rule": "The absolute value is already isolated. Split directly into two cases: $w + 1 = 5$ and $w + 1 = -5$.",
      "steps": [
        "**Step 1: Split into 2 cases:**<br>• Case 1: $w + 1 = 5$<br>• Case 2: $w + 1 = -5$",
        "**Step 2: Solve each case:**<br>• Case 1: $w = 5 - 1 = 4$<br>• Case 2: $w = -5 - 1 = -6$",
        "**Step 3: Solution Set:** $\\{-6, 4\\}$."
      ]
    },
    "options": [
      "{-6, 4}",
      "{-4, 6}",
      "{-8, 6}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-02",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Single-Step Subtraction Inside",
    "source": "2.5 Skills Practice (#6)",
    "equation": "|c - 3| = 1",
    "prompt": "Solve the equation for $c$. Graph the solution set.",
    "solutionSet": "{2, 4}",
    "numberLine": [
      2,
      4
    ],
    "digDeeper": {
      "rule": "Split into two cases: $c - 3 = 1$ and $c - 3 = -1$.",
      "steps": [
        "**Step 1: Split into 2 cases:**<br>• Case 1: $c - 3 = 1$<br>• Case 2: $c - 3 = -1$",
        "**Step 2: Solve each case:**<br>• Case 1: $c = 1 + 3 = 4$<br>• Case 2: $c = -1 + 3 = 2$",
        "**Step 3: Solution Set:** $\\{2, 4\\}$."
      ]
    },
    "options": [
      "{2, 4}",
      "{-4, -2}",
      "{0, 6}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-03",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Single-Step Addition Inside",
    "source": "2.5 Skills Practice (#7)",
    "equation": "|n + 2| = 1",
    "prompt": "Solve the equation for $n$. Graph the solution set.",
    "solutionSet": "{-3, -1}",
    "numberLine": [
      -3,
      -1
    ],
    "digDeeper": {
      "rule": "Split into two cases: $n + 2 = 1$ and $n + 2 = -1$.",
      "steps": [
        "**Step 1: Split into 2 cases:**<br>• Case 1: $n + 2 = 1$<br>• Case 2: $n + 2 = -1$",
        "**Step 2: Solve each case:**<br>• Case 1: $n = 1 - 2 = -1$<br>• Case 2: $n = -1 - 2 = -3$",
        "**Step 3: Solution Set:** $\\{-3, -1\\}$."
      ]
    },
    "options": [
      "{-3, -1}",
      "{1, 3}",
      "{-5, 1}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-04",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Single-Step Addition Inside",
    "source": "2.5 Skills Practice (#8)",
    "equation": "|t + 6| = 4",
    "prompt": "Solve the equation for $t$. Graph the solution set.",
    "solutionSet": "{-10, -2}",
    "numberLine": [
      -10,
      -2
    ],
    "digDeeper": {
      "rule": "Split into two cases: $t + 6 = 4$ and $t + 6 = -4$.",
      "steps": [
        "**Step 1: Split into 2 cases:**<br>• Case 1: $t + 6 = 4$<br>• Case 2: $t + 6 = -4$",
        "**Step 2: Solve each case:**<br>• Case 1: $t = 4 - 6 = -2$<br>• Case 2: $t = -4 - 6 = -10$",
        "**Step 3: Solution Set:** $\\{-10, -2\\}$."
      ]
    },
    "options": [
      "{-10, -2}",
      "{2, 10}",
      "{-12, 0}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-05",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Single-Step Subtraction Inside",
    "source": "2.5 Skills Practice (#9)",
    "equation": "|w - 2| = 2",
    "prompt": "Solve the equation for $w$. Graph the solution set.",
    "solutionSet": "{0, 4}",
    "numberLine": [
      0,
      4
    ],
    "digDeeper": {
      "rule": "Split into two cases: $w - 2 = 2$ and $w - 2 = -2$.",
      "steps": [
        "**Step 1: Split into 2 cases:**<br>• Case 1: $w - 2 = 2$<br>• Case 2: $w - 2 = -2$",
        "**Step 2: Solve each case:**<br>• Case 1: $w = 2 + 2 = 4$<br>• Case 2: $w = -2 + 2 = 0$",
        "**Step 3: Solution Set:** $\\{0, 4\\}$."
      ]
    },
    "options": [
      "{0, 4}",
      "{-4, 0}",
      "{-2, 6}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-06",
    "level": 1,
    "levelName": "Level 1: Foundational",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Single-Step Subtraction Inside",
    "source": "2.5 Skills Practice (#10)",
    "equation": "|k - 5| = 4",
    "prompt": "Solve the equation for $k$. Graph the solution set.",
    "solutionSet": "{1, 9}",
    "numberLine": [
      1,
      9
    ],
    "digDeeper": {
      "rule": "Split into two cases: $k - 5 = 4$ and $k - 5 = -4$.",
      "steps": [
        "**Step 1: Split into 2 cases:**<br>• Case 1: $k - 5 = 4$<br>• Case 2: $k - 5 = -4$",
        "**Step 2: Solve each case:**<br>• Case 1: $k = 4 + 5 = 9$<br>• Case 2: $k = -4 + 5 = 1$",
        "**Step 3: Solution Set:** $\\{1, 9\\}$."
      ]
    },
    "options": [
      "{1, 9}",
      "{-9, -1}",
      "{-1, 11}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-07",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Zero Product Property",
    "source": "2.5 Practice (#5)",
    "equation": "-9|-z + 5| = 0",
    "prompt": "Solve the equation for $z$. Graph the solution set.",
    "solutionSet": "{5}",
    "numberLine": [
      5
    ],
    "digDeeper": {
      "rule": "Divide both sides by -9 first. When an absolute value equals 0, there is only ONE case, because $+0 = -0 = 0$.",
      "steps": [
        "**Step 1: Divide by -9:** $|-z + 5| = \\frac{0}{-9} = 0$.",
        "**Step 2: Single case:** $-z + 5 = 0$",
        "**Step 3: Solve:** $-z = -5 \\implies z = 5$.",
        "**Step 4: Solution Set:** $\\{5\\}$ (exactly one point on the number line)."
      ]
    },
    "options": [
      "{5}",
      "{-5}",
      "{8}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-08",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Negative Multiplier & Addition Outside",
    "source": "2.5 Practice (#6)",
    "equation": "-|7 - 2r| + 11 = -8",
    "prompt": "Solve the equation for $r$. Graph the solution set.",
    "solutionSet": "{-6, 13}",
    "numberLine": [
      -6,
      13
    ],
    "digDeeper": {
      "rule": "Isolate the absolute value expression before creating cases! Subtract 11 first, then divide by -1.",
      "steps": [
        "**Step 1: Subtract 11:** $-|7 - 2r| = -8 - 11 = -19$.",
        "**Step 2: Divide by -1:** $|7 - 2r| = 19$. (Notice the RHS is positive, so there are two real solutions!)",
        "**Step 3: 2 Cases:**<br>• Case 1: $7 - 2r = 19 \\implies -2r = 12 \\implies r = -6$<br>• Case 2: $7 - 2r = -19 \\implies -2r = -26 \\implies r = 13$",
        "**Step 4: Solution Set:** $\\{-6, 13\\}$."
      ]
    },
    "options": [
      "{-6, 13}",
      "{-13, 6}",
      "{-8, 15}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-09",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Coefficient Outside & Subtraction",
    "source": "2.5 Practice (#7)",
    "equation": "13|-2t + 1| - 10 = 159",
    "prompt": "Solve the equation for $t$. Graph the solution set.",
    "solutionSet": "{-6, 7}",
    "numberLine": [
      -6,
      7
    ],
    "digDeeper": {
      "rule": "Isolate the bars: add 10 to both sides, then divide by 13.",
      "steps": [
        "**Step 1: Add 10:** $13|-2t + 1| = 159 + 10 = 169$.",
        "**Step 2: Divide by 13:** $|-2t + 1| = \\frac{169}{13} = 13$.",
        "**Step 3: 2 Cases:**<br>• Case 1: $-2t + 1 = 13 \\implies -2t = 12 \\implies t = -6$<br>• Case 2: $-2t + 1 = -13 \\implies -2t = -14 \\implies t = 7$",
        "**Step 4: Solution Set:** $\\{-6, 7\\}$."
      ]
    },
    "options": [
      "{-6, 7}",
      "{-7, 6}",
      "{-8, 9}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "SOLVE-10",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "solve",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Multi-Step Isolation",
    "source": "2.5 Practice (#8)",
    "equation": "4|g - 9| + 7 = 67",
    "prompt": "Solve the equation for $g$. Graph the solution set.",
    "solutionSet": "{-6, 24}",
    "numberLine": [
      -6,
      24
    ],
    "digDeeper": {
      "rule": "Subtract 7 from both sides, then divide by 4 before splitting.",
      "steps": [
        "**Step 1: Subtract 7:** $4|g - 9| = 67 - 7 = 60$.",
        "**Step 2: Divide by 4:** $|g - 9| = 15$.",
        "**Step 3: 2 Cases:**<br>• Case 1: $g - 9 = 15 \\implies g = 24$<br>• Case 2: $g - 9 = -15 \\implies g = -6$",
        "**Step 4: Solution Set:** $\\{-6, 24\\}$."
      ]
    },
    "options": [
      "{-6, 24}",
      "{-24, 6}",
      "{-8, 26}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "GRAPH-01",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "write_equation",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Writing Equations from Graphs",
    "source": "2.5 Writing Equations (#1)",
    "equation": "|x| = 1",
    "prompt": "Write an absolute value equation for the graph shown below. Use the formula: $|x - \\text{midpoint}| = \\text{distance}$.",
    "targetEquation": "|x| = 1",
    "graphPoints": [
      -1,
      1
    ],
    "midpoint": 0,
    "distance": 1,
    "solutionSet": "{-1, 1}",
    "numberLine": [
      -1,
      1
    ],
    "digDeeper": {
      "rule": "The standard absolute value equation for a number line graph is $|x - \\text{midpoint}| = \\text{distance}$.",
      "steps": [
        "**Step 1: Find the endpoints from the graph:** The points with dots are $-1$ and $1$.",
        "**Step 2: Find the midpoint:** $\\text{midpoint} = \\frac{-1 + 1}{2} = 0$.",
        "**Step 3: Find the distance:** The distance from 0 to either point is $|1 - 0| = 1$.",
        "**Step 4: Write equation:** $|x - 0| = 1$, which simplifies to $|x| = 1$."
      ]
    },
    "options": [
      "|x| = 1",
      "|x| = 3",
      "|x + 1| = 1",
      "|x - 1| = 1"
    ],
    "correctIndex": 0
  },
  {
    "id": "GRAPH-02",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "write_equation",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Writing Equations from Graphs",
    "source": "2.5 Writing Equations (#2)",
    "equation": "|x + 3| = 2",
    "prompt": "Write an absolute value equation for the graph shown below. Use the formula: $|x - \\text{midpoint}| = \\text{distance}$.",
    "targetEquation": "|x + 3| = 2",
    "graphPoints": [
      -5,
      -1
    ],
    "midpoint": -3,
    "distance": 2,
    "solutionSet": "{-5, -1}",
    "numberLine": [
      -5,
      -1
    ],
    "digDeeper": {
      "rule": "When the midpoint is negative, $x - (-\\text{midpoint})$ becomes $x + |\\text{midpoint}|$.",
      "steps": [
        "**Step 1: Identify endpoints:** The dots are at $-5$ and $-1$.",
        "**Step 2: Calculate midpoint:** $\\text{midpoint} = \\frac{-5 + (-1)}{2} = \\frac{-6}{2} = -3$.",
        "**Step 3: Calculate distance:** Distance from $-3$ to $-1$ is $|-1 - (-3)| = 2$.",
        "**Step 4: Write equation:** $|x - (-3)| = 2 \\implies |x + 3| = 2$."
      ]
    },
    "options": [
      "|x + 3| = 2",
      "|x| = 4",
      "|x + -2| = 2",
      "|x - 2| = 4"
    ],
    "correctIndex": 0
  },
  {
    "id": "GRAPH-03",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "write_equation",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Writing Equations from Graphs",
    "source": "2.5 Writing Equations (#3)",
    "equation": "|x - 4| = 1",
    "prompt": "Write an absolute value equation for the graph shown below. Use the formula: $|x - \\text{midpoint}| = \\text{distance}$.",
    "targetEquation": "|x - 4| = 1",
    "graphPoints": [
      3,
      5
    ],
    "midpoint": 4,
    "distance": 1,
    "solutionSet": "{3, 5}",
    "numberLine": [
      3,
      5
    ],
    "digDeeper": {
      "rule": "Calculate the average of the two endpoints to find the midpoint, and find the distance to either endpoint.",
      "steps": [
        "**Step 1: Identify endpoints:** The dots are at $3$ and $5$.",
        "**Step 2: Calculate midpoint:** $\\text{midpoint} = \\frac{3 + 5}{2} = 4$.",
        "**Step 3: Calculate distance:** Distance from $4$ to $5$ is $5 - 4 = 1$.",
        "**Step 4: Write equation:** $|x - 4| = 1$."
      ]
    },
    "options": [
      "|x - 4| = 1",
      "|x| = 3",
      "|x + 5| = 1",
      "|x - 1| = 5"
    ],
    "correctIndex": 0
  },
  {
    "id": "GRAPH-04",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "write_equation",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Writing Equations from Graphs",
    "source": "2.5 Writing Equations (#4)",
    "equation": "|x| = 4",
    "prompt": "Write an absolute value equation for the graph shown below. Use the formula: $|x - \\text{midpoint}| = \\text{distance}$.",
    "targetEquation": "|x| = 4",
    "graphPoints": [
      -4,
      4
    ],
    "midpoint": 0,
    "distance": 4,
    "solutionSet": "{-4, 4}",
    "numberLine": [
      -4,
      4
    ],
    "digDeeper": {
      "rule": "Symmetric endpoints around zero always yield an equation of the form $|x| = d$.",
      "steps": [
        "**Step 1: Identify endpoints:** The dots are at $-4$ and $4$.",
        "**Step 2: Calculate midpoint:** $\\text{midpoint} = \\frac{-4 + 4}{2} = 0$.",
        "**Step 3: Calculate distance:** Distance from $0$ to $4$ is $4$.",
        "**Step 4: Write equation:** $|x - 0| = 4 \\implies |x| = 4$."
      ]
    },
    "options": [
      "|x| = 4",
      "|x| = 6",
      "|x + 1| = 4",
      "|x - 4| = 1"
    ],
    "correctIndex": 0
  },
  {
    "id": "GRAPH-05",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "write_equation",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Writing Equations from Graphs",
    "source": "2.5 Writing Equations (#5)",
    "equation": "|x - 6| = 5",
    "prompt": "Write an absolute value equation for the graph shown below. Use the formula: $|x - \\text{midpoint}| = \\text{distance}$.",
    "targetEquation": "|x - 6| = 5",
    "graphPoints": [
      1,
      11
    ],
    "midpoint": 6,
    "distance": 5,
    "solutionSet": "{1, 11}",
    "numberLine": [
      1,
      11
    ],
    "digDeeper": {
      "rule": "Find the midpoint: $\\frac{1 + 11}{2} = 6$. The distance from 6 to 11 is 5.",
      "steps": [
        "**Step 1: Identify endpoints:** The dots are at $1$ and $11$.",
        "**Step 2: Midpoint:** $\\frac{1 + 11}{2} = \\frac{12}{2} = 6$.",
        "**Step 3: Distance:** $11 - 6 = 5$.",
        "**Step 4: Equation:** $|x - 6| = 5$."
      ]
    },
    "options": [
      "|x - 6| = 5",
      "|x| = 7",
      "|x + 7| = 5",
      "|x - 5| = 7"
    ],
    "correctIndex": 0
  },
  {
    "id": "GRAPH-06",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "write_equation",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Writing Equations from Graphs",
    "source": "2.5 Writing Equations (#6)",
    "equation": "|x + 4| = 2",
    "prompt": "Write an absolute value equation for the graph shown below. Use the formula: $|x - \\text{midpoint}| = \\text{distance}$.",
    "targetEquation": "|x + 4| = 2",
    "graphPoints": [
      -6,
      -2
    ],
    "midpoint": -4,
    "distance": 2,
    "solutionSet": "{-6, -2}",
    "numberLine": [
      -6,
      -2
    ],
    "digDeeper": {
      "rule": "Midpoint of $-6$ and $-2$ is $-4$. Distance is 2.",
      "steps": [
        "**Step 1: Identify endpoints:** The dots are at $-6$ and $-2$.",
        "**Step 2: Midpoint:** $\\frac{-6 + (-2)}{2} = -4$.",
        "**Step 3: Distance:** $|-2 - (-4)| = 2$.",
        "**Step 4: Equation:** $|x - (-4)| = 2 \\implies |x + 4| = 2$."
      ]
    },
    "options": [
      "|x + 4| = 2",
      "|x| = 4",
      "|x + -3| = 2",
      "|x - 2| = 5"
    ],
    "correctIndex": 0
  },
  {
    "id": "GRAPH-07",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "write_equation",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Writing Equations from Graphs",
    "source": "2.5 Writing Equations (#7)",
    "equation": "|x + 3| = 4",
    "prompt": "Write an absolute value equation for the graph shown below. Use the formula: $|x - \\text{midpoint}| = \\text{distance}$.",
    "targetEquation": "|x + 3| = 4",
    "graphPoints": [
      -7,
      1
    ],
    "midpoint": -3,
    "distance": 4,
    "solutionSet": "{-7, 1}",
    "numberLine": [
      -7,
      1
    ],
    "digDeeper": {
      "rule": "Midpoint of $-7$ and $1$ is $-3$. Distance is 4.",
      "steps": [
        "**Step 1: Identify endpoints:** The dots are at $-7$ and $1$.",
        "**Step 2: Midpoint:** $\\frac{-7 + 1}{2} = -3$.",
        "**Step 3: Distance:** $|1 - (-3)| = 4$.",
        "**Step 4: Equation:** $|x - (-3)| = 4 \\implies |x + 3| = 4$."
      ]
    },
    "options": [
      "|x + 3| = 4",
      "|x| = 6",
      "|x + -2| = 4",
      "|x - 4| = 4"
    ],
    "correctIndex": 0
  },
  {
    "id": "GRAPH-08",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "write_equation",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Writing Equations from Graphs",
    "source": "2.5 Writing Equations (#8)",
    "equation": "|x - 2| = 4",
    "prompt": "Write an absolute value equation for the graph shown below. Use the formula: $|x - \\text{midpoint}| = \\text{distance}$.",
    "targetEquation": "|x - 2| = 4",
    "graphPoints": [
      -2,
      6
    ],
    "midpoint": 2,
    "distance": 4,
    "solutionSet": "{-2, 6}",
    "numberLine": [
      -2,
      6
    ],
    "digDeeper": {
      "rule": "Midpoint of $-2$ and $6$ is $2$. Distance is 4.",
      "steps": [
        "**Step 1: Identify endpoints:** The dots are at $-2$ and $6$.",
        "**Step 2: Midpoint:** $\\frac{-2 + 6}{2} = 2$.",
        "**Step 3: Distance:** $6 - 2 = 4$.",
        "**Step 4: Equation:** $|x - 2| = 4$."
      ]
    },
    "options": [
      "|x - 2| = 4",
      "|x| = 6",
      "|x + 3| = 4",
      "|x - 4| = 3"
    ],
    "correctIndex": 0
  },
  {
    "id": "WORD-01",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "word_problem",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Real-World Tolerance & Calories",
    "source": "2.5 Practice (#13)",
    "equation": "|c - 300| = 20",
    "prompt": "**FITNESS:** Taisha uses the elliptical cross-trainer at the gym. Her general goal is to burn 300 Calories per workout, but she varies by as much as 20 Calories from this amount on any given day. Write and solve an equation to find the maximum and minimum number of Calories Taisha burns.",
    "solutionSet": "{280, 320}",
    "numberLine": [
      280,
      320
    ],
    "digDeeper": {
      "rule": "In tolerance word problems, the formula is $|\\text{variable} - \\text{target}| = \\text{tolerance}$.",
      "steps": [
        "**Step 1: Identify target and tolerance:**<br>• Target (Midpoint): $300$ Calories<br>• Tolerance (Distance): $20$ Calories",
        "**Step 2: Write equation:** $|c - 300| = 20$",
        "**Step 3: Solve two cases:**<br>• Case 1: $c - 300 = 20 \\implies c = 320$<br>• Case 2: $c - 300 = -20 \\implies c = 280$",
        "**Step 4: Solution Set:** $\\{280, 320\\}$ (Minimum: 280 Calories, Maximum: 320 Calories)."
      ]
    },
    "options": [
      "{280, 320}",
      "{-320, -280}",
      "{278, 322}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "WORD-02",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "word_problem",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Real-World Tolerance & Temperature",
    "source": "2.5 Practice (#14)",
    "equation": "|t - 82| = 1.5",
    "prompt": "**TEMPERATURE:** A digital thermometer is guaranteed to give a temperature no more than $1.5^\\circ\\text{F}$ from the actual temperature. If the thermometer reads $82^\\circ\\text{F}$, write and solve an equation to find the maximum and minimum actual temperature.",
    "solutionSet": "{80.5, 83.5}",
    "numberLine": [
      80.5,
      83.5
    ],
    "digDeeper": {
      "rule": "Equation: $|t - \\text{reading}| = \\text{accuracy error}$.",
      "steps": [
        "**Step 1: Target and Tolerance:** Reading is $82^\\circ\\text{F}$, margin is $1.5^\\circ\\text{F}$.",
        "**Step 2: Write equation:** $|t - 82| = 1.5$",
        "**Step 3: Solve two cases:**<br>• Case 1: $t - 82 = 1.5 \\implies t = 83.5^\\circ\\text{F}$<br>• Case 2: $t - 82 = -1.5 \\implies t = 80.5^\\circ\\text{F}$",
        "**Step 4: Solution Set:** $\\{80.5, 83.5\\}$."
      ]
    },
    "options": [
      "{80.5, 83.5}",
      "{-83.5, -80.5}",
      "{78.5, 85.5}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "WORD-03",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "word_problem",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Real-World Tolerance & Calories",
    "source": "2.5 Writing Equations (#9)",
    "equation": "|c - 280| = 25",
    "prompt": "**FITNESS:** Tanisha uses the elliptical cross-trainer at the gym. Her general goal is to burn 280 calories per workout, but she varies by as much as 25 calories from this amount on any given day. Write and solve an equation to find the maximum and minimum number of calories Tanisha burns.",
    "solutionSet": "{255, 305}",
    "numberLine": [
      255,
      305
    ],
    "digDeeper": {
      "rule": "Target is 280, tolerance is 25. Equation is $|c - 280| = 25$.",
      "steps": [
        "**Step 1: Target and Tolerance:** Goal = 280 cal, variation = 25 cal.",
        "**Step 2: Equation:** $|c - 280| = 25$",
        "**Step 3: Solve:**<br>• $c - 280 = 25 \\implies c = 305$<br>• $c - 280 = -25 \\implies c = 255$",
        "**Step 4: Solution Set:** $\\{255, 305\\}$ (Min: 255 cal, Max: 305 cal)."
      ]
    },
    "options": [
      "{255, 305}",
      "{-305, -255}",
      "{253, 307}",
      "emptyset"
    ],
    "correctIndex": 0
  },
  {
    "id": "WORD-04",
    "level": 2,
    "levelName": "Level 2: Multi-Step & Traps",
    "type": "word_problem",
    "topic": "2.5 Absolute Value Equations",
    "subtopic": "Real-World Tolerance & Temperature",
    "source": "2.5 Writing Equations (#10)",
    "equation": "|t - 28| = 2",
    "prompt": "**TEMPERATURE:** A thermometer is guaranteed to give a temperature no more than $2^\\circ\\text{F}$ from the actual temperature. If the thermometer reads $28^\\circ\\text{F}$, write and solve an equation to find the maximum and minimum temperature it could be.",
    "solutionSet": "{26, 30}",
    "numberLine": [
      26,
      30
    ],
    "digDeeper": {
      "rule": "Reading is 28, margin of error is 2. Equation is $|t - 28| = 2$.",
      "steps": [
        "**Step 1: Reading and Margin:** Reading = $28^\\circ\\text{F}$, error = $2^\\circ\\text{F}$.",
        "**Step 2: Equation:** $|t - 28| = 2$",
        "**Step 3: Solve:**<br>• $t - 28 = 2 \\implies t = 30^\\circ\\text{F}$<br>• $t - 28 = -2 \\implies t = 26^\\circ\\text{F}$",
        "**Step 4: Solution Set:** $\\{26, 30\\}$."
      ]
    },
    "options": [
      "{26, 30}",
      "{-30, -26}",
      "{24, 32}",
      "emptyset"
    ],
    "correctIndex": 0
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_BANK };
}

export { QUESTION_BANK };
export default QUESTION_BANK;
