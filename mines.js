document.addEventListener('DOMContentLoaded', () => {
    const gameContent = document.querySelector('#game-content');
    const boardSize = 8;  // Oyun tahtasının boyutu (8x8)
    const mineCount = 10;  // Mayın sayısı
    const cells = [];

    // Hücreleri oluştur
    function createBoard() {
        const minePositions = generateMinePositions();  // Mayınların yerlerini rastgele belirle
        for (let row = 0; row < boardSize; row++) {
            const rowCells = [];
            const rowElement = document.createElement('div');
            rowElement.classList.add('minesweeper-board');  // Board container'ı

            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (minePositions.includes(row * boardSize + col)) {
                    cell.dataset.mine = true;  // Mayın varsa bu hücreye veri ekle
                }

                // Hücre tıklama olayını ekle
                cell.addEventListener('click', revealCell);

                rowElement.appendChild(cell);
                rowCells.push(cell);
            }
            gameContent.appendChild(rowElement);
            cells.push(rowCells);
        }
    }

    // Mayınları rastgele yerleştir
    function generateMinePositions() {
        const positions = [];
        while (positions.length < mineCount) {
            const pos = Math.floor(Math.random() * (boardSize * boardSize));
            if (!positions.includes(pos)) {
                positions.push(pos);
            }
        }
        return positions;
    }

    // Hücreyi aç
    function revealCell(event) {
        const cell = event.target;

        if (cell.classList.contains('revealed')) return;

        cell.classList.add('revealed');  // Açık hale getir

        if (cell.dataset.mine) {
            cell.style.backgroundColor = 'red';  // Mayına basıldıysa kırmızı yap
            alert("Mayına Bastınız! Oyun Bitti!");
            return;
        }

        const surroundingMines = countSurroundingMines(cell);
        if (surroundingMines > 0) {
            cell.textContent = surroundingMines;  // Eğer çevresinde mayın varsa göster
        } else {
            // Çevresinde mayın yoksa, etrafındaki hücreleri aç
            revealAdjacentCells(cell);
        }
    }

    // Çevredeki mayınları say
    function countSurroundingMines(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        let mineCount = 0;

        // Komşu hücrelere bak
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const r = row + i;
                const c = col + j;

                if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                    const neighborCell = cells[r][c];
                    if (neighborCell.dataset.mine) {
                        mineCount++;
                    }
                }
            }
        }
        return mineCount;
    }

    // Etrafındaki hücreleri aç
    function revealAdjacentCells(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const r = row + i;
                const c = col + j;

                if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                    const neighborCell = cells[r][c];
                    if (!neighborCell.classList.contains('revealed')) {
                        revealCell({ target: neighborCell });  // Hücreyi aç
                    }
                }
            }
        }
    }

    // Oyun başladığında tahtayı oluştur
    createBoard();
});
