// Başla butonuna tıklanınca oyun seçim ekranını gösteren fonksiyon
function showGameSelection() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-selection").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
}

// Geri butonuna tıklanınca başlangıç ekranını gösteren fonksiyon
function showStartScreen() {
    document.getElementById("game-selection").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
}

// Oyun seçimi yapıldığında oyun başlatma fonksiyonu
function startGame(game) {
    document.getElementById("game-selection").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    
    let title = "";
    let content = "";

    switch (game) {
        case "snake":
            title = "🐍 Yılan Oyunu";
            content = "Yılan oyunu başlatılıyor...";
            break;
        case "xox":
            title = "❌⭕ XOX Oyunu";
            content = "XOX oyunu başlatılıyor...";
            break;
        case "mines":
            title = "💣 Mines (Mayın Tarlası)";
            content = "Mayın Tarlası oyunu başlatılıyor...";
            break;
    }

    document.getElementById("game-title").innerText = title;
    document.getElementById("game-content").innerText = content;

    // Doğru oyun dosyasını yükle
    loadGameScript(game);  
}

// Dinamik olarak oyun script dosyasını yükleyen fonksiyon
function loadGameScript(game) {
    // Daha önce yüklenmiş bir script varsa onu kaldır (birikmesin diye)
    let existingScript = document.getElementById("gameScript");
    if (existingScript) {
        existingScript.remove();
    }

    // Yeni bir script elemanı oluştur ve oyun dosyasını yükle
    const script = document.createElement('script');
    script.id = "gameScript";  // Script tag'ine id ekleyelim
    script.src = `${game}.js`;  // Dinamik olarak oyun dosyasını belirle
    script.type = 'text/javascript';
    document.head.appendChild(script);  // Script'i başlığa ekle
}

