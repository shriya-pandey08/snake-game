const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let box = 20;
let canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
canvas.width = canvasSize;
canvas.height = canvasSize;
box = canvasSize / 20;

let snake, food, direction, score, game;
const scoreElement = document.getElementById("score");

function startGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
  };
  direction = null;
  score = 0;
  scoreElement.innerHTML = "Score: 0";
  clearInterval(game);
  game = setInterval(draw, 100);
}

document.addEventListener("keydown", directionControl);

function directionControl(event) {
  if (event.keyCode == 37 && direction != "RIGHT") {
    direction = "LEFT";
  } else if (event.keyCode == 38 && direction != "DOWN") {
    direction = "UP";
  } else if (event.keyCode == 39 && direction != "LEFT") {
    direction = "RIGHT";
  } else if (event.keyCode == 40 && direction != "UP") {
    direction = "DOWN";
  }
}

function collision(newHead, snakeArray) {
  for (let i = 0; i < snakeArray.length; i++) {
    if (newHead.x == snakeArray[i].x && newHead.y == snakeArray[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "white";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "LEFT") snakeX -= box;
  if (direction == "UP") snakeY -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "DOWN") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    scoreElement.innerHTML = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Your score is " + score);
  }

  snake.unshift(newHead);

  if (score > 5) {
    clearInterval(game);
    game = setInterval(draw, 100 - (score * 5));
  }
}

window.addEventListener("resize", () => {
  canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  box = canvasSize / 20;
  startGame();
});

startGame();
