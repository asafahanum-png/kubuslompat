const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let gameOver = false;

const player = {
    x: 50,
    y: 150,
    size: 30,
    gravity: 0.6,
    velocity: 0,
    jumpStrength: -10,
    isJumping: false
};

const obstacle = {
    x: 600,
    y: 150,
    size: 30,
    speed: 5
};

window.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
        if (gameOver) {
            resetGame();
        } else if (!player.isJumping) {
            player.velocity = player.jumpStrength;
            player.isJumping = true;
        }
    }
});

function resetGame() {
    score = 0;
    gameOver = false;
    obstacle.x = 600;
    obstacle.speed = 5;
    player.y = 150;
    player.velocity = 0;
    player.isJumping = false;
    loop();
}

function loop() {
    if (gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 210, 100);
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("Tekan SPASI untuk main lagi", 205, 130);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.velocity += player.gravity;
    player.y += player.velocity;

    if (player.y >= 150) {
        player.y = 150;
        player.velocity = 0;
        player.isJumping = false;
    }

    obstacle.x -= obstacle.speed;
    if (obstacle.x < -obstacle.size) {
        obstacle.x = 600;
        score++;
        obstacle.speed += 0.5;
    }

    if (
        player.x < obstacle.x + obstacle.size &&
        player.x + player.size > obstacle.x &&
        player.y < obstacle.y + obstacle.size &&
        player.y + player.size > obstacle.y
    ) {
        gameOver = true;
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 180, canvas.width, 2);

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.size, obstacle.size);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Skor: " + score, 20, 30);

    requestAnimationFrame(loop);
}

loop();
