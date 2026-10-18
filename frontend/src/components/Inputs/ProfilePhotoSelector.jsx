// Components/Inputs/ProfilePhotoSelector.jsx
import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import { BASE_URL } from "../../Utils/apiPaths";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    };
  }, [filePreviewUrl]);

  const previewUrl =
    image instanceof File
      ? filePreviewUrl
      : typeof image === "string"
        ? image.startsWith("http")
          ? image
          : `${BASE_URL}${image.startsWith("/") ? image : `/${image}`}`
        : null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFilePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFilePreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl && (
        <div className="relative">
          <div
            className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer hover:bg-purple-200 transition-colors"
            onClick={() => inputRef.current.click()}
          >
            <LuUser className="text-4xl text-primary" />
          </div>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 hover:bg-primary-dark transition-colors"
            onClick={() => inputRef.current.click()}
          >
            <LuUpload />
          </button>
        </div>
      )}

      {previewUrl && (
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden cursor-pointer border-2 border-gray-200" onClick={() => inputRef.current.click()}>
            <img src={previewUrl} alt="profile preview" className="w-full h-full object-cover" />
          </div>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-red-600 transition-colors"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
