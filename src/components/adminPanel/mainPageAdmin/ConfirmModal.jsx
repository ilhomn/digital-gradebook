import React, { useState } from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  const [password, setPassword] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(password);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="password-input"
        />
        <div className="modal-buttons">
          <button onClick={handleConfirm} className="confirm-button">
            Confirm
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
