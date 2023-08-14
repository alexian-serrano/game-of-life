import React from 'react';
import { Box, Text } from 'ink';
import GameOfLife from './GameOfLife.js';

type AppProps = {
  width: number;
  height: number;
  initialLivingCellsProportion: number;
};

export default function App(props: AppProps) {
  return (
    <Box flexDirection="column">
      <Text>
        Welcome to the{' '}
        <Text bold color="green">
          Game of Life
        </Text>
      </Text>

      <GameOfLife
        width={props.width}
        height={props.height}
        initialLivingCellsProportion={props.initialLivingCellsProportion}
      />
    </Box>
  );
}
