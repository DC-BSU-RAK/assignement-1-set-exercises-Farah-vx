// Variables
let correctColor; // stores the correct color to guess
let lives = 3;     // total lives
let score = 0;     // initial score

// DOM Elements
const rgbDisplay = document.getElementById('rgbDisplay');   // where the RGB value is shown
const colorOptions = document.getElementById('colorOptions'); // container for the color choices
const resultMessage = document.getElementById('resultMessage'); // shows result (correct/wrong)
const scoreEl = document.getElementById('score'); // shows current score
const livesEl = document.getElementById('lives'); // shows remaining lives
const restartBtn = document.getElementById('restartBtn'); // restart game button

// Utility Function to Generate a random RGB color string
function randomColor() {
  const r = Math.floor(Math.random() * 256); // red value from 0–255
  const g = Math.floor(Math.random() * 256); // green value from 0–255
  const b = Math.floor(Math.random() * 256); // blue value from 0–255
  return `rgb(${r}, ${g}, ${b})`; // return the rgb format
}

// Start or Reset the Game
function initGame() {
  resultMessage.textContent = '';  // clear result message
  restartBtn.style.display = 'none'; // hide restart button
  colorOptions.innerHTML = ''; // clear previous color boxes

  correctColor = randomColor();// pick a new correct color
  rgbDisplay.textContent = correctColor; // display it to the user

  const colors = [correctColor]; // array to hold 3 total color options

  // Generate 2 other random (wrong) color options
  while (colors.length < 3) {
    const newColor = randomColor();
    if (!colors.includes(newColor)) colors.push(newColor);// avoid duplicates
  }

  // Shuffle the array so correct color isn't always first
  colors.sort(() => Math.random() - 0.5);

  // Create and show color boxes
  colors.forEach(color => {
    const div = document.createElement('div'); // make a new box
    div.className = 'color-box'; // add a class for styling
    div.style.backgroundColor = color;// set its color
    div.onclick = () => checkAnswer(color);// check answer when clicked
    colorOptions.appendChild(div);// add to the page
  });
}

// Check if selected color is the correct one
function checkAnswer(selectedColor) {
  if (selectedColor === correctColor) {
    // Correct guess
    resultMessage.textContent = '🎉 Correct!';
    score++;
    scoreEl.textContent = `Score: ${score}`;
    initGame(); // load new round
  } else {
    // Wrong guess
    lives--;
    resultMessage.textContent = '❌ Wrong! Try again.';
    livesEl.textContent = `Lives: ${lives}`;
    if (lives <= 0) {
      endGame(); // game ends when no lives left
    }
  }
}

// Game Over logic
function endGame() {
  resultMessage.textContent = `Game Over! Final Score: ${score}`;
  restartBtn.style.display = 'inline-block'; // show restart button
  colorOptions.innerHTML = ''; // remove color options
}

// When Restart button is clicked
restartBtn.onclick = () => {
  lives = 3;
  score = 0;
  livesEl.textContent = `Lives: ${lives}`;
  scoreEl.textContent = `Score: ${score}`;
  initGame(); // restart game
};

// Run the game when the page loads
window.onload = initGame;
