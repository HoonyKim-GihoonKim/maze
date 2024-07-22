import { Layer, Line, Stage } from "react-konva";

export default function Tile() {
  const firstGroundTile = () => {
    return (
      <Line
        x={70}
        y={200}
        points={[0, 0, 300, 0, 350, 70, -50, 70]}
        closed
        stroke="black"
      />
    );
  };

  // Use SecondGroudnTile when upfront is opened.
  // Other wise, use closedSecondGroundTile
  const secondGroundTile = () => {
    return (
      <Line
        x={70}
        y={200}
        points={[0, 0, 30, -50, 260, -50, 300, 0]}
        closed
        stroke="black"
      />
    );
  };

  const closedSecondGroundTile = () => {
    return (
      <Line
        x={70}
        y={200}
        points={[0, 0, 0, -170, 300, -170, 300, 0]}
        closed
        stroke="black"
      />
    );
  };

  const closedLeftTile = () => {
    return (
      <Line
        x={20}
        y={0}
        points={[0, 0, 50, 30, 50, 200, 0, 270]}
        closed
        stroke="black"
      />
    );
  };

  const openedLeftTile = () => {
    return (
      <Line
        x={20}
        y={0}
        points={[0, 0, 50, 0, 50, 200, 0, 200]}
        stroke="black"
      />
    );
  };

  const closedRightTile = () => {
    return (
      <Line
        x={420}
        y={0}
        points={[0, 0, 0, 270, -50, 200, -50, 30]}
        closed
        stroke="black"
      />
    );
  };

  const openedRightTile = () => {
    return (
      <Line
        x={420}
        y={0}
        points={[0, 0, -50, 0, -50, 200, 0, 200]}
        stroke="black"
      />
    );
  };

  return (
      <Stage width={window.innerWidth} height={window.innerHeight} x={window.innerWidth / 2 - 200}>
        <Layer>
          {firstGroundTile()}
          {/* {openedLeftTile()} */}
          {closedLeftTile()}
          {closedRightTile()}
          {/* {openedRightTile()} */}
          {/* {secondGroundTile()} */}
          {closedSecondGroundTile()}
        </Layer>
      </Stage>
  );
}
