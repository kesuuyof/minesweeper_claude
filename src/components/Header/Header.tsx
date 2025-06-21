import { GameStatus, Difficulty } from '../../types';
import { DIFFICULTIES } from '../../utils/constants';
import './Header.css';

interface HeaderProps {
  mineCount: number;
  flagCount: number;
  timer: number;
  gameStatus: GameStatus;
  difficulty: Difficulty;
  onNewGame: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export const Header = ({
  mineCount,
  flagCount,
  timer,
  gameStatus,
  difficulty,
  onNewGame,
  onDifficultyChange
}: HeaderProps) => {
  const getGameStatusEmoji = (): string => {
    switch (gameStatus) {
      case 'won':
        return '😎';
      case 'lost':
        return '😵';
      default:
        return '🙂';
    }
  };

  const formatTime = (seconds: number): string => {
    return seconds.toString().padStart(3, '0');
  };

  const formatMineCount = (): string => {
    return Math.max(0, mineCount - flagCount).toString().padStart(3, '0');
  };

  return (
    <div className="header">
      <div className="status-bar">
        <div className="mine-counter">
          🚩 {formatMineCount()}
        </div>
        
        <button 
          className="new-game-button"
          onClick={onNewGame}
          title="新しいゲーム"
        >
          {getGameStatusEmoji()}
        </button>
        
        <div className="timer">
          ⏱️ {formatTime(timer)}
        </div>
      </div>
      
      <div className="controls">
        <div className="difficulty-selector">
          <label htmlFor="difficulty">難易度:</label>
          <select
            id="difficulty"
            value={difficulty.name}
            onChange={(e) => {
              const selectedDifficulty = Object.values(DIFFICULTIES).find(
                d => d.name === e.target.value
              );
              if (selectedDifficulty) {
                onDifficultyChange(selectedDifficulty);
              }
            }}
          >
            {Object.values(DIFFICULTIES).map((diff) => (
              <option key={diff.name} value={diff.name}>
                {diff.name} ({diff.rows}×{diff.cols}, {diff.mines}💣)
              </option>
            ))}
          </select>
        </div>
        
        <button 
          className="new-game-text-button"
          onClick={onNewGame}
        >
          新しいゲーム
        </button>
      </div>
    </div>
  );
};