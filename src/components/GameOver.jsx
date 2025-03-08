export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over" className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-75">
      <h2 className="font-caprasimo text-4xl text-center text-[#fcd256] mb-4">Game Over!</h2>
      {winner ? (
        <p className="text-2xl text-center text-[#e1dec7]">{winner} Won!</p>
      ) : (
        <p className="text-2xl text-center text-[#e1dec7]">It's a draw</p>
      )}
      <p>
        <button
          onClick={onRestart}
          className="mt-6 px-4 py-2 text-xl font-bold text-white bg-[#f8c031] rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
        >
          Rematch!
        </button>
      </p>
    </div>
  );
}