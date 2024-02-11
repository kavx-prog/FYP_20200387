import React, { useState } from "react";
import "../assets/styles/Modal.css";

function CheckModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button onClick={closeModal}>X</button>
            </div>
            <div className="title">
              <h1>Are You Sure You Want to Continue?</h1>
            </div>
            <div className="body">
              <p>The next page looks amazing. Hope you want to go there!</p>
            </div>
            <div className="footer">
              <button onClick={closeModal} id="cancelBtn">
                Cancel
              </button>
              <button>Continue</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckModal;
