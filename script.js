document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'gameCanvas';
    canvas.width = 400;
    canvas.height = 400;
    document.getElementById('game-container').appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Başlangıç ekranı
    function showStartScreen() {
        document.getElementById("game-selection").classList.add("hidden");
        document.getElementById("start-screen").classList.remove("hidden");
    }

    // Oyun Seçim Ekranı
    function showGameSelection() {
        document.getElementById("start-screen").classList.add("hidden");
        document.getElementById("game-selection").classList.remove("hidden");
    }

    // Oyun başlatma
    function startGame(game) {
        document.getElementById("game-selection").classList.add("hidden");
        document.getElementById("game-container").classList.remove("hidden");

        let title = "";
        let content = "";

        switch (game) {
            case "snake":
                title = "🐍 Yılan Oyunu";
                content = "Yılan oyunu başlatılıyor...";
                startSnake();  // Snake oyununu başlat
                break;
            case "xox":
                title = "❌⭕ XOX Oyunu";
                content = "XOX oyunu yakında burada olacak!";
                break;
            case "mines":
                title = "💣 Mines (Mayın Tarlası)";
                content = "Mayın Tarlası oyunu yakında burada olacak!";
                break;
        }

        document.getElementById("game-title").innerText = title;
        document.getElementById("game-content").innerText = content;
    }

    // Snake Oyunu
    function startSnake() {
        let snake = [{x: 50, y: 50}];
        let direction = 'RIGHT'; 
        let food = {x: 100, y: 100};  
        let score = 0;

        // Ekranda puan yazdırma
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";

        // Ekranda çizim yapma
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  

            // Yılanı çizme
            ctx.fillStyle = 'green';
            snake.forEach(part => ctx.fillRect(part.x, part.y, 10, 10));

            // Yiyeceği çizme
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, 10, 10);

            // Puanı ekrana yazma
            ctx.fillStyle = 'white';
            ctx.fillText('Score: ' + score, 10, 20);
        }

        // Yılanı güncelleme ve kontrol etme
        function update() {
            const head = Object.assign({}, snake[0]);

            switch (direction) {
                case 'UP': head.y -= 10; break;
                case 'DOWN': head.y += 10; break;
                case 'LEFT': head.x -= 10; break;
                case 'RIGHT': head.x += 10; break;
            }

            snake.unshift(head);  

            // Eğer yılan yiyeceğe ulaşırsa
            if (head.x === food.x && head.y === food.y) {
                score++;  
                food = {x: Math.floor(Math.random() * canvas.width / 10) * 10, y: Math.floor(Math.random() * canvas.height / 10) * 10};  
            } else {
                snake.pop();  
            }

            // Oyun bitişi kontrolü
            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
                alert('Oyun Bitti! Puanınız: ' + score);
                resetGame();
            }

            draw();  
        }

        // Yılanın kendisiyle çarpmasını kontrol etme
        function collision(head) {
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === head.x && snake[i].y === head.y) {
                    return true;
                }
            }
            return false;
        }

        // Klavye ile yön değiştirme
        function changeDirection(event) {
            switch (event.keyCode) {
                case 37: if (direction !== 'RIGHT') direction = 'LEFT'; break;  
                case 38: if (direction !== 'DOWN') direction = 'UP'; break;  
                case 39: if (direction !== 'LEFT') direction = 'RIGHT'; break;  
                case 40: if (direction !== 'UP') direction = 'DOWN'; break;  
            }
        }

        // Yeni oyuna başlama
        function resetGame() {
            snake = [{x: 50, y: 50}];
            direction = 'RIGHT';
            score = 0;
            food = {x: 100, y: 100};
        }

        // Klavye olaylarını dinle
        document.addEventListener('keydown', changeDirection);
        setInterval(update, 100);  
    }

    // Başlangıç ekranı butonunu çalıştır
    document.querySelector('.main-btn').addEventListener('click', showGameSelection);

    // Oyun seçimi ve başlatma
    document.querySelector('.game-card:nth-child(1)').addEventListener('click', () => startGame('snake'));
    document.querySelector('.game-card:nth-child(2)').addEventListener('click', () => startGame('xox'));
    document.querySelector('.game-card:nth-child(3)').addEventListener('click', () => startGame('mines'));

});
