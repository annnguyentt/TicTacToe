function Scoreboard({ scores, isONext, gameResult } = {}) {
  const enableClass = "font-bold text-white";
  const disableClass = "text-gray-300";

  return (
    <div className="flex items-center justify-center pt-9 text-white">
      <div className="grid grid-cols-3 text-center text-lg">
        <div
          className={
            gameResult ? enableClass : isONext ? enableClass : disableClass
          }
        >
          <h2>PLAYER 1 (X)</h2>
          <div>{scores[0]}</div>
        </div>
        <div className={gameResult ? enableClass : disableClass}>
          <h2>TIE</h2>
          <div>{scores[1]}</div>
        </div>
        <div
          className={
            gameResult ? enableClass : isONext ? disableClass : enableClass
          }
        >
          <h2>PLAYER 2 (O)</h2>
          <div>{scores[2]}</div>
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;
