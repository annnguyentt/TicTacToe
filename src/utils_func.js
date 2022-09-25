export const isNull = (i) => {
  return !i;
};

export const calculateWinner = (squares) => {
  let winnerResult = {
    winner: null,
    location: Array(3).fill(null),
  };
  let winnerScores = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  for (let score of winnerScores) {
    let [a, b, c] = score;
    if (squares[a] === squares[b] && squares[a] === squares[c] && squares[a]) {
      winnerResult.winner = squares[a];
      winnerResult.location = score;
      return winnerResult;
    }
  }
  if (!squares.some(isNull)) {
    winnerResult.winner = "Draw";
  }
  return winnerResult;
};
