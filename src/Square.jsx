import React from "react";

function Square({ onClick, value, isHighlighted } = {}) {
  const defaultClass =
    "Square font-Fredoka-One w-full text-6xl transition ease-in-out border-2 border-white ";
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={
        isHighlighted
          ? defaultClass + " bg-black animate-[pulse_1s_ease-in_1_backwards]"
          : defaultClass
      }
    >
      {value}
    </button>
  );
}

export default Square;
