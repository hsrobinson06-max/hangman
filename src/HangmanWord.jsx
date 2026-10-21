/**
 * HangmanWord Component
 * Renders the target word's underscores and reveals correctly guessed letters,
 * or unmasks missed letters in red when the game is lost.
 */
export default function HangmanWord({ wordToGuess, guessedLetters, isLost = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.25em",
        fontSize: "2.5rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      {/* Split the target word string into individual characters and map over them */}
      {wordToGuess.split("").map((letter, index) => {
        const isGuessed = guessedLetters.has(letter);
        // Show letter if it was guessed correctly, or if the game is lost (game over reveal)
        const shouldShow = isGuessed || isLost;

        return (
          <span
            key={index}
            style={{
              borderBottom: "0.1em solid black",
              minWidth: "40px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                visibility: shouldShow ? "visible" : "hidden",
                // Highlight un-guessed letters in red when game is lost
                color: !isGuessed && isLost ? "red" : "black",
              }}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
}