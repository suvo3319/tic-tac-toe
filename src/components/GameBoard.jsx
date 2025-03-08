export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board" className="flex flex-col items-center space-y-4">
      {board.map((row, rowIndex) => (
        <li key={rowIndex} className="flex justify-center">
          <ol className="flex space-x-4">
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                  className={`w-20 h-20 text-4xl font-bold rounded-lg transition-colors duration-200 
                    ${playerSymbol === null ? 'bg-[#aca788] text-[#3f3b00] hover:bg-[#f8ca31]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}