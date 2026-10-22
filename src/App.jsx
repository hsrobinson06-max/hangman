import { useState, useEffect } from "react";
import HangmanVisual from "./HangmanVisual";
import HangmanWord from "./HangmanWord";
import GuessedLetters from "./GuessedLetters";
import "./App.css";

const WORD_TO_GUESS = "MOREHOUSE";
const MAX_LIVES = 6;

export default function App() {
  const [wordToGuess, setWordToGuess] = useState(WORD_TO_GUESS);

  const [guessedLetters, setGuessedLetters] = useState(new Set());

  const incorrectGuesses = Array.from(guessedLetters).filter(
    (letter) => !wordToGuess.includes(letter)
  ).length;

  const isLost = incorrectGuesses >= MAX_LIVES;
  const isWon = wordToGuess
    .split("")
    .every((letter) => guessedLetters.has(letter));

  const addGuessedLetter = (letter) => {
    if (guessedLetters.has(letter) || isWon || isLost) return;
    setGuessedLetters((currentLetters) => {
      const newLetters = new Set(currentLetters);
      newLetters.add(letter);
      return newLetters;
    });
  };

  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toUpperCase();
      if (key.match(/^[A-Z]$/)) {
        addGuessedLetter(key);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [guessedLetters, isWon, isLost]);

  const resetGame = () => {
    setWordToGuess(WORD_TO_GUESS);
    setGuessedLetters(new Set());
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h1>Hangman Game</h1>
      <p style={{ color: "#555" }}>Type any letter on your keyboard to play!</p>

      {(isWon || isLost) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isWon ? "You Win!" : "Game Over!"}</h2>
            <p>
              {isWon
                ? "You Win!"
                : `The word was: ${wordToGuess}`}
            </p>
            <button className="btn-new-game" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}

      <HangmanVisual numberOfGuesses={incorrectGuesses} maxLives={MAX_LIVES}/>

      <HangmanWord
        wordToGuess={wordToGuess}
        guessedLetters={guessedLetters}
        isLost={isLost}
      />

      <GuessedLetters guessedLetters={guessedLetters} />

      <div style={{marginTop: "30px"}}>
        <button className="btn-new-game" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
}
