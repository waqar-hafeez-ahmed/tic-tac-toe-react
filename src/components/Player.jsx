import { useState } from "react";

function Player({ initialName, symbol, isActive, onNameChange }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditting, setIsEditting] = useState(false);

  function handleEdit() {
    setIsEditting((editing) => !editing); //react schedules state update, this way we get latest state.

    if (isEditting) {
      onNameChange(symbol, playerName);
    }
  }

  function handlePlayerName(event) {
    setPlayerName(event.target.value);
  }

  let playerNameInital = <span className="player-name">{playerName}</span>;
  if (isEditting) {
    playerNameInital = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handlePlayerName}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameInital}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditting ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
