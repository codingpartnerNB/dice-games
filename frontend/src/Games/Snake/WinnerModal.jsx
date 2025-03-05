import React from 'react';
import "./SnakeLadder.css";

export const WinnerModal = ({ winner, onNewGame }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modalBody">
          <img src={`/images/avatars/${winner.image}.png`} alt={winner.name} />
          <h1>
            Congratulations! <span id="wname">{winner.name}</span>
          </h1>
          <p className="winner-points">You won with {winner.points} points! 🎉</p>
          <button className="startBtn" onClick={onNewGame}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};