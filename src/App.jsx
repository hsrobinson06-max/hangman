import { useState, useEffect } from "react";
import HangmanVisual from "./HangmanVisual";
import HangmanWord from "./HangmanWord";
import GuessedLetters from "./GuessedLetters";
import "./App.css";

// Set a single static word to guess
const WORD_TO_GUESS = "MOREHOUSE";
const MAX_LIVES = 6;

export default function App() {
  // State: Holds the single target word
  const [wordToGuess, setWordToGuess] = useState(WORD_TO_GUESS);

  // State: Tracks all unique letters attempted by the player using a JavaScript Set
  const [guessedLetters, setGuessedLetters] = useState(new Set());

  // Calculate the total number of incorrect guesses made
  const incorrectGuesses = Array.from(guessedLetters).filter(
    (letter) => !wordToGuess.includes(letter)
  ).length;

  // Define win and loss triggers (5 lives limit)
  const isLost = incorrectGuesses >= MAX_LIVES;
  const isWon = wordToGuess
    .split("")
    .every((letter) => guessedLetters.has(letter));

  // Helper function to process and register a newly typed letter
  const addGuessedLetter = (letter) => {
    if (guessedLetters.has(letter) || isWon || isLost) return;
    setGuessedLetters((currentLetters) => {
      const newLetters = new Set(currentLetters);
      newLetters.add(letter);
      return newLetters;
    });
  };

  // Effect: Global physical keyboard listener for typing letters one at a time
  useEffect(() => {
    const handler = (e) => {
      const key = e.key.toUpperCase();
      // Only process standard alphabetic keys (A through Z)
      if (key.match(/^[A-Z]$/)) {
        addGuessedLetter(key);
      }
    };

    window.addEventListener("keydown", handler);
    // Cleanup event listener when component unmounts or state updates
    return () => window.removeEventListener("keydown", handler);
  }, [guessedLetters, isWon, isLost]);

  // Function to reset the game state back to the single word with cleared guesses
  const resetGame = () => {
    setWordToGuess(WORD_TO_GUESS);
    setGuessedLetters(new Set());
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h1>Hangman Game</h1>
      <p style={{ color: "#555" }}>Type any letter on your keyboard to play!</p>

      {/* Win/Loss pop-up overlay modal */}
      {(isWon || isLost) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isWon ? "You Won!" : "Game Over!"}</h2>
            <p>
              {isWon
                ? "Great job guessing the word!"
                : `The word was: ${wordToGuess}`}
            </p>
            <button className="btn-new-game" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Component: Visual hangman picture display */}
      <HangmanVisual numberOfGuesses={incorrectGuesses} maxLives={MAX_LIVES}/>

      {/* Component: Hidden word blanks and revealed characters */}
      <HangmanWord
        wordToGuess={wordToGuess}
        guessedLetters={guessedLetters}
        isLost={isLost}
      />

      {/* Component: Clean list of already used letters */}
      <GuessedLetters guessedLetters={guessedLetters} />

      {/* Manual New Game trigger button */}
      <div style={{ marginTop: "30px" }}>
        <button className="btn-new-game" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
}