import { useState } from "react";
import "./styles.css";

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: "Lora",
      avatar: "https://i.pravatar.cc/48?u=knight",
      score: 0,
    },
    {
      id: 2,
      name: "Kenzo",
      avatar: "https://i.pravatar.cc/48?u=wizard",
      score: 0,
    },
  ]);

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

  function handleAddCharacter(newChar) {
    setCharacters((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newChar.name,
        avatar:
          newChar.avatar ||
          `https://i.pravatar.cc/48?u=${newChar.name.toLowerCase()}`,
        score: 0,
      },
    ]);
  }

  function handleDeleteCharacter(id) {
    setCharacters((chars) => chars.filter((char) => char.id != id));
    if (selectedCharacter?.id === id) {
      setSelectedCharacter(null);
    }
  }

  return (
    <div>
      <h1>Score Tracker</h1>

      <CharacterList
        characters={characters}
        selectedCharacter={selectedCharacter}
        onSelect={handleSelect}
        onDelete={handleDeleteCharacter}
      />

      <AddCharacterForm onAdd={handleAddCharacter} />

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

function CharacterItem({ char, isSelected, onSelect, onDelete }) {
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
          <button
            onClick={() => onDelete(char.id)}
            style={{ marginLeft: "0.5rem" }}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

function CharacterList({ characters, selectedCharacter, onSelect, onDelete }) {
  return (
    <ul>
      {characters.map((char) => (
        <CharacterItem
          key={char.id}
          char={char}
          isSelected={selectedCharacter?.id === char.id}
          onSelect={onSelect}
          onDelete={onDelete}
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

function AddCharacterForm({ onAdd }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), avatar: avatar.trim() });
    setName("");
    setAvatar("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h2>Add a new character</h2>
      <label>
        Name:{" "}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Avatar URL (optional):{" "}
        <input value={avatar} onChange={(e) => setAvatar(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add character</button>
    </form>
  );
}

export default App;
