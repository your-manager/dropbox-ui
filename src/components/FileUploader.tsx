import React, { useState, useRef } from "react";
import { uploadFile } from "../services/fileService";

export const FileUploader = ({ fetchFiles }: { fetchFiles: () => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload!");
      return;
    }

    try {
      await uploadFile(selectedFile);
      setSelectedFile(null);

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert("File uploaded successfully!");
      fetchFiles(); // Refresh the file list
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Please try again later.");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef} // Reference to the input field
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
