const challenges = [
  {
    prompt: `Fix this function to return the sum of two numbers:\n\nfunction add(a, b) {\n  return a - b;\n}`,
    correct: `function add(a, b) {\n  return a + b;\n}`
  },
  {
    prompt: `Fix the loop to print numbers 1 to 5:\n\nfor (let i = 1; i < 5; i++) {\n  console.log(i);\n}`,
    correct: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`
  },
  {
  prompt: `Find and fix the bug in this code:\n\nconst city;\ncity = "Lagos";\nconsole.log(city);`, 
  correct: `const city = "Lagos";\nconsole.log(city);`
  }
];

let current = 0;
let score = parseInt(sessionStorage.getItem('bugBountyScore')) || 0;

const challengeText = document.getElementById('challenge-text');
const codeInput = document.getElementById('code-input');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');

function loadChallenge() {
  if (current < challenges.length) {
    challengeText.textContent = challenges[current].prompt;
    codeInput.value = '';
    feedback.textContent = '';
} else {
    challengeText.textContent = "🎉 You've completed all challenges!";
    codeInput.style.display = 'none';
    submitBtn.style.display = 'none';
}
}

submitBtn.addEventListener('click', () => {
  const userCode = codeInput.value.trim();
  const correctCode = challenges[current].correct.trim();

  if (userCode === correctCode) {
    score++;
    localStorage.setItem('bugBountyScore', score);
    scoreDisplay.textContent = score;
    feedback.textContent = "✅ Correct! Moving to next challenge...";
    current++;
    setTimeout(loadChallenge, 1500);
} else {
    feedback.textContent = "❌ Not quite. Try again!";
}
});

scoreDisplay.textContent = score;
loadChallenge();



