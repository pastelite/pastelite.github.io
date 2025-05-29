import { type CSSProperties, useState } from "react";
import "./Puzzle.style.css";
import { shuffleArray } from "../utils/random";

export default function Puzzle() {
  const [playState, setPlayState] = useState(generateInit());

  function generateInit() {
    let mostItem = shuffleArray(["p", "a", "s", "t1", "e1", "l", "i", "t2"])
    let state = [
      [mostItem[0], mostItem[1], mostItem[2]],
      [mostItem[3], mostItem[4], mostItem[5]],
      [mostItem[6], mostItem[7], "e2", "."]
    ];

    return state;
  }

  function checkWin(state: string[][]) {
    let text = "pastelite."
    let x = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (state[i][j][0] !== text[i*3+j]) {
          return false;
        }
        x++;
      }
    }
    return true;
  }

  function handleClick(row: number, col: number) {
    // if nearby have .
    if (row > 0 && playState[row - 1][col] === ".") {
      playState[row - 1][col] = playState[row][col];
      playState[row][col] = ".";
    } else if (row < 2 && playState[row + 1][col] === ".") {
      playState[row + 1][col] = playState[row][col];
      playState[row][col] = ".";
    } else if (col > 0 && playState[row][col - 1] === ".") {
      playState[row][col - 1] = playState[row][col];
      playState[row][col] = ".";
    } else if (col < 2 && playState[row][col + 1] === ".") {
      playState[row][col + 1] = playState[row][col];
      playState[row][col] = ".";
    } else if (row === 2 && col === 2 && playState[2][3] === ".") {
      playState[2][3] = playState[2][2];
      playState[2][2] = ".";
    } else if (row === 2 && col === 3 && playState[2][2] === ".") {
      playState[2][2] = playState[2][3];
      playState[2][3] = ".";
    }

    console.log("running!, new state:", playState);
    if (checkWin(playState)) {
      alert("You win!");
    }

    setPlayState([...playState]);
  }

  return (
    <div className="puzzle border border-red-300 flex-none">
      {playState.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          return (
            <div
              className={(col == ".") ? "the-dot" : "0"}
              key={`puzzle-item-${col}`}
              style={{
                "--item-row": rowIndex,
                "--item-col": colIndex,
              } as CSSProperties}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {col[0]}
            </div>
          );
        });
      })}
    </div>
  );
}
