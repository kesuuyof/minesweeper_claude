export interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
  row: number;
  col: number;
}

export interface Difficulty {
  name: string;
  rows: number;
  cols: number;
  mines: number;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  board: Cell[][];
  gameStatus: GameStatus;
  mineCount: number;
  flagCount: number;
  timer: number;
  difficulty: Difficulty;
  firstClick: boolean;
}

export type GameAction = 
  | { type: 'REVEAL_CELL'; row: number; col: number }
  | { type: 'TOGGLE_FLAG'; row: number; col: number }
  | { type: 'NEW_GAME'; difficulty: Difficulty }
  | { type: 'TICK_TIMER' }
  | { type: 'GAME_WON' }
  | { type: 'GAME_LOST' };