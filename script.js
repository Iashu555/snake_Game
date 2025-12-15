const bgm = document.getElementById("bgm");

let musicStarted = false;
document.addEventListener("keydown", () => {
    if (!musicStarted) {
        bgm.volume = 0.3;
        bgm.play().catch(error => {
            console.log("Audio play error:", error);
        });
        musicStarted = true;
    }
});

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // size of snake and food
let snake = [{x: 9*box, y: 10*box}];
let direction = null;
let score = 0;

let food = {
    x: Math.floor(Math.random()*20)*box,
    y: Math.floor(Math.random()*20)*box
};

// Game loop
function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // Draw snake
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = i===0 ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Move snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction === "LEFT") snakeX -= box;
    if(direction === "UP") snakeY -= box;
    if(direction === "RIGHT") snakeX += box;
    if(direction === "DOWN") snakeY += box;

    // Eat food
    if(snakeX === food.x && snakeY === food.y){
        score++;
        food = {
            x: Math.floor(Math.random()*20)*box,
            y: Math.floor(Math.random()*20)*box
        };
    } else {
        snake.pop();
    }

    // Add new head
    let newHead = {x: snakeX, y: snakeY};

    // Game over
    if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)){
        alert("Game Over! Score: "+score);
        snake = [{x: 9*box, y: 10*box}];
        direction = null;
        score = 0;
        food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
    }

    snake.unshift(newHead);

    document.getElementById('score').innerText = "Score: "+score;
}

function collision(head, array){
    for(let i=0;i<array.length;i++){
        if(head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

// Control
document.addEventListener("keydown", directionControl);

function directionControl(event){
    if(event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if(event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if(event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if(event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

let game = setInterval(draw, 100);


