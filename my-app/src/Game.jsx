import React from "react";
import Confetti from 'react-confetti'


function Square({ onClick, value, isHighlighted } = {}) {
    const defaultClass = "Square font-Fredoka-One w-full text-5xl transition ease-in-out border-2 border-white "
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
                <div className="text-white w-2/3 md:w-1/3 xl:w-1/4 grid grid-rows-3 aspect-square
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

function PlayerTurn() {
    return (
        <div className="flex items-center justify-center pt-9 text-white font-bold">
            <div className="grid grid-cols-3 text-center">
                <div>
                    <h2>PLAYER 1 (X)</h2>
                    <div>1</div>
                </div>
                <div>
                    <h2>TIE</h2>
                    <div>1</div>
                </div>
                <div>
                    <h2>PLAYER 2 (O)</h2>
                    <div>2</div>
                </div>
            </div>
        </div>
    )
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(""),
            isStartedWithO: false,
            isONext: true,
            winner: null,
            winningLocation: Array(3).fill(null),
        }
    }

    handleClick(i) {
        const newSquares = this.state.squares.slice();
        const winner = calculateWinner(newSquares).winner;

        if (winner) {
            this.setState({
                isStartedWithO: !this.state.isStartedWithO
            })
            return;
        }
        else if (winner || newSquares[i]) {
            return;
        }
        newSquares[i] = this.state.isONext ? 'X' : 'O';
        this.setState({
            squares: newSquares,
            isONext: !this.state.isONext,
            winner: calculateWinner(newSquares).winner,
        })
    }

    jumpToStart() {
        const newSquares = Array(9).fill(null);
        this.setState({
            squares: newSquares,
            isONext: true
        })
    }

    render() {
        const winner = this.state.winner;
        let label = winner ? 'Winner ' + winner :
            !this.state.squares.some(isNull) ? 'Draw' :
                this.state.isONext ? 'Player 1 - X' : 'Player 2 - O'
        return (
            <div>
                <h1 className="text-4xl pt-10 text-white font-bold flex items-center justify-center font-Fredoka-One">
                    Tic-Tac-Toe</h1>
                <div>
                    <PlayerTurn />
                    <Board
                        squares={this.state.squares}
                        onClick={i => this.handleClick(i)}
                        isONext={this.state.isONext}
                    />
                    <div className="flex flex-col items-center md:flex-row md:justify-center my-5">
                        <button className="my-4 md:my-0 flex items-center justify-center text-indigo-600 mx-2 text-sm
                                        bg-white rounded p-2 uppercase font-semibold tracking-wide w-36
                                        hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300
                                        hover:text-white"
                            onClick={() => this.jumpToStart()}
                        >
                            New game
                        </button>
                        <button className="flex items-center justify-center text-indigo-600 mx-2 text-sm
                                        bg-white rounded p-2 uppercase font-semibold tracking-wide w-36
                                        hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300
                                        hover:text-white"
                            onClick={() => this.jumpToStart()}
                        >
                            Reset scores
                        </button>
                    </div>
                </div>
                <div> {winner ? <RenderConfetti /> : null}</div>
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
    return winnerResult;
}

export default Game;