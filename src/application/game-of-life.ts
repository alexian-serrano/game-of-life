import { CellStatus } from '../core/cell-status.enum.js';

const getLivingNeighbours = (
	currentState: string[][],
	row: number,
	column: number
): number => {
	const neighbours: string[] = [
		currentState[row - 1]?.[column - 1] ?? CellStatus.DEAD,
		currentState[row - 1]?.[column] ?? CellStatus.DEAD,
		currentState[row - 1]?.[column + 1] ?? CellStatus.DEAD,
		currentState[row]?.[column - 1] ?? CellStatus.DEAD,
		currentState[row]?.[column + 1] ?? CellStatus.DEAD,
		currentState[row + 1]?.[column - 1] ?? CellStatus.DEAD,
		currentState[row + 1]?.[column] ?? CellStatus.DEAD,
		currentState[row + 1]?.[column + 1] ?? CellStatus.DEAD,
	];

	return neighbours.filter((neighbour) => neighbour === '*').length;
};

const computeNextState = (
	currentState: CellStatus[][] | string[][]
): CellStatus[][] => {
	const newState: CellStatus[][] = [];

	for (const [rowIndex, row] of currentState.entries()) {
		const newRow: CellStatus[] = [];

		for (const [index, cell] of row.entries()) {
			const livingNeighbours = getLivingNeighbours(
				currentState,
				rowIndex,
				index
			);
			if (livingNeighbours > 3 || livingNeighbours < 2) {
				newRow.push(CellStatus.DEAD);
			} else if (livingNeighbours === 3) {
				newRow.push(CellStatus.ALIVE);
			} else {
				newRow.push(cell as CellStatus);
			}
		}

		newState.push(newRow);
	}

	return newState;
};

export default computeNextState;
