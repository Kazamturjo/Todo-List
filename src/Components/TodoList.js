import React, { useState, useEffect } from 'react';

const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
};

const TodoList = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [editIndex, setEditIndex] = useState(-1); // Track the index of the item being edited
  const [editValue, setEditValue] = useState(''); // Track the value of the item being edited

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items));
  }, [items]);

  const addInput = (e) => {
    setInputData(e.target.value);
  };

  const addItemsBtn = () => {
    if (!inputData) {
      return;
    }
    setItems([...items, inputData]);
    setInputData('');
  };

  const deleteItem = (indexToDelete) => {
    setItems((prevData) => prevData.filter((_, index) => index !== indexToDelete));
  };

  const editItem = (index) => {
    setEditIndex(index);
    setEditValue(items[index]);
  };

  const updateItem = (index) => {
    if (!editValue) {
      return;
    }
    const updatedItems = [...items];
    updatedItems[index] = editValue;
    setItems(updatedItems);
    setEditIndex(-1);
    setEditValue('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-8">TodoList</h2>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Add items"
          value={inputData}
          className="border-2 p-3 rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={addInput}
        />
        <button
          className="bg-blue-500 text-white p-3 rounded-r-md ml-2 hover:bg-blue-700"
          onClick={addItemsBtn}
        >
          Add
        </button>
      </div>
      <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((prev, index) => (
          <div className="flex items-center gap-4" key={index}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:bg-red-500 hover:text-white rounded-full cursor-pointer"
              onClick={() => deleteItem(index)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            {editIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => updateItem(index)}
                autoFocus
              />
            ) : (
              <li className="bg-white rounded-lg shadow-md py-3 px-6 border border-gray-200">
                {prev}
              </li>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:bg-blue-400 hover:text-white duration-200"
              onClick={() => editItem(index)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default TodoList;
