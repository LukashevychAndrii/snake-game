interface Params {
  newScoreMax: number;
}

export function setMaxScoreToLocalStorage({ newScoreMax }: Params): void {
  localStorage.setItem("snakeGameMaxScore", newScoreMax.toString());
}
