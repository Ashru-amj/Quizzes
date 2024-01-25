import React, { useState } from "react";
import "../../src/App.css";



const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) {
        return null;
      }
    
      const handleConfirmDelete = () => {
        onDelete();
      };

    return (
        <div className="q-modal-container">
          <div className="q-modal">
            <div className="q-modal-content">
              <p>Are you confirm you want to delete?</p>
              <div className="delete-modal-button-wrap">
                <button
                  className="delete-modal-button1"
                  onClick={handleConfirmDelete}
                >
                  Confirm Delete
                </button>
                <button className="delete-modal-button2" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default DeleteConfirmationModal;
