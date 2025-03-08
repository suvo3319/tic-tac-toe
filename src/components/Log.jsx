export default function Log({ turns }) {
  return (
    <ol id="log" className="max-w-md mx-auto my-4 p-4 bg-gray-800 rounded-lg shadow-lg text-[#e1dec7]">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`} className="border-b border-gray-600 py-2 last:border-b-0">
          <span className="font-bold">{turn.player}</span> selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
}