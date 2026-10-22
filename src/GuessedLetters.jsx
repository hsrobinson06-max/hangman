export default function GuessedLetters({guessedLetters}) {
  if (guessedLetters.size === 0) return null;

  return (
    <div style={{margin: "20px 0"}}>
      <h3>Letters Used:</h3>
      <div 
        style={{ 
          display: "flex", 
          gap: "8px", 
          justifyContent: "center", 
          flexWrap: "wrap",
          maxWidth: "400px",
          margin: "0 auto"
        }}
      >
        {Array.from(guessedLetters).sort().map((letter) => (
          <span
            key={letter}
            style={{
              padding: "8px 14px",
              backgroundColor: "#e2e8f0",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
