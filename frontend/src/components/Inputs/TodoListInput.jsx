import React from "react";
import { useState } from "react";
import { HiOutlineTrash, HiPlusSm } from "react-icons/hi";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedTodoList = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedTodoList);
  };

  return (
    <div>
      {todoList.map((todo, index) => (
        <div
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2 "
          key={index}
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {todo}
          </p>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-red-500 text-lg" />
          </button>
        </div>
      ))}
      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          value={option}
          onChange={({ target }) => setOption(target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
          placeholder="Add a new task"
          className="w-full text-sm text-black bg-white border border-gray-100 rounded-md px-3 py-2 outline-none "
        />
        <button
          className="card-btn text-nowrap"
          onClick={() => handleAddOption()}
        >
          <HiPlusSm className="text-lg" />
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
