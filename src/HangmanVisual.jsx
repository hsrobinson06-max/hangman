export default function HangmanVisual({numberOfGuesses}) {
  const imageIndex = Math.min(numberOfGuesses, 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px 0" }}>
      <img 
        src={`/hangman-${imageIndex}.png`} 
        alt={`Hangman status ${imageIndex} of 6`} 
        style={{ 
          width: "200px", 
          height: "200px", 
          objectFit: "contain",
          border: "2px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9"
        }} 
      />
      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        Guesses Left: {Math.max(6 - numberOfGuesses, 0)} / 6
      </p>
    </div>
  );
}
