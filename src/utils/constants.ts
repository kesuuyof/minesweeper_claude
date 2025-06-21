import { Difficulty } from '../types';

export const DIFFICULTIES: Record<string, Difficulty> = {
  BEGINNER: { name: '初級', rows: 9, cols: 9, mines: 10 },
  INTERMEDIATE: { name: '中級', rows: 16, cols: 16, mines: 40 },
  EXPERT: { name: '上級', rows: 16, cols: 30, mines: 99 }
};

export const CELL_COLORS = {
  1: '#1976d2',
  2: '#388e3c', 
  3: '#d32f2f',
  4: '#7b1fa2',
  5: '#689f38',
  6: '#0097a7',
  7: '#5d4037',
  8: '#424242'
};

export const TIMER_INTERVAL = 1000;