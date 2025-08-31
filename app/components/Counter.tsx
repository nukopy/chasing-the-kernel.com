import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Counter</h2>

      <div className="text-center mb-6">
        <span className="text-4xl font-bold text-black">{count}</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={increment}
            className="flex-1 bg-blue-100 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded transition-colors border border-blue-300"
            type="button"
          >
            +1
          </button>
          <button
            onClick={decrement}
            className="flex-1 bg-red-100 hover:bg-red-200 text-black font-bold py-2 px-4 rounded transition-colors border border-red-300"
            type="button"
          >
            -1
          </button>
        </div>
        <button
          onClick={reset}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded transition-colors border border-gray-300"
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
