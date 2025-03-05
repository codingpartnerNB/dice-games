import React, { useState, useEffect } from 'react';
import { PlayerSelection } from './PlayerSelection';
import { PlayerSetup } from './PlayerSetup';
import { Game } from './Game';
import { INITIAL_PLAYERS, LADDERS, SNAKES } from './Constants';
import "./SnakeLadder.css";

const GAME_DURATION = 10 * 60; // 10 minutes in seconds

const INITIAL_STATE = {
  currentPlayer: 1,
  playersCount: 2,
  players: [...INITIAL_PLAYERS].map(player => ({
    ...player,
    hasStarted: false,
    points: 0,
    score: 0,
    lastMovement: 0
  })),
  screen: 'select',
  winner: null,
  notification: null,
  timeRemaining: GAME_DURATION
};

function SnakeLadder() {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [audioElements, setAudioElements] = useState({});
  const [timerActive, setTimerActive] = useState(false);

  // Switch to the next player
  const switchPlayer = () => {
    setGameState(prev => ({
      ...prev,
      currentPlayer: (prev.currentPlayer % prev.playersCount) + 1
    }));
  };

  // Reset the game state
  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      currentPlayer: 1,
      players: prev.players.map(player => ({
        ...player,
        score: 0,
        hasStarted: false,
        points: 0,
        lastDice: null,
      })),
      winner: null,
    }));
  };

  useEffect(() => {
    const audio = {
      drop: new Audio('/audio/drop.mp3'),
      ladder: new Audio('/audio/ladder.mp3'),
      snake: new Audio('/audio/snake.mp3'),
      dice: new Audio('/audio/dice.mp3'),
      success: new Audio('/audio/success.mp3'),
    };
    setAudioElements(audio);
  }, []);

  useEffect(() => {
    let timer;
    if (timerActive && gameState.timeRemaining > 0 && !gameState.winner) {
      timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeRemaining <= 1) {
            clearInterval(timer);
            const winner = [...prev.players]
              .slice(0, prev.playersCount)
              .reduce((max, player) => 
                player.points > max.points ? player : max
              );
            return {
              ...prev,
              timeRemaining: 0,
              winner,
              notification: { 
                message: `Time's up! ${winner.name} wins with ${winner.points} points!`,
                type: 'success'
              }
            };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const showNotification = (message, type) => {
    setGameState(prev => ({
      ...prev,
      notification: { message, type }
    }));
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        notification: null
      }));
    }, 2000);
  };

  const checkPlayerCollision = (position, currentPlayerNo) => {
    const otherPlayers = gameState.players.filter((p, idx) => 
      idx !== currentPlayerNo - 1 && p.score === position && p.hasStarted
    );

    if (otherPlayers.length > 0) {
      setGameState(prev => {
        const newPlayers = [...prev.players];
        // Add 10 points to the current player
        newPlayers[currentPlayerNo - 1].points += 10;
        // Deduct 10 points from the eliminated player
        otherPlayers.forEach(player => {
          const idx = newPlayers.findIndex(p => p.name === player.name);
          newPlayers[idx] = {
            ...newPlayers[idx],
            score: 0,
            points: Math.max(0, newPlayers[idx].points - 10), // Deduct 10 points
            hasStarted: false
          };
        });
        return { ...prev, players: newPlayers };
      });
      showNotification(`Player eliminated! +10 points!`, 'success');
      return true;
    }
    return false;
  };

  const movePlayerOneStep = async (playerNo, currentPosition, targetPosition) => {
    if (currentPosition >= targetPosition) return;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    audioElements.drop?.play();
    
    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[playerNo - 1].score = currentPosition + 1;
      newPlayers[playerNo - 1].lastMovement = Date.now();
      return { ...prev, players: newPlayers };
    });

    checkPlayerCollision(currentPosition + 1, playerNo);
    
    await movePlayerOneStep(playerNo, currentPosition + 1, targetPosition);
  };

 // Check for ladders and snakes
 const checkLadderAndSnake = async (position, playerNumber) => {
  // Check ladders
  for (let i = 0; i < LADDERS.length; i++) {
    if (LADDERS[i][0] === position) {
      audioElements.ladder?.play();
      setGameState(prev => {
        const newPlayers = [...prev.players];
        newPlayers[playerNumber - 1].points += 5;
        return { ...prev, players: newPlayers };
      });
      showNotification('+5 points! Climbed a ladder!', 'success');
      for (const pos of LADDERS[i]) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setGameState(prev => {
          const newPlayers = [...prev.players];
          newPlayers[playerNumber - 1].score = pos;
          return { ...prev, players: newPlayers };
        });
      }
      checkPlayerCollision(LADDERS[i][LADDERS[i].length - 1], playerNumber);
      return;
    }
  }

   // Check snakes
   for (let i = 0; i < SNAKES.length; i++) {
    if (SNAKES[i][0] === position) {
      audioElements.snake?.play();
      setGameState(prev => {
        const newPlayers = [...prev.players];
        newPlayers[playerNumber - 1].points -= 5;
        return { ...prev, players: newPlayers };
      });
      showNotification('-5 points! Snake bite!', 'error');
      for (const pos of SNAKES[i]) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setGameState(prev => {
          const newPlayers = [...prev.players];
          newPlayers[playerNumber - 1].score = pos;
          return { ...prev, players: newPlayers };
        });
      }
      checkPlayerCollision(SNAKES[i][SNAKES[i].length - 1], playerNumber);
    }
  }
};
  const movePlayer = async (playerNo, diceNumber) => {
    const player = gameState.players[playerNo - 1];
    const startPosition = player.score;
    const endPosition = startPosition + diceNumber;

    if (endPosition <= 100) {
      // Add only the dice number as points (not doubled)
      setGameState(prev => {
        const newPlayers = [...prev.players];
        newPlayers[playerNo - 1].points += diceNumber;
        return { ...prev, players: newPlayers };
      });
      showNotification(`+${diceNumber} points!`, 'success');

      await movePlayerOneStep(playerNo, startPosition, endPosition);

      if (endPosition === 100) {
        audioElements.success?.play();
        setGameState(prev => ({
          ...prev,
          winner: prev.players[playerNo - 1],
        }));
        return true;
      }

      await checkLadderAndSnake(endPosition, playerNo);
    }
    return false;
  };

  const rollDice = async (playerNo) => {
    if (playerNo !== gameState.currentPlayer) return;

    if (!timerActive) {
      setTimerActive(true);
    }

    audioElements.dice?.play();
    const diceNumber = Math.floor(Math.random() * 6) + 1;

    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[playerNo - 1].lastDice = diceNumber;
      return { ...prev, players: newPlayers, currentPlayer: 0 };
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const player = gameState.players[playerNo - 1];
    let gameWon = false;

    if (!player.hasStarted && (diceNumber === 1 || diceNumber === 6)) {
      setGameState(prev => {
        const newPlayers = [...prev.players];
        newPlayers[playerNo - 1].hasStarted = true;
        newPlayers[playerNo - 1].score = 1;
        return { ...prev, players: newPlayers };
      });
      if (diceNumber === 6) {
        setGameState(prev => ({
          ...prev,
          currentPlayer: playerNo
        }));
        return;
      }
    } else if (player.hasStarted) {
      gameWon = await movePlayer(playerNo, diceNumber);
      
      if (diceNumber === 6 && !gameWon) {
        setGameState(prev => ({
          ...prev,
          currentPlayer: playerNo
        }));
        return;
      }
    }

    if (!gameWon) {
      setGameState(prev => ({
        ...prev,
        currentPlayer: (playerNo % prev.playersCount) + 1,
      }));
    }
  };

  const selectPlayers = (count) => {
    setGameState(prev => ({ ...prev, playersCount: count }));
  };

  const updateProfile = (playerNo, direction) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      const player = newPlayers[playerNo - 1];
      if (direction === 1) {
        player.image = (player.image + 1) % 8;
      } else {
        player.image = player.image === 0 ? 7 : (player.image - 1) % 8;
      }
      return { ...prev, players: newPlayers };
    });
  };

  const handleNameChange = (playerNo, name) => {
    setGameState(prev => {
      const newPlayers = [...prev.players];
      newPlayers[playerNo - 1].name = name;
      return { ...prev, players: newPlayers };
    });
  };

  const renderScreen = () => {
    switch (gameState.screen) {
      case 'select':
        return (
          <PlayerSelection
            playersCount={gameState.playersCount}
            onSelectPlayers={selectPlayers}
            onStart={() => setGameState(prev => ({ ...prev, screen: 'setup' }))}
          />
        );
      case 'setup':
        return (
          <PlayerSetup
            players={gameState.players}
            playersCount={gameState.playersCount}
            onUpdateProfile={updateProfile}
            onNameChange={handleNameChange}
            onNext={() => setGameState(prev => ({ ...prev, screen: 'game' }))}
            onBack={() => setGameState(prev => ({ ...prev, screen: 'select' }))}
          />
        );
      case 'game':
        return (
          <Game
            players={gameState.players}
            playersCount={gameState.playersCount}
            currentPlayer={gameState.currentPlayer}
            winner={gameState.winner}
            onRollDice={rollDice}
            onNewGame={() => {
              setTimerActive(false);
              setGameState(INITIAL_STATE);
            }}
            timeRemaining={formatTime(gameState.timeRemaining)}
            switchPlayer={switchPlayer}
            scores={gameState.players.map(player => player.points)}
            resetGame={resetGame}
            showPopup={showNotification}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="screen" id={`screen${gameState.screen === 'select' ? '1' : gameState.screen === 'setup' ? '2' : '3'}`}>
      {gameState.notification && (
        <div className={`notification ${gameState.notification.type}`}>
          {gameState.notification.message}
        </div>
      )}
      {renderScreen()}
    </div>
  );
}

export default SnakeLadder;