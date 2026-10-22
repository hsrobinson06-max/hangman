export default function HangmanWord({wordToGuess, guessedLetters, isLost = false}) {
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
      {wordToGuess.split("").map((letter, index) => {
        const isGuessed = guessedLetters.has(letter);
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
