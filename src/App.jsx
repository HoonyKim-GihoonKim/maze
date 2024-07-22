import { useState, useMemo, useEffect } from "react";
import { generateMaze } from "./util";
import "./App.css";
import Tile from "./tiles/tile";

export default function App() {
  const [gameId, setGameId] = useState(1);
  const [status, setStatus] = useState("playing");
  const [isMovingDirectionSelected, setIsMovingDirectionSelected] =
    useState(false);
  const [movingDirection, setMovingDirection] = useState();
  const [countMoves, setCountMoves] = useState(0);

  const [size, setSize] = useState(10);

  const [userPosition, setUserPosition] = useState([0, 0]);

  const [highestScore, setHighestScore] = useState(0);

  const [sightView, setSightView] = useState();

  const maze = useMemo(() => generateMaze(size, size), [size]);
  useEffect(() => {
    const lastRowIndex = maze.length - 1;
    const lastColIndex = maze[0].length - 1;
    if (userPosition[0] === lastRowIndex && userPosition[1] === lastColIndex) {
      setStatus("won");
    }
  }, [maze, userPosition]);

  useEffect(() => {
    if (status === "won")
      if (highestScore === 0) {
        setHighestScore(countMoves);
      } else {
        setHighestScore(Math.min(countMoves, highestScore));
      }
  }, [countMoves, highestScore, status]);

  const makeClassName = (i, j) => {
    const rows = maze.length;
    const cols = maze[0].length;
    let arr = [];
    if (maze[i][j][0] === 0) {
      arr.push("topWall");
    }
    if (maze[i][j][1] === 0) {
      arr.push("rightWall");
    }
    if (maze[i][j][2] === 0) {
      arr.push("bottomWall");
    }
    if (maze[i][j][3] === 0) {
      arr.push("leftWall");
    }
    if (i === rows - 1 && j === cols - 1) {
      arr.push("destination");
    }
    if (i === userPosition[0] && j === userPosition[1]) {
      arr.push("currentPosition");
    }

    return arr.join(" ");
  };

  const handleMove = (e) => {
    e.preventDefault();
    if (status !== "playing") {
      return;
    }
    const key = e.code;

    const [i, j] = userPosition;

    let sightView = [];
    // if (!isMovingDirectionSelected) {
    if ((key === "ArrowUp" || key === "KeyW") && maze[i][j][0] === 1) {
      setMovingDirection("up");

      let currentPosition = [userPosition[0], userPosition[1]];
      for (let i = 0; i < 3; i++) {
        sightView.push([maze[currentPosition[0] - 1][currentPosition[1]]]);
        if (currentPosition[0] > 1)
          currentPosition = [currentPosition[0] - 1, currentPosition[1]];
        else break;
      }

      console.log(sightView);
    }
    if ((key === "ArrowRight" || key === "KeyD") && maze[i][j][1] === 1) {
      setMovingDirection("right");
    }
    if ((key === "ArrowDown" || key === "KeyS") && maze[i][j][2] === 1) {
      setMovingDirection("down");
    }
    if ((key === "ArrowLeft" || key === "KeyA") && maze[i][j][3] === 1) {
      setMovingDirection("left");
    }
    setIsMovingDirectionSelected(true);
    // } else {
    if (key === "SpaceBar" || key === "Space") {
      switch (movingDirection) {
        case "up":
          setUserPosition([i - 1, j]);
          setMovingDirection("");
          setIsMovingDirectionSelected(false);
          break;
        case "right":
          setUserPosition([i, j + 1]);
          setMovingDirection("");
          setIsMovingDirectionSelected(false);
          break;
        case "down":
          setUserPosition([i + 1, j]);
          setMovingDirection("");
          setIsMovingDirectionSelected(false);
          break;
        case "left":
          setUserPosition([i, j - 1]);
          setMovingDirection("");
          setIsMovingDirectionSelected(false);
          break;
      }
      setCountMoves((prevState) => (prevState = prevState + 1));
    }
    // }
  };

  const handleUpdateSettings = () => {
    const prevSize = size;
    const newSize = Number(
      document.querySelector("input[name='mazeSize']").value
    );
    setSize(newSize);
    setUserPosition([0, 0]);
    setStatus("playing");
    setGameId(gameId + 1);
    setCountMoves(0);

    if (prevSize !== newSize) {
      setHighestScore(0);
    }
  };

  return (
    <div className="App" onKeyDown={handleMove} tabIndex={-1}>
      <div className="setting">
        <label htmlFor="mazeSize">Size of maze (5-40):</label>
        <input
          type="number"
          name="mazeSize"
          min="5"
          max="40"
          defaultValue="10"
        />
      </div>
      <div className="setting">
        <button onClick={handleUpdateSettings}>
          Restart game with new settings
        </button>
      </div>
      <p>
        use WSAD or Arrow Keys to determine direction, and use space to move
        position
      </p>

      <table id="maze">
        <tbody>
          {maze.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                <td key={`cell-${i}-${j}`} className={makeClassName(i, j)}>
                  <div />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>You have moved {countMoves} times</p>
        <p>Highest Score : {highestScore}</p>
      </div>

      {isMovingDirectionSelected && <Tile></Tile>}

      {status !== "playing" && (
        <div className="info" onClick={handleUpdateSettings}>
          <p>you won (click here to play again)</p>
        </div>
      )}
    </div>
  );
}
