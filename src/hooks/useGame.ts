import { useReducer, useEffect, useCallback } from 'react';
import { GameState, GameAction, Difficulty } from '../types';
import { DIFFICULTIES } from '../utils/constants';
import {
  createEmptyBoard,
  placeMines,
  revealCell,
  toggleFlag,
  checkWinCondition,
  revealAllMines,
  countFlags
} from '../utils/gameLogic';

const initialDifficulty = DIFFICULTIES.BEGINNER;

const createInitialState = (difficulty: Difficulty): GameState => ({
  board: createEmptyBoard(difficulty.rows, difficulty.cols),
  gameStatus: 'playing',
  mineCount: difficulty.mines,
  flagCount: 0,
  timer: 0,
  difficulty,
  firstClick: true,
});

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'NEW_GAME':
      return createInitialState(action.difficulty);

    case 'REVEAL_CELL': {
      if (state.gameStatus !== 'playing') return state;
      
      const { row, col } = action;
      const cell = state.board[row][col];
      
      if (cell.isRevealed || cell.isFlagged) return state;

      let newBoard = state.board;
      
      if (state.firstClick) {
        newBoard = placeMines(state.board, state.mineCount, row, col);
      }
      
      newBoard = revealCell(newBoard, row, col);
      
      if (newBoard[row][col].isMine) {
        return {
          ...state,
          board: revealAllMines(newBoard),
          gameStatus: 'lost',
          firstClick: false,
        };
      }
      
      const hasWon = checkWinCondition(newBoard);
      
      return {
        ...state,
        board: newBoard,
        gameStatus: hasWon ? 'won' : 'playing',
        firstClick: false,
      };
    }

    case 'TOGGLE_FLAG': {
      if (state.gameStatus !== 'playing') return state;
      
      const { row, col } = action;
      const newBoard = toggleFlag(state.board, row, col);
      const newFlagCount = countFlags(newBoard);
      
      return {
        ...state,
        board: newBoard,
        flagCount: newFlagCount,
      };
    }

    case 'TICK_TIMER':
      if (state.gameStatus === 'playing' && !state.firstClick) {
        return {
          ...state,
          timer: state.timer + 1,
        };
      }
      return state;

    case 'GAME_WON':
      return {
        ...state,
        gameStatus: 'won',
      };

    case 'GAME_LOST':
      return {
        ...state,
        gameStatus: 'lost',
        board: revealAllMines(state.board),
      };

    default:
      return state;
  }
};

export const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialDifficulty, createInitialState);

  const handleCellLeftClick = useCallback((row: number, col: number) => {
    dispatch({ type: 'REVEAL_CELL', row, col });
  }, []);

  const handleCellRightClick = useCallback((row: number, col: number) => {
    dispatch({ type: 'TOGGLE_FLAG', row, col });
  }, []);

  const handleNewGame = useCallback(() => {
    dispatch({ type: 'NEW_GAME', difficulty: state.difficulty });
  }, [state.difficulty]);

  const handleDifficultyChange = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'NEW_GAME', difficulty });
  }, []);

  useEffect(() => {
    if (state.gameStatus === 'playing' && !state.firstClick) {
      const timer = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.gameStatus, state.firstClick]);

  return {
    ...state,
    handleCellLeftClick,
    handleCellRightClick,
    handleNewGame,
    handleDifficultyChange,
  };
};