import { useState } from "react";
// import Tabs from "./Tabs/Tabs";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player1",
  O: "Player2",
};

// will make this external functions to reduce code  duplication.
const deriveActivePlayer = (gamesTurns) => {
  let currentPlayer = "X";

  // This will check if its not first turn and the latest current player stored in state is X, then change the player to O.
  if (gamesTurns.length > 0 && gamesTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const deriveWinner = (gameBoard, players) => {
  let winner;
  // For winner, we will create all possible combinations. And compare them with our gameboard. If any combination matches then the winner is that symbol.
  for (let combination of WINNING_COMBINATIONS) {
    let firstSquare = gameBoard[combination[0].row][combination[0].column];
    let secondSquare = gameBoard[combination[1].row][combination[1].column];
    let thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }

  return winner;
};

const deriveGameBorad = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    // destructuring
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const App = () => {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  // const [activePlayer, setActivePlayer] = useState("X"); //For active class styling
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = deriveGameBorad(gameTurns);

  let winner = deriveWinner(gameBoard, players);

  let hasDraw = gameTurns.length === 9 && !winner;

  const handleChangePlayer = (rowIndex, colIndex) => {
    // setActivePlayer((currActivePlayer) =>
    //   currActivePlayer === "X" ? "O" : "X"
    // );

    // State Management for LOG and GAMEBOARD
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      // 1_ Our array will be array containing object and nested objects. Each object represents a turn with player and position info.
      // We will not use Active player, in place of currplayer to avoid mixing states.
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  const handlePlayerName = (symbol, newName) => {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerName}
          />
          <Player
            initialName={PLAYERS.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={() => setGameTurns([])} />
        )}
        <GameBoard onBoxSelect={handleChangePlayer} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
      {/* <Tabs /> */}
    </main>
  );
};

export default App;
