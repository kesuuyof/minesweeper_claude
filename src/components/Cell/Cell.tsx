import { Cell as CellType } from '../../types';
import { CELL_COLORS } from '../../utils/constants';
import './Cell.css';

interface CellProps {
  cell: CellType;
  onLeftClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number) => void;
  gameStatus: 'playing' | 'won' | 'lost';
}

export const Cell = ({ cell, onLeftClick, onRightClick, gameStatus }: CellProps) => {
  const handleClick = () => {
    if (gameStatus === 'playing') {
      onLeftClick(cell.row, cell.col);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (gameStatus === 'playing') {
      onRightClick(cell.row, cell.col);
    }
  };

  const getCellContent = (): string => {
    if (cell.isFlagged) {
      return '🚩';
    }
    
    if (!cell.isRevealed) {
      return '';
    }
    
    if (cell.isMine) {
      return '💣';
    }
    
    if (cell.adjacentMines > 0) {
      return cell.adjacentMines.toString();
    }
    
    return '';
  };

  const getCellClass = (): string => {
    let className = 'cell';
    
    if (cell.isRevealed) {
      className += ' revealed';
      if (cell.isMine) {
        className += ' mine';
      }
    } else {
      className += ' hidden';
    }
    
    if (cell.isFlagged) {
      className += ' flagged';
    }
    
    return className;
  };

  const getCellStyle = (): React.CSSProperties => {
    if (cell.isRevealed && !cell.isMine && cell.adjacentMines > 0) {
      return {
        color: CELL_COLORS[cell.adjacentMines as keyof typeof CELL_COLORS] || '#000'
      };
    }
    return {};
  };

  return (
    <button
      className={getCellClass()}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      style={getCellStyle()}
      disabled={gameStatus !== 'playing'}
    >
      {getCellContent()}
    </button>
  );
};