import { CellStatus } from '../core/cell-status.enum.js';
import computeNextState from './game-of-life.js';

describe('Game of life', () => {
	it('kills living cells that have less than 2 living neighbours (underpopulation)', () => {
		const game = [
			[CellStatus.DEAD, CellStatus.DEAD, CellStatus.DEAD],
			[CellStatus.DEAD, CellStatus.ALIVE, CellStatus.ALIVE],
			[CellStatus.DEAD, CellStatus.DEAD, CellStatus.DEAD],
		];

		const nextState = computeNextState(game);

		expect(nextState).toEqual([
			[CellStatus.DEAD, CellStatus.DEAD, CellStatus.DEAD],
			[CellStatus.DEAD, CellStatus.DEAD, CellStatus.DEAD],
			[CellStatus.DEAD, CellStatus.DEAD, CellStatus.DEAD],
		]);
	});

	it('kills living cells that have more than 3 living neighbours (overcrowding)', () => {
		const game = [
			[CellStatus.DEAD, CellStatus.ALIVE, CellStatus.ALIVE],
			[CellStatus.DEAD, CellStatus.ALIVE, CellStatus.ALIVE],
			[CellStatus.DEAD, CellStatus.ALIVE, CellStatus.DEAD],
		];

		const nextState = computeNextState(game);

		expect(nextState).toEqual([
			[CellStatus.DEAD, CellStatus.ALIVE, CellStatus.ALIVE],
			[CellStatus.ALIVE, CellStatus.DEAD, CellStatus.DEAD],
			[CellStatus.DEAD, CellStatus.ALIVE, CellStatus.ALIVE],
		]);
	});

	it('generates a living cell if it has exactly 3 living neighbours', () => {
		const game = [
			[CellStatus.DEAD, CellStatus.ALIVE, CellStatus.DEAD],
			[CellStatus.DEAD, CellStatus.DEAD, CellStatus.ALIVE],
			[CellStatus.DEAD, CellStatus.ALIVE, CellStatus.DEAD],
		];

		const nextState = computeNextState(game);

		expect(nextState).toEqual([
			[CellStatus.DEAD, CellStatus.DEAD, CellStatus.DEAD],
			[CellStatus.DEAD, CellStatus.ALIVE, CellStatus.ALIVE],
			[CellStatus.DEAD, CellStatus.DEAD, CellStatus.DEAD],
		]);
	});
});
