let canvas = document.getElementById("crazy-snake-game");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let speed = 50; //velocidade do jogo
let game = setInterval(startGame, speed);
let points = 0;
let showScore = document.getElementById("score");
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
}

function restart(){
    document.location.reload();
}

function directionTo(){
    var path = Math.floor(Math.random() * 10);
    if (direction == 'right'){
        switch(path) {
            case 0:
                direction = 'down';
                break;
            case 1:
                direction = 'up';
                break;
            case 2:
                direction = 'down';
                break;
            case 3:
                direction = 'right'
                break;
            case 4:
                direction = 'up';
                break;
            case 5:
                direction = 'down';
                break;
            case 6:
                direction = 'up';
                break;
            case 7:
                direction = 'up'
                break;
            case 8:
                direction = 'down';
                break;
            case 9:
                direction = 'right';
                break;
            default:
                direction = 'left'    
                break;
        }
    }
    else if (direction == 'left') {
        switch(path) {
            case 0:
                direction = 'down';
                break;
            case 1:
                direction = 'up';
                break;
            case 2:
                direction = 'down';
                break;
            case 3:
                direction = 'up'
                break;
            case 4:
                direction = 'left';
                break;
            case 5:
                direction = 'up';
                break;
            case 6:
                direction = 'down';
                break;
            case 7:
                direction = 'up'
                break;
            case 8:
                direction = 'down';
                break;
            case 9:
                direction = 'left';
                break;
            default:
                direction = 'right';
        }
    }
    else if (direction == 'up') {
        switch(path) {
            case 0:
                direction = 'left';
                break;
            case 1:
                direction = 'right';
                break;
            case 2:
                direction = 'right';
                break;
            case 3:
                direction = 'left'
                break;
            case 4:
                direction = 'up';
                break;
            case 5:
                direction = 'right';
                break;
            case 6:
                direction = 'left';
                break;
            case 7:
                direction = 'left'
                break;
            case 8:
                direction = 'right';
                break;
            case 9:
                direction = 'up';
                break;
            default:
                direction = 'down';
        }
    }
    else {
        switch(path) {
            case 0:
                direction = 'left';
                break;
            case 1:
                direction = 'right';
                break;
            case 2:
                direction = 'down';
                break;
            case 3:
                direction = 'left'
                break;
            case 4:
                direction = 'right';
                break;
            case 5:
                direction = 'down';
                break;
            case 6:
                direction = 'left';
                break;
            case 7:
                direction = 'right'
                break;
            case 8:
                direction = 'right';
                break;
            case 9:
                direction = 'left';
                break;
            default:
                direction = 'up';
        }
    }
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

    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            end.innerHTML = `G4M3 0V3R!! YOUR SCORE IS ${snake.length-1}`;
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
        directionTo();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}