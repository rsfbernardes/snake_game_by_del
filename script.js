let canvas = document.getElementById("crazy-snake-game");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let speed = 100; //velocidade do jogo
let game = setInterval(startGame, speed);
let points = 0;
let showScore = document.getElementById("score");
let showHighScore = document.getElementById("highScore");
let highestScore = 0;
let showRestart = document.getElementById("restart");
let end = document.getElementById("game-over");

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box-1, box-1);
    }
}

function createFood(){
        context.fillStyle = "red";
        context.fillRect(food.x, food.y, box, box);
}

function score(){
    showScore.innerHTML = `SCORE: ${points}`;
    showHighScore.innerHTML = `HIGHSCORE: ${highestScore}`;
}

function storeHighScore(){
    if (points > highestScore) {
        highestScore = points;
    }
}

function restart(){
    //document.location.reload();
    highestScore = getCookie('Player');
    score();
    snake.length = 0;
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
    end.style.cssText = 'display: none;';
}

function getCookie(x){
    highestScore = Cookies.get(x);
}

function setCookie(name, highestScore){
    Cookies.set(name,highestScore);
}

function theEnd() {
    end.innerHTML = `G4M3 0V3R!! YOUR SCORE IS ${points}`;
    setCookie('Player', highestScore);
}

document.addEventListener('keydown', update);

function update(event) {
    if(snake[0].x >= 0 && snake[0].x <= 15 * box && snake[0].y >= 0 && snake[0].y <= 15 * box) {
        if(event.keyCode == 37 && direction != "right") direction = "left";
        if(event.keyCode == 38 && direction != "down") direction = "up";
        if(event.keyCode == 39 && direction != "left") direction = "right";
        if(event.keyCode == 40 && direction != "up") direction = "down";
    }
}

function startGame() {
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;
    
    createBG();
    createSnake();
    createFood();
    score();
    storeHighScore();

    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            theEnd();
        }
    }
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        points++;
        
        for(i = 0; i < snake.length; i++){
            while (food.x == snake[i].x && food.y == snake[i].y) { // previne food wont be created on snake's body
                food.x = Math.floor(Math.random() * 15 + 1) * box;
                food.y = Math.floor(Math.random() * 15 + 1) * box;
            }
        }
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}