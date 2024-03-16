import React, { useState } from 'react';

const TodoList = () => {
  const [inputDatta, setInputData] = useState('');
  const [items, setItems] = useState([]);

  const addInput = (e) => {
    setInputData(e.target.value);
  };
  const addItmsBtn = () => {
    if (inputDatta.trim() !== '') {
      setItems((prevData) => {
        return [...prevData, inputDatta];
      });
      setInputData('');
    }
  };
  const deleteItem = (indexToDelete) => {
    setItems(prevData => prevData.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-8">TodoList</h2>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Add items"
          value={inputDatta}
          className="border-2 p-3 rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={addInput}
        />
        <button
          className="bg-blue-500 text-white p-3 rounded-r-md ml-2 hover:bg-blue-700"
          onClick={addItmsBtn}
        >
          Add
        </button>
      </div>
      <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((prev, index) => (
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:bg-red-500 hover:text-white rounded-full"
              onClick={()=>deleteItem(index)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <li
              key={index}
              id={index}
              className="bg-white rounded-lg shadow-md py-3 px-6 border border-gray-200"
            >
              {prev}
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default TodoList;
