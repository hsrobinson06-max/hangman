/**
 * HangmanVisual Component
 * Responsible for rendering the correct hangman status image based on the number of incorrect guesses.
 * Supports 5 lives using 6 progressive photos (indices 0 to 5)[cite: 1].
 */
export default function HangmanVisual({ numberOfGuesses }) {
  // Clamp the image index between 0 and 5 to prevent loading out-of-bounds files
  const imageIndex = Math.min(numberOfGuesses, 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px 0" }}>
      {/* Dynamic image source mapping to files inside the public folder */}
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
      {/* Live count text tracker */}
      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        Lives Remaining: {Math.max(6 - numberOfGuesses, 0)} / 6
      </p>
    </div>
  );
}