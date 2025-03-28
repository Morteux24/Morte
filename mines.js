document.addEventListener("DOMContentLoaded", () => {
    createMinesweeper();
});

function createMinesweeper() {
    const gameContent = document.getElementById("game-content");
    gameContent.innerHTML = ""; // Önceki içeriği temizle

    const gridSize = 8; // 8x8 oyun alanı
    const mineCount = 10; // 10 mayın
    let grid = [];
    
    // Oyun alanını oluştur
    const board = document.createElement("div");
    board.classList.add("minesweeper-board");
    gameContent.appendChild(board);

    // Grid ve hücreleri oluştur
    for (let row = 0; row < gridSize; row++) {
        grid[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", () => revealCell(row, col));
            board.appendChild(cell);
            grid[row][col] = { element: cell, isMine: false, revealed: false };
        }
    }

    // Mayınları rastgele yerleştir
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
        let r = Math.floor(Math.random() * gridSize);
        let c = Math.floor(Math.random() * gridSize);
        if (!grid[r][c].isMine) {
            grid[r][c].isMine = true;
            minesPlaced++;
        }
    }

    function revealCell(row, col) {
        const cell = grid[row][col];
        if (cell.revealed) return;

        cell.revealed = true;
        cell.element.classList.add("revealed");

        if (cell.isMine) {
            cell.element.innerHTML = "💣";
            alert("Oyun Bitti! Mayına bastınız.");
            return;
        }

        let minesNearby = countAdjacentMines(row, col);
        if (minesNearby > 0) {
            cell.element.innerHTML = minesNearby;
        } else {
            revealNearbyCells(row, col);
        }
    }

    function countAdjacentMines(row, col) {
        let count = 0;
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                let newRow = row + r, newCol = col + c;
                if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                    if (grid[newRow][newCol].isMine) count++;
                }
            }
        }
        return count;
    }

    function revealNearbyCells(row, col) {
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                let newRow = row + r, newCol = col + c;
                if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                    revealCell(newRow, newCol);
                }
            }
        }
    }
}
