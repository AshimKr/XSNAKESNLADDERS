import React, { useMemo, useState } from "react";
import "./App.css";

const BOARD_SIZE = 100;

const ladders = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  63: 81,
  71: 91,
};

const snakes = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

function App() {
  const [player1, setPlayer1] = useState(1);
  const [player2, setPlayer2] = useState(1);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [dice, setDice] = useState(null);

  const cells = useMemo(() => {
    const arr = [];

    for (let row = 9; row >= 0; row--) {
      const start = row * 10 + 1;
      const nums = [];

      for (let i = 0; i < 10; i++) {
        nums.push(start + i);
      }

      if ((9 - row) % 2 === 1) {
        nums.reverse();
        }

      arr.push(...nums);
    }

    return arr;
  }, []);

  const movePlayer = () => {
    if (winner) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);

    if (turn === 1) {
      let next = player1 + roll;

      if (next <= 100) {
        if (ladders[next]) {
          next = ladders[next];
        } else if (snakes[next]) {
          next = snakes[next];
        }
      } else {
        next = player1;
      }

      setPlayer1(next);

      if (next === 100) {
        setWinner("Player 1 wins!");
        return;
      }
      setTurn(2);
    } else {
      let next = player2 + roll;

      if (next <= 100) {
        if (ladders[next]) {
          next = ladders[next];
        } else if (snakes[next]) {
          next = snakes[next];
        }
      } else {
        next = player2;
      }

      setPlayer2(next);

      if (next === 100) {
        setWinner("Player 2 wins!");
        return;
      }

      setTurn(1);
    }
  };

  const resetGame = () => {
    setPlayer1(1);
    setPlayer2(1);
    setTurn(1);
    setWinner(null);
    setDice(null);
  };

  const getCellLabel = (num) => {
    if (ladders[num]) {
      return `L→${ladders[num]}`;
    }

    if (snakes[num]) {
      return `S→${snakes[num]}`;
    }

    return "";
  };

  return (
    <div className="app">
      <div className="game-container">
        <h1>Snake & Ladders</h1>

        {winner ? (
          <div className="winner-text">🏆 {winner}</div>
        ) : (
          <div className="turn-text">
            Turn:
            <span className={turn === 1 ? "player1-badge" : "player2-badge"}>
              P{turn}
            </span>
          </div>
        )}

        <div className="legend">
          <div>
            <span className="dot red"></span> P1
          </div>
          <div>
            <span className="dot blue"></span> P2
          </div>
        </div>

        <div className="board">
          {cells.map((num) => (
            <div key={num} className="cell">
              <div className="cell-number">{num}</div>

              {getCellLabel(num) && (
                <div
                  className={`marker ${
                    ladders[num] ? "ladder" : "snake"
                  }`}
                >
                  {getCellLabel(num)}
                </div>
              )}

              <div className="players">
                {player1 === num && <div className="player p1">P1</div>}
                {player2 === num && <div className="player p2">P2</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="buttons">
          <button className="roll-btn" onClick={movePlayer}>
            🎲 Roll Dice {dice ? `(${dice})` : ""}
          </button>

          <button className="reset-btn" onClick={resetGame}>
            Reset
          </button>
        </div>

        <p className="footer-text">
          Exact 100 is required to win. Land on a ladder to climb up, a
          snake to slide down.
        </p>
      </div>
    </div>
  );
}

export default App;