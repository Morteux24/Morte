document.addEventListener('DOMContentLoaded', () => {
    const gameContent = document.querySelector('#game-content');
    const boardSize = 8;
    const mineCount = 10;
    let board = [];
    let revealedCells = 0;
    const cells = [];

    function createBoard() {
        const minePositions = generateMinePositions();
        let cellId = 0;

        // Board'u oluştur
        for (let row = 0; row < boardSize; row++) {
            const rowCells = [];
            const rowElement = document.createElement('div');
            rowElement.classList.add('minesweeper-board');

            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.id = cellId++;
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (minePositions.includes(cell.dataset.id)) {
                    cell.dataset.mine = true;
                }

                cell.addEventListener('click', revealCell);
                rowElement.appendChild(cell);
                rowCells.push(cell);
            }

            gameContent.appendChild(rowElement);
            cells.push(rowCells);
        }
    }

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

    function revealCell(event) {
        const cell = event.target;

        // Zaten açıldıysa işlem yapma
        if (cell.classList.contains('revealed')) return;

        // Mayına basıldıysa
        if (cell.dataset.mine) {
            cell.style.backgroundColor = 'red';
            alert("Mayına bastınız! Oyun bitti.");
            revealAllCells();
            return;
        }

        // Hücreyi aç
        cell.classList.add('revealed');
        revealedCells++;

        const surroundingMines = countSurroundingMines(cell);
        if (surroundingMines > 0) {
            cell.textContent = surroundingMines;
        } else {
            revealAdjacentCells(cell);
        }

        if (revealedCells === (boardSize * boardSize - mineCount)) {
            alert("Tebrikler! Mayınları buldunuz.");
        }
    }

    function countSurroundingMines(cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        let mineCount = 0;

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
                        revealCell({ target: neighborCell });
                    }
                }
            }
        }
    }

    function revealAllCells() {
        cells.forEach(row => {
            row.forEach(cell => {
                cell.classList.add('revealed');
                if (cell.dataset.mine) {
                    cell.style.backgroundColor = 'red';
                }
            });
        });
    }

    // Bu fonksiyon ile Mines oyunu başlatılır
    window.loadMinesGame = function() {
        gameContent.innerHTML = ''; // Board'u sıfırlayın
        createBoard(); // Yeni board oluşturun
    };
});
