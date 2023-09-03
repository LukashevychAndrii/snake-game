export function getMaxScoreFromLocalStorage(): number | null {
  const maxScore = localStorage.getItem("snakeGameMaxScore");
  console.log(maxScore);
  if (maxScore && !isNaN(+maxScore)) {
    return +maxScore;
  } else {
    return null;
  }
}
