#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './app.js';
import { z } from 'zod';

const cli = meow(
  `
	Usage
	  $ game-of-life

	Options
		--width  50
        --height  25
        --initialLivingCellsProportion  0.3

	Examples
	  $ game-of-life --width=50 --height=25 --initialLivingCellsProportion=0.3
`,
  {
    importMeta: import.meta,
    flags: {
      width: {
        type: 'number',
        default: 50,
      },
      height: {
        type: 'number',
        default: 25,
      },
      initialLivingCellsProportion: {
        type: 'number',
        default: 0.3,
      },
    },
  }
);

const cliFlagSchema = z.object({
  width: z.number().min(10).max(100),
  height: z.number().min(10).max(100),
  initialLivingCellsProportion: z.number().min(0).max(1),
});

cliFlagSchema.parse(cli.flags);

render(
  <App
    width={cli.flags.width}
    height={cli.flags.height}
    initialLivingCellsProportion={cli.flags.initialLivingCellsProportion}
  />
);
