import React from "react";
import Square from "./Square";
import { calculateWinner } from "./utils_func";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        onClick={() => {
          this.props.onClick(i);
        }}
        value={this.props.squares[i]}
        isHighlighted={calculateWinner(this.props.squares).location.includes(i)}
      />
    );
  }

  render() {
    return (
      <div className="Board flex flex-col items-center justify-center p-5 text-white text-2xl">
        <div
          className="text-white w-2/3 sm:w-1/3 xl:w-1/4 grid grid-rows-3 aspect-square
                   border-2 border-white"
        >
          <div className="Row grid grid-cols-3 ">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="Row grid grid-cols-3 ">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="Row grid grid-cols-3 ">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
