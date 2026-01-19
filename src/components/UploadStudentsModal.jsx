import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import "./UploadStudentsModal.css";
import IP from "../config";

const UploadStudentsModal = ({ isOpen, onClose }) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) setFile(droppedFile);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (file) await onUpload(file);
        setLoading(false);
        onClose();
        window.location.reload();
    };

    const onUpload = async (file) => {
        if (!file) {
            alert("Ты хотябы мяу мяу скажи");
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${IP}/upload-students`, {
                method: "POST",
                headers: {
                    "token": token,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();

                alert(data.message);
            } else {
                alert("Error while uploading students");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className={`modal-backdrop ${isOpen ? "open" : ""}`}
            onClick={onClose}  // close when clicking outside
        >
            <div
                className={`modal-card ${isOpen ? "open" : ""}`}
                onClick={(e) => e.stopPropagation()}  // prevent close when clicking inside
            >
                <div className="modal-header">
                    <h2>Upload Students</h2>
                    <button className="close-btn" onClick={onClose}>
                        <IoClose />
                    </button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div
                        className={`drop-zone ${isDragging ? "dragging" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        {file ? (
                            <p>
                                Selected: <strong>{file.name}</strong>
                            </p>
                        ) : (
                            <p>Drag & drop JSON file here <br /> or click to select</p>
                        )}
                    </div>

                    <input
                        id="fileInput"
                        type="file"
                        accept=".json"
                        onChange={handleFileChange}
                        className="hidden-file-input"
                    />

                    <button type="submit" className="submit-btn" disabled={!file || loading}>
                        {loading ? "Uploading..." : "Upload Students"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadStudentsModal;
