import { Header } from '../Header';
import { Board } from '../Board';
import { useGame } from '../../hooks/useGame';
import './Game.css';

export const Game = () => {
  const {
    board,
    gameStatus,
    mineCount,
    flagCount,
    timer,
    difficulty,
    handleCellLeftClick,
    handleCellRightClick,
    handleNewGame,
    handleDifficultyChange,
  } = useGame();

  return (
    <div className="game">
      <h1 className="game-title">マインスイーパー</h1>
      
      <Header
        mineCount={mineCount}
        flagCount={flagCount}
        timer={timer}
        gameStatus={gameStatus}
        difficulty={difficulty}
        onNewGame={handleNewGame}
        onDifficultyChange={handleDifficultyChange}
      />
      
      <Board
        board={board}
        onCellLeftClick={handleCellLeftClick}
        onCellRightClick={handleCellRightClick}
        gameStatus={gameStatus}
      />
      
      {gameStatus === 'won' && (
        <div className="game-message victory">
          🎉 勝利! タイム: {timer}秒
        </div>
      )}
      
      {gameStatus === 'lost' && (
        <div className="game-message defeat">
          💥 ゲームオーバー
        </div>
      )}
    </div>
  );
};