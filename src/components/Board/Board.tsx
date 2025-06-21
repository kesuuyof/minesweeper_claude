import { Cell } from '../Cell';
import { Cell as CellType, GameStatus } from '../../types';
import './Board.css';

interface BoardProps {
  board: CellType[][];
  onCellLeftClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number) => void;
  gameStatus: GameStatus;
}

export const Board = ({ board, onCellLeftClick, onCellRightClick, gameStatus }: BoardProps) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${board[0]?.length || 0}, 1fr)`,
    gridTemplateRows: `repeat(${board.length}, 1fr)`,
  };

  return (
    <div className="board" style={gridStyle}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            onLeftClick={onCellLeftClick}
            onRightClick={onCellRightClick}
            gameStatus={gameStatus}
          />
        ))
      )}
    </div>
  );
};