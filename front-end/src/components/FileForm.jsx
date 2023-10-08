import React, { useState, useRef } from "react";

const FileForm = ({ onSubmit, fileType }) => {
  const fileInputRef = useRef(null);
  const [fileError, setFileError] = useState("");

  const validateFileType = (type) => {
    if (type !== fileType) {
      const fileLabel =
        fileType.toUpperCase() === "PPTX"
          ? "PowerPoint"
          : fileType.toUpperCase() === "DOCX"
          ? "Word"
          : fileType.toUpperCase();
      setFileError(`Invalid file type. Please choose a ${fileLabel} file.`);
      return false;
    }
    setFileError("");
    return true;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const type = e.target[0].value.split(".").pop();
    const isValidFileType = validateFileType(type);

    if (isValidFileType) {
      onSubmit(e);
    } else {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      method="post"
      onSubmit={handelSubmit}
      className="flex flex-col items-center space-y-4"
    >
      <label htmlFor="file" className="text-lg font-semibold text-gray-700">
        Choose a{" "}
        {fileType.toUpperCase() === "PPTX"
          ? "PowerPoint"
          : fileType.toUpperCase() === "DOCX"
          ? "WORD"
          : fileType.toUpperCase()}{" "}
        file
      </label>
      <input
        ref={fileInputRef}
        type="file"
        name={`${fileType.toLowerCase()}File`}
        id="file"
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
      />
      {fileError && (
        <p
          className="text-red-500 text-sm bg-red-100 border border-red-300 p-2 rounded-md"
          role="alert"
        >
          {fileError}
        </p>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

export default FileForm;
