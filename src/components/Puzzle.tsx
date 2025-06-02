import { type CSSProperties, useEffect, useState } from "react";
import "./Puzzle.style.css";
import { shuffleArray } from "../utils/random";

function findItemIn2DArray(array: string[][], item: string) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === item) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

function puzzleAction(playState: string[][], col: number, row: number) {
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

  return playState;
}

function generatePossibleAction(playState: string[][]) {
  let [row, col] = findItemIn2DArray(playState, ".");
  let possibleActions = [];

  if (row === 2 && col === 3) {
    return [[2, 2]];
  }

  if (row > 0) {
    possibleActions.push([row - 1, col]);
  }
  if (row < 2) {
    possibleActions.push([row + 1, col]);
  }
  if (col > 0) {
    possibleActions.push([row, col - 1]);
  }
  if (col < 2) {
    possibleActions.push([row, col + 1]);
  }
  if (row === 2 && col === 2) {
    possibleActions.push([2, 3]);
  }

  return possibleActions;
}

interface PuzzleProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function Puzzle({ className, ...props }: PuzzleProps) {
  const [playState, setPlayState] = useState(generateInit());
  const defaultItem = ["p", "a", "s", "t1", "e1", "l", "i", "t2", "e2", "."];
  const [isWon, setIsWon] = useState(false);

  function generateInit() {
    let defaultState = [
      ["p", "a", "s"],
      ["t1", "e1", "l"],
      ["i", "t2", "e2", "."],
    ];

    let randomizedTimes = 100;
    let prevLocation = findItemIn2DArray(defaultState, ".");
    for (let i = 0; i < randomizedTimes; i++) {
      let possibleActions = generatePossibleAction(defaultState);
      if (possibleActions.length === 0) {
        alert("something went wrong with generator");
      }

      // filter out the impossible
      possibleActions = possibleActions.filter((action) => {
        if (action[0] === prevLocation[0] && action[1] === prevLocation[1]) {
          return false;
        }
        return true;
      });
      let randomAction =
        possibleActions[Math.floor(Math.random() * possibleActions.length)];
      defaultState = puzzleAction(
        defaultState,
        randomAction[1],
        randomAction[0],
      );
    }

    return defaultState;
  }

  function checkWin(state: string[][]) {
    let text = "pastelite.";
    let x = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (state[i][j][0] !== text[i * 3 + j]) {
          return false;
        }
        x++;
      }
    }
    return true;
  }

  function handleClick(row: number, col: number) {
    // if nearby have .
    let newState = puzzleAction(playState, col, row);

    console.log("running!, new state:", newState);
    setPlayState([...newState]);
  }

  // i set useeffect because i want iswon to run after movement
  useEffect(() => {
    if (checkWin(playState)) {
      setIsWon(true);
    }
  }, [playState]);

  return (
    <div
      className={`${
        className || ""
      } puzzle flex justify-center items-center relative`}
      {...props}
    >
      {defaultItem.map((item, _) => {
        let [row, col] = findItemIn2DArray(playState, item);
        return (
          <div
            // className={(item == ".") ? "item the-dot" : "item"}
            className={`item ${(item == ".") ? "the-dot" : ""} ${
              (item[0] == defaultItem[row * 3 + col][0]) ? "correct" : ""
            }`}
            key={`puzzle-item-${item}`}
            style={{
              "--item-row": row,
              "--item-col": col,
              opacity: isWon ? 0.2 : 1,
            } as CSSProperties}
            onClick={() => handleClick(row, col)}
          >
            {item == "." ? "" : item[0].toUpperCase()}
          </div>
        );
      })}
      <svg
        viewBox="0 0 405 305"
        height={"100%"}
        style={{
          overflow: "visible",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        <path
          d="M 0 0 L 307 0 L 307 200 L 407 200 L 407 307 L 0 307 Z "
          style={{
            strokeWidth: 1,
            stroke: "white",
            fill: "none",
          }}
        />
      </svg>
      <div
        className="h-full w-full flex flex-col justify-center items-center z-10 gap-10 text-center"
        style={{
          pointerEvents: isWon ? "auto" : "none",
          opacity: isWon ? 1 : 0,
        }}
      >
        You won! Nice job everyone!
        <button
          value={"reset"}
          onClick={() => {
            setPlayState(generateInit());
            setIsWon(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
