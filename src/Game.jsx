import React from "react";
import Confetti from "react-confetti";
import Sound from "./Sound";
import Scoreboard from "./Scoreboard";
import Board from "./Board";
import { calculateWinner } from "./utils_func";

class RenderConfetti extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stop: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ stop: false });
    }, 3000);
  }

  render() {
    return (
      <div className="confetti">
        {this.state.stop ? <Confetti tweenDuration={1} /> : null}
      </div>
    );
  }
}

class Game extends React.Component {
  state = {
    squares: Array(9).fill(""),
    isStartedWithX: true,
    isONext: true,
    winner: null,
    winningLocation: Array(3).fill(null),
    scores: Array(3).fill(0),
    isSoundOn: true,
  };

  audioX = new Audio("./soundEffect/X.wav");
  audioO = new Audio("./soundEffect/O.wav");
  audioDraw = new Audio("./soundEffect/draw.wav");
  audioWinning = new Audio("./soundEffect/winning.wav");

  handleClick = (i) => {
    const newSquares = this.state.squares.slice();
    const winner = calculateWinner(newSquares).winner;

    if (winner || newSquares[i]) {
      return;
    }

    newSquares[i] = this.state.isONext ? "X" : "O";
    const newWinner = calculateWinner(newSquares).winner;
    let newScores = this.state.scores;
    let audio = this.state.isONext ? this.audioX : this.audioO;

    if (newWinner) {
      if (newWinner === "X") {
        newScores[0] += 1;
        audio = this.audioWinning;
      } else if (newWinner === "O") {
        newScores[2] += 1;
        audio = this.audioWinning;
      } else if (newWinner === "Draw") {
        newScores[1] += 1;
        audio = this.audioDraw;
      }
    }

    if (this.state.isSoundOn) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }

    this.setState({
      squares: newSquares,
      isONext: !this.state.isONext,
      winner: newWinner,
      scores: newScores,
    });
  };

  handleSoundToggle = () => {
    this.setState({
      isSoundOn: !this.state.isSoundOn,
    });
  };

  handleStartNewGame() {
    this.setState((state) => {
      return {
        squares: Array(9).fill(null),
        winner: null,
        isStartedWithX: !state.isStartedWithX,
        isONext: !state.isStartedWithX,
      };
    });
  }

  handleStartNewScoreboard() {
    this.setState({
      squares: Array(9).fill(""),
      isStartedWithX: true,
      isONext: true,
      winner: null,
      winningLocation: Array(3).fill(null),
      scores: Array(3).fill(0),
    });
  }

  render() {
    const winner = this.state.winner;
    return (
      <div className="App bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-screen h-screen">
        <Sound isOn={this.state.isSoundOn} onClick={this.handleSoundToggle} />

        <h1 className="text-4xl pt-10 text-white font-bold flex items-center justify-center font-Fredoka-One">
          Tic-Tac-Toe
        </h1>
        <Scoreboard
          scores={this.state.scores}
          isONext={this.state.isONext}
          gameResult={this.state.winner}
        />
        <div>
          <Board
            squares={this.state.squares}
            onClick={this.handleClick}
            isONext={this.state.isONext}
          />
          <div
            className="flex flex-col items-center md:flex-row md:justify-center py-5 
                    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <button
              className="my-4 md:my-0 flex items-center justify-center text-indigo-600 mx-2 text-sm
                                        bg-white rounded p-2 uppercase font-semibold tracking-wide w-36
                                        hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300
                                        hover:text-white"
              onClick={this.handleStartNewGame.bind(this)}
            >
              New game
            </button>
            <button
              className="flex items-center justify-center text-indigo-600 mx-2 text-sm
                                        bg-white rounded p-2 uppercase font-semibold tracking-wide w-36
                                        hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300
                                        hover:text-white"
              onClick={this.handleStartNewScoreboard.bind(this)}
            >
              Reset scores
            </button>
          </div>
        </div>
        <div> {["X", "O"].includes(winner) ? <RenderConfetti /> : null}</div>
      </div>
    );
  }
}

export default Game;
