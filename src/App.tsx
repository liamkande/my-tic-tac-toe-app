import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [player, setPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const newPlayer = player === 'X' ? 'O' : 'X';
    setPlayer(newPlayer);

    checkWinner(newBoard);
  };

  const checkWinner = (board: Array<string | null>) => {
    const winningCombinations: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const isWinner = winningCombinations.some(([a, b, c]) => {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return true;
      }
      return false;
    });

    if (!isWinner && !board.includes(null)) {
      setWinner('draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  const renderCell = (index: number) => (
      <div className="cell" onClick={() => handleClick(index)}>
        {board[index]}
      </div>
  );

  return (
      <div className="app">
        <h1>Tic Tac Toe</h1>
        {!winner && ( <p>Player <strong className="player">{player}</strong>'s turn:</p>)}
        <div className="board">
          {board.map((cell, index) => (
              <div key={index} className="row">
                {renderCell(index)}
              </div>
          ))}
        </div>
        {winner && (
            <div className="message">
              {winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!   `}
              <button onClick={resetGame}>Play Again</button>
            </div>
        )}
      </div>
  );
};

export default App;
