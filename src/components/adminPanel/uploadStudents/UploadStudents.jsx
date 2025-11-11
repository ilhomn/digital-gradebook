import React from "react";
import "./UploadStudents.css";
import Navbar from "../navbarAdminPanel/Navbar";
import IP from "../../../config";

function UploadStudents() {
  const [file, setFile] = React.useState(null);
  const fileName = file ? file.name : "No file chosen";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
        body: formData,
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
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="containerUploadStudents">
        <div className="itemUploadStudents">
          <input
            id="fileUpload"
            type="file"
            className="fileInput"
            onChange={handleFileChange}
          />
          <label htmlFor="fileUpload" className="fileLabel">
            Choose file
          </label>
          <span className="fileName">{fileName}</span>
          <button type="button" onClick={uploadFile}>
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadStudents;
