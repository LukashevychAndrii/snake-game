interface params {
  cellsRows: Map<number, number>;
  emptyCells: Set<number>;
}

const createBoard = ({ cellsRows, emptyCells }: params): number[][] => {
  const cells: number[][] = [];
  for (let i = 0; i < 20; i++) {
    const row: number[] = [];
    for (let j = 0; j < 20; j++) {
      cellsRows.set(i * 20 + j + 1, i + 1);
      emptyCells.add(i * 20 + j + 1);
      row.push(j);
    }
    cells.push(row);
  }
  return cells;
};

export default createBoard;
