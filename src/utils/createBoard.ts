import { RowsAndCols } from "../types/rowsAndCols";

interface params {
  cellsRows: Map<number, number>;
  emptyCells: Set<number>;
  rowsAndCols: RowsAndCols;
}

const createBoard = ({
  cellsRows,
  emptyCells,
  rowsAndCols,
}: params): number[][] => {
  console.log("creating board...");
  cellsRows.clear();

  const cells: number[][] = [];
  for (let i = 0; i < rowsAndCols; i++) {
    const row: number[] = [];
    for (let j = 0; j < rowsAndCols; j++) {
      cellsRows.set(i * rowsAndCols + j + 1, i + 1);
      emptyCells.add(i * rowsAndCols + j + 1);
      row.push(j);
    }
    cells.push(row);
  }
  return cells;
};

export default createBoard;
