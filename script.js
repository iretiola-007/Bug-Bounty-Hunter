const challenges = [
  {
    level: "Easy",
    prompt: `Fix this function to return the sum of two numbers:

function add(a, b) {
  return a - b;
}`,
    functionName: "add",
    tests: [
      { args: [2, 3], expected: 5 },
      { args: [10, 5], expected: 15 }
    ]
  },
  {
    level: "Easy",
    prompt: `Fix this function to return true if number is even:

function isEven(n) {
  return n % 2 === 1;
}`,
    functionName: "isEven",
    tests: [
      { args: [2], expected: true },
      { args: [3], expected: false }
    ]
  },
  {
    level: "Medium",
    prompt: `Fix this loop to print numbers 1 to 5:

function printNumbers() {
  for (let i = 1; i < 5; i++) {
    console.log(i);
  }
}`,
    functionName: "printNumbers",
    tests: [
      { args: [], expected: undefined } // just check no crash
    ]
  }
];

let current = 0;
let reputation = parseInt(localStorage.getItem("reputation")) || 0;
let streak = 0;
let timeLeft = 120;
let timerInterval;
let failCount = 0;

const challengeText = document.getElementById("challenge-text");
const codeInput = document.getElementById("code-input");
const submitBtn = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");

scoreDisplay.textContent = reputation;

function startTimer() {
  timeLeft = 120;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.title = `⏳ ${timeLeft}s - Bug Bounty Hunter`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      feedback.textContent = "⏰ Time’s up! Moving to next bug...";
      streak = 0;
      setTimeout(nextChallenge, 1500);
    }
  }, 1000);
}

function loadChallenge() {
  clearInterval(timerInterval);

  current = Math.floor(Math.random() * challenges.length);
  failCount = 0;

  challengeText.textContent =
    `[${challenges[current].level}] ` + challenges[current].prompt;

  codeInput.value = "";
  feedback.textContent = "";
  document.title = "🐞 Bug Bounty Hunter";

  startTimer();
}

function nextChallenge() {
  loadChallenge();
}

function showSolution() {
  codeInput.value = challenges[current].prompt.split("Fix")[1]
    ? challenges[current].prompt
    : "Solution unavailable";
}

submitBtn.addEventListener("click", () => {
  const userCode = codeInput.value;

  try {
    const userFunction = new Function(`
      ${userCode}
      return ${challenges[current].functionName};
    `)();

    let passed = true;

    for (let test of challenges[current].tests) {
      const result = userFunction(...test.args);

      if (result !== test.expected) {
        passed = false;
        break;
      }
    }

    if (passed) {
      reputation += 10;
      streak++;
      localStorage.setItem("reputation", reputation);
      scoreDisplay.textContent = reputation;

      feedback.textContent =
        `✅ Bug fixed! +10 Reputation 🔥 Streak: ${streak}`;

      clearInterval(timerInterval);
      setTimeout(nextChallenge, 1500);

    } else {
      failAttempt();
    }

  } catch (error) {
    console.error(error); // developer sees real error
    failAttempt();
  }
});

function failAttempt() {
  failCount++;
  streak = 0;

  if (failCount >= 3) {
    feedback.innerHTML =
      `🐞 Bug not fixed yet... <br><button onclick="revealSolution()">View Solution</button>`;
  } else {
    feedback.textContent = "🐞 Bug not fixed yet... Try again!";
  }
}

function revealSolution() {
  feedback.textContent = "💡 Here's one possible fix:";
  codeInput.value = `// Try reviewing your logic carefully 👀`;
}

loadChallenge();
      streak = 0;
      nextChallenge();
    }
  }, 1000);
}

function loadChallenge() {
  clearInterval(timerInterval);

  if (challenges.length === 0) return;

  current = Math.floor(Math.random() * challenges.length);

  challengeText.textContent =
    `[${challenges[current].level}] ` + challenges[current].prompt;

  codeInput.value = "";
  feedback.textContent = "";
  startTimer();
}

function nextChallenge() {
  loadChallenge();
}

submitBtn.addEventListener("click", () => {
  const userCode = codeInput.value;

  try {
    const userFunction = new Function(`
      ${userCode}
      return ${challenges[current].functionName};
    `)();

    let passed = true;

    challenges[current].tests.forEach(test => {
      const result = userFunction(...test.args);
      if (result !== test.expected) {
        passed = false;
      }
    });

    if (passed) {
      reputation += 10;
      streak++;
      localStorage.setItem("reputation", reputation);
      scoreDisplay.textContent = reputation;
      feedback.textContent = `✅ All tests passed! 🔥 Streak: ${streak}`;
      nextChallenge();
    } else {
      feedback.textContent = "❌ Tests failed. Debug again!";
      streak = 0;
    }

  } catch (error) {
    feedback.textContent = "⚠️ Error: " + error.message;
    streak = 0;
  }
});

loadChallenge();


function resetReputation() {
  reputation = 0;
  localStorage.removeItem("reputation");
  scoreDisplay.textContent = reputation;
}


