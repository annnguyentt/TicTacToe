import React from "react";
import Confetti from 'react-confetti';

function Square({ onClick, value, isHighlighted } = {}) {
    const defaultClass = "Square font-Fredoka-One w-full text-6xl transition ease-in-out border-2 border-white "
    return (
        <button
            onClick={() => { onClick() }}
            className={
                isHighlighted ? defaultClass + ' bg-black animate-[pulse_1s_ease-in_1_backwards]'
                    : defaultClass
            }>
            {value}
        </button >
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            onClick={() => { this.props.onClick(i) }}
            value={this.props.squares[i]}
            isHighlighted={calculateWinner(this.props.squares).location.includes(i)}
        />;
    }

    render() {
        return (
            <div className="Board flex flex-col items-center justify-center p-5 text-white text-2xl">
                <div className="text-white w-2/3 sm:w-1/3 xl:w-1/4 grid grid-rows-3 aspect-square
                 border-2 border-white">
                    <div className="Row grid grid-cols-3 ">
                        {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
                    </div>
                    <div className="Row grid grid-cols-3 ">
                        {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
                    </div>
                    <div className="Row grid grid-cols-3 ">
                        {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
                    </div>
                </div>
            </div>
        )
    }
}

class RenderConfetti extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stop: true,
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ stop: false })
        }, 3000)
    }

    render() {
        return (
            <div className="confetti">
                {this.state.stop ? <Confetti
                    tweenDuration={1}
                /> : null
                }
            </div>
        )
    }
};

function Scores({ value, isONext, label } = {}) {
    const enableClass = "font-bold text-white";
    const disableClass = "text-gray-300";

    return (
        <div className="flex items-center justify-center pt-9 text-white">
            <div className="grid grid-cols-3 text-center text-lg">
                <div className={
                    label ? enableClass :
                        isONext ? enableClass : disableClass}>
                    <h2>PLAYER 1 (X)</h2>
                    <div>{value[0]}</div>
                </div>
                <div className={
                    label ? enableClass : disableClass
                }>
                    <h2>TIE</h2>
                    <div>{value[1]}</div>
                </div>
                <div className={
                    label ? enableClass :
                        isONext ? disableClass : enableClass}>
                    <h2>PLAYER 2 (O)</h2>
                    <div>{value[2]}</div>
                </div>
            </div>
        </div >
    )
}

function SoundEffect({ mode, toggleSoundEffect } = {}) {
    return (
        <button className="absolute right-0 p-5 text-gray-300 md:mr-10" onClick={() => { toggleSoundEffect() }}>
            {
                mode === 'ON' ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                        <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                    </svg>
            }
        </button>
    )
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(""),
            isStartedWithX: true,
            isONext: true,
            winner: null,
            winningLocation: Array(3).fill(null),
            scores: Array(3).fill(0),
            soundEffectMode: 'ON'
        }
    }

    handleClick(i) {
        const newSquares = this.state.squares.slice();
        const winner = calculateWinner(newSquares).winner;

        if (winner || newSquares[i]) {
            return;
        }

        newSquares[i] = this.state.isONext ? 'X' : 'O';
        const newWinner = calculateWinner(newSquares).winner;
        let newScores = this.state.scores;
        let audio = this.state.isONext ? new Audio('./soundEffect/X.wav') : new Audio('./soundEffect/O.wav');

        if (newWinner) {
            if (newWinner === 'X') {
                newScores[0] += 1;
                audio = new Audio('./soundEffect/winning.wav');
            } else if (newWinner === 'O') {
                newScores[2] += 1;
                audio = new Audio('./soundEffect/winning.wav');
            } else if (newWinner === 'Draw') {
                newScores[1] += 1;
                audio = new Audio('./soundEffect/draw.wav');
            }
        }

        if (this.state.soundEffectMode === 'ON') {
            audio.play();
        }

        this.setState({
            squares: newSquares,
            isONext: !this.state.isONext,
            winner: newWinner,
            scores: newScores
        })

    }

    toggleSoundEffect() {
        if (this.state.soundEffectMode === 'ON') {
            this.setState({
                soundEffectMode: 'OFF'
            })
        } else {
            this.setState({
                soundEffectMode: 'ON'
            })
        }
    }

    startNewGame() {
        const copiedIsStartedWithX = this.state.isStartedWithX;
        this.setState({
            squares: Array(9).fill(null),
            winner: null,
            isStartedWithX: !copiedIsStartedWithX,
            isONext: !copiedIsStartedWithX
        })
    }

    startNewScoreboard() {
        this.setState({
            squares: Array(9).fill(""),
            isStartedWithX: true,
            isONext: true,
            winner: null,
            winningLocation: Array(3).fill(null),
            scores: Array(3).fill(0)
        })
    }

    render() {
        const winner = this.state.winner;
        return (
            <div className="App bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-screen h-screen">
                <SoundEffect
                    mode={this.state.soundEffectMode}
                    toggleSoundEffect={() => this.toggleSoundEffect()}
                />

                <h1 className="text-4xl pt-10 text-white font-bold flex items-center justify-center font-Fredoka-One">
                    Tic-Tac-Toe</h1>
                <Scores
                    value={this.state.scores}
                    isONext={this.state.isONext}
                    label={this.state.winner}
                />
                <div>
                    <Board
                        squares={this.state.squares}
                        onClick={i => this.handleClick(i)}
                        isONext={this.state.isONext}
                    />
                    <div className="flex flex-col items-center md:flex-row md:justify-center py-5 
                    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        <button className="my-4 md:my-0 flex items-center justify-center text-indigo-600 mx-2 text-sm
                                        bg-white rounded p-2 uppercase font-semibold tracking-wide w-36
                                        hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300
                                        hover:text-white"
                            onClick={() => this.startNewGame()}
                        >
                            New game
                        </button>
                        <button className="flex items-center justify-center text-indigo-600 mx-2 text-sm
                                        bg-white rounded p-2 uppercase font-semibold tracking-wide w-36
                                        hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300
                                        hover:text-white"
                            onClick={() => this.startNewScoreboard()}
                        >
                            Reset scores
                        </button>
                    </div>
                </div>
                <div> {['X', 'O'].includes(winner) ? <RenderConfetti /> : null}</div>
            </div>
        )
    }
}

function isNull(i) {
    return !i
}


function calculateWinner(squares) {
    let winnerResult = {
        winner: null,
        location: Array(3).fill(null)
    }
    let winnerScores = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ]
    for (let score of winnerScores) {
        let [a, b, c] = score;
        if (
            (squares[a] === squares[b])
            && (squares[a] === squares[c])
            && (squares[a])
        ) {
            winnerResult.winner = squares[a];
            winnerResult.location = score;
            return winnerResult;
        }
    }
    if (!squares.some(isNull)) {
        winnerResult.winner = 'Draw';
    }
    return winnerResult;
}

export default Game;