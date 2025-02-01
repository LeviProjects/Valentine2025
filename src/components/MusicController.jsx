import React, { useRef, useEffect } from "react";
import "../styles/MusicController.css"; // Import the CSS file for styling

const MusicController = () => {
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleVolumeChange = (event) => {
    if (audioRef.current) {
      audioRef.current.volume = event.target.value;
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleSongEnd = () => {
      console.log("Song has ended");
      if (audioElement) {
        audioElement.currentTime = 0; // Reset the audio to the beginning
      }
    };

    if (audioElement) {
      audioElement.addEventListener("ended", handleSongEnd);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleSongEnd);
      }
    };
  }, []);

  return (
    <div className="music-controller modal-content">
      <img src="/album-art.jpg" alt="Album Art" className="album-art" />
      <div className="music-info">
        <h2 className="music-title"> ;) </h2>
        <div className="controls">
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <audio ref={audioRef} src="/music.mp3" />
    </div>
  );
};

export default MusicController;
