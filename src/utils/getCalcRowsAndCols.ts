import { boardSize } from "../types/boardSize";

interface Params {
  boardSize: boardSize;
}

export function getCalcRowsAndCols({ boardSize }: Params): number {
  return Math.sqrt(boardSize);
}
