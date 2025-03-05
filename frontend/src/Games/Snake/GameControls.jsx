import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDiceOne, 
  faDiceTwo, 
  faDiceThree, 
  faDiceFour, 
  faDiceFive, 
  faDiceSix 
} from "@fortawesome/free-solid-svg-icons";

import "./SnakeLadder.css";

export const GameControls = ({
  players,
  playersCount,
  currentPlayer,
  onRollDice,
  points,
}) => {
  const getDiceIcon = (value) => {
    const icons = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix];
    return icons[value - 1] || faDiceOne;
  };

  return (
    <div className="gamePlayers">
      <div className="playersBox">
        {players.slice(0, playersCount).map((player, index) => (
          <div key={index} className="playerCard" id={`playerCard${index + 1}`}>
            <div className="level1">
              <img src={`/images/avatars/${player.image}.png`} id={`avatar${index + 1}`} alt={player.name} />
              <div
                id={`dice${index + 1}`}
                className={`diceBox ${currentPlayer !== index + 1 ? 'opacity-50' : ''}`}
                onClick={() => onRollDice(index + 1)}
              >
                <FontAwesomeIcon
                  icon={getDiceIcon(player.lastDice || 1)}
                  className="diceImg"
                />
              </div>
            </div>
            <div className="level2">
              <div id={`displayName${index + 1}`}>{player.name}</div>
              <div className="pointsDisplay">Points: {player.points}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};