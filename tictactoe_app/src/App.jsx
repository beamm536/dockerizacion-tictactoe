/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { checkEndGame } from "./logic/board";
import "./App.css";

function App() {
  const [board, setBoard] = useState(() => {
    // Recuperamos el tablero del localStorage
    const boardFromStorage = window.localStorage.getItem("board");

    // Si hay tablero en el localStorage, lo usamos
    if (boardFromStorage) {
      return JSON.parse(boardFromStorage);
    } else {
      // Si no hay tablero en el localStorage, lo creamos
      return Array(9).fill(null);
    }
  });

  const [turn, setTurn] = useState( () => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  // Null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    // Limpiar el localStorage
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    // No actualizar si ya hay un valor
    // No actualizar si ya hay un ganador
    if (board[index] || winner) {
      return;
    }

    // Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn; // X or O
    setBoard(newBoard);

    // Actualizar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardar aqui la partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      // Disparar confetti
      confetti({
        particleCount: 207,
        spread: 107,
        origin: { y: 0.4 },
      });
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar el juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
