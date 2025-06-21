import { Cell } from '../types';

export const createEmptyBoard = (rows: number, cols: number): Cell[][] => {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
      row,
      col,
    }))
  );
};

export const placeMines = (board: Cell[][], mineCount: number, firstClickRow: number, firstClickCol: number): Cell[][] => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  const { length: rows } = newBoard;
  const cols = newBoard[0].length;
  
  let minesPlaced = 0;
  
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    
    if (!newBoard[row][col].isMine && 
        !(row === firstClickRow && col === firstClickCol) &&
        !isAdjacentToFirstClick(row, col, firstClickRow, firstClickCol)) {
      newBoard[row][col].isMine = true;
      minesPlaced++;
    }
  }
  
  return calculateAdjacentMines(newBoard);
};

const isAdjacentToFirstClick = (row: number, col: number, firstRow: number, firstCol: number): boolean => {
  return Math.abs(row - firstRow) <= 1 && Math.abs(col - firstCol) <= 1;
};

export const calculateAdjacentMines = (board: Cell[][]): Cell[][] => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  const { length: rows } = newBoard;
  const cols = newBoard[0].length;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].adjacentMines = countAdjacentMines(newBoard, row, col);
      }
    }
  }
  
  return newBoard;
};

const countAdjacentMines = (board: Cell[][], row: number, col: number): number => {
  let count = 0;
  const { length: rows } = board;
  const cols = board[0].length;
  
  for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
      if (board[r][c].isMine) {
        count++;
      }
    }
  }
  
  return count;
};

export const revealCell = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  
  if (newBoard[row][col].isFlagged || newBoard[row][col].isRevealed) {
    return newBoard;
  }
  
  newBoard[row][col].isRevealed = true;
  
  if (newBoard[row][col].adjacentMines === 0 && !newBoard[row][col].isMine) {
    const { length: rows } = newBoard;
    const cols = newBoard[0].length;
    
    for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
        if (!newBoard[r][c].isRevealed && !newBoard[r][c].isFlagged) {
          const updatedBoard = revealCell(newBoard, r, c);
          for (let i = 0; i < updatedBoard.length; i++) {
            for (let j = 0; j < updatedBoard[i].length; j++) {
              newBoard[i][j] = updatedBoard[i][j];
            }
          }
        }
      }
    }
  }
  
  return newBoard;
};

export const toggleFlag = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  
  if (!newBoard[row][col].isRevealed) {
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
  }
  
  return newBoard;
};

export const checkWinCondition = (board: Cell[][]): boolean => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cell = board[row][col];
      if (!cell.isMine && !cell.isRevealed) {
        return false;
      }
    }
  }
  return true;
};

export const revealAllMines = (board: Cell[][]): Cell[][] => {
  return board.map(row =>
    row.map(cell => ({
      ...cell,
      isRevealed: cell.isMine ? true : cell.isRevealed,
    }))
  );
};

export const countFlags = (board: Cell[][]): number => {
  let count = 0;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col].isFlagged) {
        count++;
      }
    }
  }
  return count;
};