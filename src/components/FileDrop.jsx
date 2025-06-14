import React, { useState } from "react";

const FileDrop = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col mt-2 px-6 w-full">
      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`transition-all border-2 border-dashed rounded-3xl cursor-pointer h-64 flex flex-col items-center justify-center ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-neutral-300 "
        } shadow-sm hover:shadow-md duration-300`}
      >
        <svg
          className="w-12 h-12 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M6 18l21 21 21-21"
          ></path>
        </svg>
        <p className="text-sm text-gray-600 font-medium">
          {file ? file.name : "Drag & drop a file here, or click to select"}
        </p>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      {file && (
        <p className="mt-4 text-sm text-gray-500">
          ✅ <span className="font-semibold">{file.name}</span> selected
        </p>
      )}
    </div>
  );
};

export { FileDrop };
