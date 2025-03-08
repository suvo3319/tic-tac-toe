import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import Data from "./Data";
import GameOver from "./components/GameOver";
import Header from "./components/Header";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currGameSymbol = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currGameSymbol = "O";
  }

  return currGameSymbol;
}

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...initialBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

const deriveWinner = (gameBoard, players) => {
  let winner;

  for (const combination of Data) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  let hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      const currGameSymbol = deriveActivePlayer(prevGameTurns);

      const updatedGameTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currGameSymbol },
        ...prevGameTurns,
      ];

      return updatedGameTurns;
    });
  }

  const handleRestart = () => {
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(241,210,70,0.98),rgba(250,176,103,0.87))] bg-repeat bg-cover flex flex-col items-center justify-center">
      <Header />
      <div id="game-container" className="max-w-2xl w-full p-6 bg-[#383624] rounded-lg shadow-lg">
        <ol id="players" className="flex justify-between mb-4">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;