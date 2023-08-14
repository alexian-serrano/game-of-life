import React, { useState, useEffect } from 'react';
import computeNextState from './application/game-of-life.js';
import { CellStatus } from './core/cell-status.enum.js';
import { GameState } from './core/game-state.js';
import { Box } from 'ink';

const generateRandomInitialState = (
  width: number,
  height: number,
  initialLivingCellsProportion: number
) => {
  const initialState: GameState = [];

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const row: CellStatus[] = [];

    for (let columnIndex = 0; columnIndex < width; columnIndex++) {
      const isAlive = Math.random() > 1 - initialLivingCellsProportion;
      row.push(isAlive ? CellStatus.ALIVE : CellStatus.DEAD);
    }

    initialState.push(row);
  }

  return initialState;
};

type GameOfLifeProps = {
  width: number;
  height: number;
  initialLivingCellsProportion: number;
};

const GameOfLife = (props: GameOfLifeProps) => {
  const [gameState, setGameState] = useState(
    generateRandomInitialState(
      props.width,
      props.height,
      props.initialLivingCellsProportion
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextGameState = computeNextState(gameState);
      setGameState(nextGameState);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  return <Grid gameState={gameState} />;
};

export default GameOfLife;

type GridProps = {
  gameState: GameState;
};
const Grid = (props: GridProps) => {
  return (
    <Box flexDirection="column">
      {props.gameState.map((_, rowIndex) => (
        <Box key={rowIndex} flexDirection="row">
          {props.gameState[rowIndex]?.map((state, index) => (
            <Cell
              key={`${rowIndex}-${index}`}
              isAlive={state === CellStatus.ALIVE}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

type CellProps = {
  isAlive?: boolean;
};
const Cell = (props: CellProps) => {
  return (
    <Box
      width={3}
      height={1}
      borderStyle="single"
      borderColor={props.isAlive ? 'green' : 'white'}
      margin={0}
      padding={0}
    ></Box>
  );
};
