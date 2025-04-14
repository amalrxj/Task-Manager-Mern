import { useRef, useState } from "react";
import React from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100/50 border-2 border-slate-300 relative cursor-pointer">
          <LuUser className="text-4xl text-primary" />

          <button type="button" className="" onClick={onChooseFile}>
            <LuUpload className="" />
          </button>
        </div>
      ) : (
        <div className="">
          <img src={previewUrl} alt="Profile Preview" className="" />
          <button type="button" className="" onClick={handleRemoveImage}>
            <LuTrash className="" />
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfilePhotoSelector;
