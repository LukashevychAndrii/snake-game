interface Params {
  emptyCells: Set<number>;
  rowsAndCols: number;
}

export function setEmptyCells({
  emptyCells,
  rowsAndCols,
}: Params): Set<number> {
  emptyCells.clear();
  for (let i = 0; i < rowsAndCols; i++) {
    for (let j = 0; j < rowsAndCols; j++) {
      emptyCells.add(i * rowsAndCols + j + 1);
    }
  }

  return emptyCells;
}
