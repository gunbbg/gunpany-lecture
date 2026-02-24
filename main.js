/**
 * Lotto Number Generator Logic
 */

const ballsContainer = document.getElementById('balls-container');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');

// Theme Management
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

/**
 * Generates 6 unique random numbers between 1 and 45
 */
function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNum);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

/**
 * Returns a CSS class based on the number range
 */
function getBallClass(num) {
  if (num <= 10) return 'ball-range-1';
  if (num <= 20) return 'ball-range-2';
  if (num <= 30) return 'ball-range-3';
  if (num <= 40) return 'ball-range-4';
  return 'ball-range-5';
}

/**
 * Renders the lotto balls with a staggered animation
 */
async function renderBalls(numbers) {
  ballsContainer.innerHTML = '';
  
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    const ball = document.createElement('div');
    ball.className = `lotto-ball ${getBallClass(num)}`;
    ball.textContent = num;
    ball.style.animationDelay = `${i * 0.1}s`;
    ballsContainer.appendChild(ball);
  }
}

// Event Listeners
generateBtn.addEventListener('click', () => {
  const luckyNumbers = generateLottoNumbers();
  renderBalls(luckyNumbers);
});
