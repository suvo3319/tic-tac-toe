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
    <span className="text-lg font-bold text-[#e1dec7]">{playerName}</span>
  ) : (
    <input
      type="text"
      value={playerName}
      onChange={handleChange}
      required
      className="border border-gray-300 rounded-lg p-1 text-black"
    />
  );

  return (
    <li className={`flex items-center justify-between p-4 ${isActive ? "bg-[#f8ca31] rounded-lg" : "bg-gray-800 rounded-lg"}`}>
      <span className="flex items-center space-x-4">
        {playerClass}
        <span className="ml-4 text-2xl text-[#e1dec7]">{symbol}</span>
      </span>
      <button
        className="bg-[#f8c031] text-black font-bold py-1 px-3 rounded-lg transition-transform duration-200 hover:scale-105 ml-4 md:ml-6"
        onClick={handleEdit}
      >
        {btnCaption}
      </button>
    </li>
  );
}