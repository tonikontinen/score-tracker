import { useState } from "react";
import "./styles.css";

function App() {
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: "Lora",
      avatar: "https://i.pravatar.cc/48?u=knight",
      score: 10,
    },
    {
      id: 2,
      name: "Kenzo",
      avatar: "https://i.pravatar.cc/48?u=wizard",
      score: -5,
    },
  ]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  function handleSelect(char) {
    setSelectedCharacter((current) => (current?.id === char.id ? null : char));
  }

  function handleAdjustScore(delta) {
    setCharacters((chars) =>
      chars.map((char) =>
        char.id === selectedCharacter.id
          ? { ...char, score: char.score + delta }
          : char
      )
    );
    setSelectedCharacter(null);
  }

  return (
    <div>
      <h1>Score Tracker</h1>

      <CharacterList
        characters={characters}
        selectedCharacter={selectedCharacter}
        onSelect={handleSelect}
      />

      {selectedCharacter && (
        <div style={{ marginTop: "2rem" }}>
          👉 You selected <strong>{selectedCharacter.name}</strong>
        </div>
      )}

      {selectedCharacter && (
        <ScoreAdjustForm
          character={selectedCharacter}
          onAdjust={handleAdjustScore}
        />
      )}
    </div>
  );
}

// CharacterItem Component
function CharacterItem({ char, isSelected, onSelect }) {
  return (
    <li>
      <div className="character">
        <img src={char.avatar} alt={char.name} />
        <div>
          <h3>{char.name}</h3>
          <p>{char.score} points</p>
          <button onClick={() => onSelect(char)}>
            {isSelected ? "Close" : "Select"}
          </button>
        </div>
      </div>
    </li>
  );
}

function CharacterList({ characters, selectedCharacter, onSelect }) {
  return (
    <ul>
      {characters.map((char) => (
        <CharacterItem
          key={char.id}
          char={char}
          isSelected={selectedCharacter?.id === char.id}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

function ScoreAdjustForm({ character, onAdjust }) {
  const [scoreInput, setScoreInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const parsed = Number(scoreInput);
    if (isNaN(parsed)) return;
    onAdjust(parsed);
    setScoreInput("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <label>
        Adjust score for {character.name}:{" "}
        <input
          type="number"
          value={scoreInput}
          onChange={(e) => setScoreInput(e.target.value)}
        />
      </label>
      <button type="submit">Apply</button>
    </form>
  );
}

export default App;
