document.addEventListener('DOMContentLoaded', () => {
    const gameContent = document.querySelector('#game-content');
    const gameTitle = document.querySelector('#game-title');

    // Ekranda oyun seçme
    function showGameSelection() {
        document.getElementById("start-screen").classList.add("hidden");
        document.getElementById("game-container").classList.add("hidden");
        document.getElementById("game-selection").classList.remove("hidden");
    }

    function showStartScreen() {
        document.getElementById("game-selection").classList.add("hidden");
        document.getElementById("start-screen").classList.remove("hidden");
    }

    function startGame(game) {
        document.getElementById("game-selection").classList.add("hidden");
        document.getElementById("game-container").classList.remove("hidden");

        let title = "";
        let content = "";
        
        switch (game) {
            case "snake":
                title = "🐍 Yılan Oyunu";
                content = "Yılan oyunu başlatılıyor...";
                loadSnakeGame();
                break;
            case "xox":
                title = "❌⭕ XOX";
                content = "XOX oyunu başlatılıyor...";
                loadXOXGame();
                break;
            case "mines":
                title = "💣 Mines (Mayın Tarlası)";
                content = "Mayın tarlası oyunu başlatılıyor...";
                loadMinesGame();
                break;
        }
        
        gameTitle.innerText = title;
        gameContent.innerText = content;
    }

    function loadSnakeGame() {
        document.getElementById("snake-game").classList.remove("hidden");
        document.getElementById("mines-game").classList.add("hidden");
        document.getElementById("xox-game").classList.add("hidden");
        startSnake();
    }

    function loadMinesGame() {
        document.getElementById("mines-game").classList.remove("hidden");
        document.getElementById("snake-game").classList.add("hidden");
        document.getElementById("xox-game").classList.add("hidden");
        startMines();
    }

    function loadXOXGame() {
        document.getElementById("xox-game").classList.remove("hidden");
        document.getElementById("snake-game").classList.add("hidden");
        document.getElementById("mines-game").classList.add("hidden");
        startXOX();
    }

    // Yılan oyunu başlatma kodları
    function startSnake() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        let snake = [{x: 50, y: 50}];
        let direction = 'RIGHT';
        let food = {x: 100, y: 100};
        let score = 0;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'green';
            snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));

            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, 10, 10);

            ctx.fillStyle = 'white';
            ctx.fillText('Score: ' + score, 10, 10);
        }

        function update() {
            const head = Object.assign({}, snake[0]);

            switch (direction) {
                case 'UP': head.y -= 10; break;
                case 'DOWN': head.y += 10; break;
                case 'LEFT': head.x -= 10; break;
                case 'RIGHT': head.x += 10; break;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score++;
                food = {x: Math.random() * canvas.width, y: Math.random() * canvas.height};
            } else {
                snake.pop();
            }

            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
                alert('Oyun bitti');
                resetGame();
            }

            draw();
        }

        function collision(head) {
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === head.x && snake[i].y === head.y) {
                    return true;
                }
            }
            return false;
        }

        function changeDirection(event) {
            switch (event.keyCode) {
                case 37: direction = 'LEFT'; break;
                case 38: direction = 'UP'; break;
                case 39: direction = 'RIGHT'; break;
                case 40: direction = 'DOWN'; break;
            }
        }

        function resetGame() {
            snake = [{x: 50, y: 50}];
            score = 0;
        }

        document.addEventListener('keydown', changeDirection);
        setInterval(update, 100);
    }

    // XOX ve Mines oyunlarına daha fazla işlevsellik eklenebilir.
});
document.addEventListener('DOMContentLoaded', () => {
    const gameContent = document.querySelector('#game-content');
    const gameTitle = document.querySelector('#game-title');

    // Ekranda oyun seçme
    function showGameSelection() {
        document.getElementById("start-screen").classList.add("hidden");
        document.getElementById("game-container").classList.add("hidden");
        document.getElementById("game-selection").classList.remove("hidden");
    }

    function showStartScreen() {
        document.getElementById("game-selection").classList.add("hidden");
        document.getElementById("start-screen").classList.remove("hidden");
    }

    function startGame(game) {
        document.getElementById("game-selection").classList.add("hidden");
        document.getElementById("game-container").classList.remove("hidden");

        let title = "";
        let content = "";
        
        switch (game) {
            case "snake":
                title = "🐍 Yılan Oyunu";
                content = "Yılan oyunu başlatılıyor...";
                loadSnakeGame();
                break;
            case "xox":
                title = "❌⭕ XOX";
                content = "XOX oyunu başlatılıyor...";
                loadXOXGame();
                break;
            case "mines":
                title = "💣 Mines (Mayın Tarlası)";
                content = "Mayın tarlası oyunu başlatılıyor...";
                loadMinesGame();
                break;
        }
        
        gameTitle.innerText = title;
        gameContent.innerText = content;
    }

    function loadSnakeGame() {
        document.getElementById("snake-game").classList.remove("hidden");
        document.getElementById("mines-game").classList.add("hidden");
        document.getElementById("xox-game").classList.add("hidden");
        startSnake();
    }

    function loadMinesGame() {
        document.getElementById("mines-game").classList.remove("hidden");
        document.getElementById("snake-game").classList.add("hidden");
        document.getElementById("xox-game").classList.add("hidden");
        startMines();
    }

    function loadXOXGame() {
        document.getElementById("xox-game").classList.remove("hidden");
        document.getElementById("snake-game").classList.add("hidden");
        document.getElementById("mines-game").classList.add("hidden");
        startXOX();
    }

    // Yılan oyunu başlatma kodları
    function startSnake() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        let snake = [{x: 50, y: 50}];
        let direction = 'RIGHT';
        let food = {x: 100, y: 100};
        let score = 0;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'green';
            snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));

            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, 10, 10);

            ctx.fillStyle = 'white';
            ctx.fillText('Score: ' + score, 10, 10);
        }

        function update() {
            const head = Object.assign({}, snake[0]);

            switch (direction) {
                case 'UP': head.y -= 10; break;
                case 'DOWN': head.y += 10; break;
                case 'LEFT': head.x -= 10; break;
                case 'RIGHT': head.x += 10; break;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score++;
                food = {x: Math.random() * canvas.width, y: Math.random() * canvas.height};
            } else {
                snake.pop();
            }

            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
                alert('Oyun bitti');
                resetGame();
            }

            draw();
        }

        function collision(head) {
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === head.x && snake[i].y === head.y) {
                    return true;
                }
            }
            return false;
        }

        function changeDirection(event) {
            switch (event.keyCode) {
                case 37: direction = 'LEFT'; break;
                case 38: direction = 'UP'; break;
                case 39: direction = 'RIGHT'; break;
                case 40: direction = 'DOWN'; break;
            }
        }

        function resetGame() {
            snake = [{x: 50, y: 50}];
            score = 0;
        }

        document.addEventListener('keydown', changeDirection);
        setInterval(update, 100);
    }

    // XOX ve Mines oyunlarına daha fazla işlevsellik eklenebilir.
});
