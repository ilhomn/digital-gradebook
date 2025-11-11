import React, { useState } from "react";
import "./UploadStudents.css";
import IP from "../../../config";

function UploadStudents() {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileName = file ? file.name : "No file chosen";
  fileName.slice(0, 20);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please choose a file before uploading");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${IP}/upload-students`, {
        method: "POST",
        headers: {
          token: window.localStorage.getItem("token"),
        },
        body: file,
      });

      if (response.ok) {
        alert("File uploaded successfully");
        setFile(null);
      } else {
        alert("Failed to upload file");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Error uploading file (see console)");
    }
  };

  return (
    <div className="containerUploadStudents">
      <div className={`itemUploadStudents ${dragOver ? "dragOver" : ""}`}>
        <div
          className="dropZone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("fileUpload").click()}
        >
          {file
            ? `Selected: ${file.name}`
            : "Drag & drop your file here or click to select"}
        </div>

        <input
          id="fileUpload"
          type="file"
          className="fileInput"
          onChange={handleFileChange}
        />

        {file && <span className="fileName">{file.name}</span>}

        <button type="button" onClick={uploadFile}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadStudents;
