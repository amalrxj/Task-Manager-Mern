import React from "react";

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {avatars
        .slice(0, maxVisible)
        .map(
          (avatar, index) =>
            avatar && (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index}`}
                className="w-9 h-9 rounded-full border-2 border-white bg-gray-50 -ml-3 first:ml-0"
              />
            )
        )}
      {avatars.length > maxVisible && (
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-sm font-medium text-gray-700 -ml-3 border border-white ">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
