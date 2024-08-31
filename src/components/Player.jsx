import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);

  const [isEditing, setIsEditing] = useState(false);

  const btnCaption = isEditing ? "Save" : "Edit";

  const handleEdit = () => {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };

  const playerClass = !isEditing ? (
    <span className="player-name">{playerName}</span>
  ) : (
    <input type="text" value={playerName} onChange={handleChange} required />
  );
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerClass}

        <span className="player-symbol">{symbol}</span>
      </span>

      <button className="player-info" onClick={handleEdit}>
        {btnCaption}
      </button>
    </li>
  );
}
