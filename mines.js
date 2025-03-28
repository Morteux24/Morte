document.addEventListener('DOMContentLoaded', () => {
    const gameContent = document.querySelector('#game-content');
    const boardSize = 8;
    const mineCount = 10;
    const cells = [];

    function createBoard() {
        const minePositions = generateMinePositions();
        for (let row = 0; row < boardSize; row++) {
            const rowCells = [];
            const rowElement = document.createElement('div');
            rowElement.classList.add('minesweeper-board');

            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;

                if (minePositions.includes(row * boardSize + col)) {
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

        if (cell.classList.contains('revealed')) return;

        cell.classList.add('revealed');

        if (cell.dataset.mine) {
            cell.style.backgroundColor = 'red';
            alert("Mayına Bastınız! Oyun Bitti!");
            return;
        }

        const surroundingMines = countSurroundingMines(cell);
        if (surroundingMines > 0) {
            cell.textContent = surroundingMines;
        } else {
            revealAdjacentCells(cell);
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

    // Bu fonksiyon ile Mines oyunu başlatılır
    window.loadMinesGame = function() {
        gameContent.innerHTML = ''; // Board'u sıfırlayın
        createBoard(); // Yeni board oluşturun
    };
});
