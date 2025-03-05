import React, { useState } from 'react';
import "./SnakeLadder.css";

export const PlayerSetup = ({
  players,
  playersCount,
  onUpdateProfile,
  onNameChange,
  onNext,
  onBack,
}) => {
  // Keep track of input values locally
  const [inputValues, setInputValues] = useState(
    players.reduce((acc, player, index) => {
      acc[index + 1] = player.name;
      return acc;
    }, {})
  );

  const handleNameChange = (playerNo, value) => {
    // Update local state immediately for smooth typing
    setInputValues(prev => ({
      ...prev,
      [playerNo]: value
    }));
    
    // If empty, use default name
    const newName = value.trim() || `Player${playerNo}`;
    onNameChange(playerNo, newName);
  };

  const handleInputBlur = (playerNo) => {
    const value = inputValues[playerNo];
    // When input loses focus, ensure we have at least the default name
    const newName = value.trim() || `Player${playerNo}`;
    setInputValues(prev => ({
      ...prev,
      [playerNo]: newName
    }));
    onNameChange(playerNo, newName);
  };

  return (
    <div className="s1-card">
      <h1>Add Names and profile</h1>
      <div className="cards">
        {players.slice(0, playersCount).map((player, index) => (
          <div key={index} className="card" id={`card${index + 1}`}>
            <div className="profile">
              <div className="arrow" onClick={() => onUpdateProfile(index + 1, 2)}>
                <span className="material-symbols-outlined">keyboard_arrow_left</span>
              </div>
              <div className="selectImage">
                <img src={`/images/avatars/${player.image}.png`} id={`profile${index + 1}`} alt={player.name} />
              </div>
              <div className="arrow" onClick={() => onUpdateProfile(index + 1, 1)}>
                <span className="material-symbols-outlined">keyboard_arrow_right</span>
              </div>
            </div>
            <div className="inputName">
              <input
                type="text"
                value={inputValues[index + 1]}
                onChange={(e) => handleNameChange(index + 1, e.target.value)}
                onBlur={() => handleInputBlur(index + 1)}
                onClick={(e) => e.target.select()}
                placeholder="Write name here..."
                id={`name${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="startBtn" onClick={onBack}>Back</button>
      <button className="startBtn next" onClick={onNext}>NEXT</button>
    </div>
  );
};