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
            content = "Yılan oyunu yakında burada olacak!";
            break;
        case "xox":
            title = "❌⭕ XOX Oyunu";
            content = "XOX oyunu yakında burada olacak!";
            break;
        case "mines":
            title = "💣 Mines (Mayın Tarlası)";
            content = "Mayın tarlası oyunu yakında burada olacak!";
            break;
    }
    
    document.getElementById("game-title").innerText = title;
    document.getElementById("game-content").innerText = content;
}
