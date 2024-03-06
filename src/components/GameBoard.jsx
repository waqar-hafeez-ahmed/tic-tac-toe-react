// import { useState } from "react";

const GameBoard = ({ onBoxSelect, board }) => {
  //USING DIFFERENT APPROACH
  // We will derive game board from the turn array. Using For of loop will not exectute if turn is empty array and initialGameBoard will render.

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, cellIndex) {
  //   setGameBoard((prevBoard) => {
  //     // As array is reference type, we will not update it directily but create a deep copy.
  //     // We will copy prev Array and nested arrays in another variable. And later change this copy.
  //     const updatedBoard = [...prevBoard.map((innerArray) => [...innerArray])];
  //     updatedBoard[rowIndex][cellIndex] = isActive;
  //     return updatedBoard;
  //   });
  //   onBoxSelect();
  // }

  return (
    <ol id="game-board">
      {/* row */}
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {/* cells in a row */}
            {row.map((playerSybmol, cellIndex) => (
              <li key={cellIndex}>
                <button
                  onClick={() => onBoxSelect(rowIndex, cellIndex)}
                  disabled={playerSybmol !== null}
                >
                  {playerSybmol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
