import React, { useState, useEffect } from "react";
import "../styles/ValentineComponent.css"; // For styling the modal
import Paragraph from "./Paragraph";
import MusicController from "./MusicController";

const ValentineComponent = () => {
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Show the modal after 1 second (adjust timing as needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 6000); // Adjust delay to match the flowers' loading time

    return () => clearTimeout(timer);
  }, []);

  // Function to handle "Yes" button click
  const handleYesClick = () => {
    setIsYesClicked(true);
    const audio = new Audio(`${process.env.PUBLIC_URL}/audio/honk.mp3`);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };
  // Function to handle "No" button click
  const handleNoClick = () => {
    const modalContent = document.querySelector(".modal-content");
    const noButton = document.querySelector(".no-button");

    if (modalContent && noButton) {
      const modalRect = modalContent.getBoundingClientRect();
      const buttonRect = noButton.getBoundingClientRect();

      // Calculate maximum allowed positions
      const maxTop = modalRect.height - buttonRect.height;
      const maxLeft = modalRect.width - buttonRect.width;

      // Generate random positions within the modal bounds
      const randomTop = Math.random() * maxTop;
      const randomLeft = Math.random() * maxLeft;

      setNoButtonPosition({ top: randomTop, left: randomLeft });
    }
  };

  return (
    <div className={`modal-overlay ${isModalVisible ? "visible" : ""}`}>
      <MusicController />
      <div className="modal-content">
        {!isYesClicked ? (
          <>
            <h1>Will you be my Valentine?</h1>
            <div className="buttons-container">
              <button className="yes-button" onClick={handleYesClick}>
                Yes
              </button>
              <button
                className="no-button"
                style={{
                  position: "absolute",
                  top: `${noButtonPosition.top}px`,
                  left: `${noButtonPosition.left}px`,
                }}
                onClick={handleNoClick}
              >
                No
              </button>
            </div>
          </>
        ) : (
          <div className="gif-container">
            <img
              src={`${process.env.PUBLIC_URL}/media/valentine.gif`}
              alt="Valentine GIF"
            />
            <h2>Yay! Happy Future Valentine's Day mi amor!!! 💖</h2>
            <h2>P.S. (You better have not clicked no smh)</h2>
          </div>
        )}
      </div>
      <Paragraph />
    </div>
  );
};

export default ValentineComponent;
