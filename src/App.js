import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import Data from "./Data";
import GameOver from "./components/GameOver";

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
    console.log(combination[0])
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
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
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
