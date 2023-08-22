import getRandomNumber from "./getRandomNumber";

interface params {
  emptyCells: Set<number>;
}

const getRandomCell = ({ emptyCells }: params): number => {
  const randomNumber = getRandomNumber(1, emptyCells.size);
  const arr = Array.from(emptyCells);
  emptyCells.delete(arr[randomNumber]);
  return arr[randomNumber];
};

export default getRandomCell;
