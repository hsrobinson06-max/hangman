const KEYS = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];
  
  export default function Keyboard({ guessedLetters, addGuessedLetter, disabled = false }) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))",
          gap: "8px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {KEYS.map((key) => {
          const isGuessed = guessedLetters.has(key);
          return (
            <button
              key={key}
              onClick={() => addGuessedLetter(key)}
              disabled={isGuessed || disabled}
              style={{
                fontSize: "1.2rem",
                padding: "10px",
                fontWeight: "bold",
                cursor: isGuessed || disabled ? "not-allowed" : "pointer",
                backgroundColor: isGuessed ? "#ccc" : "#007bff",
                color: isGuessed ? "#666" : "#fff",
                border: "none",
                borderRadius: "4px",
                opacity: isGuessed || disabled ? 0.6 : 1,
              }}
            >
              {key}
            </button>
          );
        })}
      </div>
    );
  }