import React from "react";
import { useState } from "react";
import { HiOutlineTrash, HiPlusSm } from "react-icons/hi";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [option, setOption] = useState("");
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedAttachments = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedAttachments);
  };

  return (
    <div>
      {attachments.map((attachment, index) => (
        <div
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2 "
          key={index}
        >
          <div className="flex-1 flex items-center gap-3 border border-gray-100">
            <LuPaperclip className="text-gray-400" />
            <p className="text-xs text-black">{attachment}</p>
          </div>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-red-500 text-lg" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <div className="flex items-center flex-1 gap-3 border border-gray-100 px-3 rounded-md">
          <LuPaperclip className="text-gray-400" />

          <input
            type="text"
            value={option}
            onChange={({ target }) => setOption(target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
            placeholder="Add a new attachment"
            className="w-full text-sm text-black bg-white rounded-md py-2 outline-none border border-gray-100"
          />
        </div>
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

export default AddAttachmentsInput;
