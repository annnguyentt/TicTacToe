import React from "react";

function Square({ onClick, value } = {}) {
    return (
        <button
            onClick={() => { onClick() }}
            className="Square w-full text-5xl border-r-4 border-text-white">{value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            onClick={() => { this.props.onClick(i) }}
            value={this.props.squares[i]}
        />;
    }

    render() {
        let player = calculateWinner(this.props.squares) ? 'Winner ' + calculateWinner(this.props.squares) :
            !this.props.squares.some(isNull) ? 'Draw' :
                this.props.isNext ? 'Player X' : 'Player O'
        return (
            <div className="Board flex flex-col items-center justify-center p-5 text-white text-2xl">
                <div>{player}</div>
                <div className="text-white w-2/3 md:w-1/3 xl:w-1/4 grid grid-rows-3 aspect-square mt-5
                 border-t-4 border-l-4 border-b-4 border-text-white">
                    <div className="Row grid grid-cols-3 border-b-4 border-text-white">
                        {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
                    </div>
                    <div className="Row grid grid-cols-3 border-b-4 border-text-white">
                        {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
                    </div>
                    <div className="Row grid grid-cols-3">
                        {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
                    </div>
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(""),
            isNext: true
        }
    }

    handleClick(i) {
        const newSquares = this.state.squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = this.state.isNext ? 'X' : 'O';
        this.setState({
            squares: newSquares,
            isNext: !this.state.isNext
        })
    }

    jumpToStart() {
        const newSquares = Array(9).fill(null);
        this.setState({
            squares: newSquares,
            isNext: true
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Board
                        squares={this.state.squares}
                        onClick={i => this.handleClick(i)}
                        isNext={this.state.isNext}
                    />
                    <button className="flex items-center justify-center mx-auto my-5 text-indigo-600
                                        bg-white rounded px-6 py-2 uppercase font-semibold tracking-wide
                                        hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300
                                        hover:text-white"
                        onClick={() => this.jumpToStart()}
                    >
                        New game
                    </button>
                </div>
            </div>
        )
    }
}

function isNull(i) {
    return !i
}

function calculateWinner(squares) {
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
            && (squares[a] === squares[c])) {
            return squares[a]
        }
    }
    return null;
}

export default Game;