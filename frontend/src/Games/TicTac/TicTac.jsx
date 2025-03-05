import React, { useState, useEffect } from 'react';
import './TicTac.css'; // Import the CSS file
import Dice3D from './Dice3D';

const TicTac = () => {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [currentTurnTotal, setCurrentTurnTotal] = useState(0);
    const [extraChance, setExtraChance] = useState(false);
    const [scores, setScores] = useState([0, 0]);
    const [cells, setCells] = useState(Array(9).fill(null));
    const [playerMoves, setPlayerMoves] = useState([[], []]);
    const [popupMessage, setPopupMessage] = useState('');
    const [rolling, setRolling] = useState(false);
    const [diceResult, setDiceResult] = useState(null);
    const [diceDisabled, setDiceDisabled] = useState(false); // Enable dice at the start

    const winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    useEffect(() => {
        updateDisplay();
    }, [currentPlayer, scores]);

    const rollDice = () => {
        if (rolling || diceDisabled) return; // Disable dice if it's already rolling or disabled

        setRolling(true);
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 6) + 1;
            setDiceResult(roll);
            processRoll(roll);
            setRolling(false);
        }, 1000); // Adjust the timeout for smoother rolling
    };

    const processRoll = (roll) => {
        let newTurnTotal = currentTurnTotal + roll;
        setCurrentTurnTotal(newTurnTotal);

        // Check if the rolled number corresponds to a cell
        if (newTurnTotal <= 9) {
            const cellIndex = newTurnTotal - 1;
            if (cells[cellIndex] !== null && cells[cellIndex] !== currentPlayer) {
                setScores(prev => {
                    const newScores = [...prev];
                    newScores[currentPlayer - 1] += newTurnTotal;
                    return newScores;
                });
                showPopup(`+${newTurnTotal} points from opponent's cell!`, newTurnTotal);
                resetTurn();
                return;
            }
        }

        // Check if the total exceeds 9
        if (newTurnTotal > 9) {
            const points = newTurnTotal - 9;
            setScores(prev => {
                const newScores = [...prev];
                newScores[currentPlayer - 1] += points;
                return newScores;
            });
            showPopup(`+${points} points added!`, points);
            resetTurn();
            switchPlayer();
            return;
        }

        // Check for duplicate moves
        if (playerMoves[currentPlayer - 1].includes(newTurnTotal)) {
            setScores(prev => {
                const newScores = [...prev];
                newScores[currentPlayer - 1] -= newTurnTotal;
                return newScores;
            });
            showPopup(`Duplicate! -${newTurnTotal} points`, newTurnTotal);
            resetTurn();
            switchPlayer();
            return;
        }

        // Check for extra chance on rolling a 6
        if (roll === 6 && newTurnTotal <= 9) {
            setExtraChance(true);
            showPopup('Roll again!', roll);
        } else {
            setExtraChance(false);
        }

        // Disable dice after rolling until a cell is selected
        setDiceDisabled(true);
    };

    const handleCellClick = (index) => {
        if (cells[index] || currentTurnTotal === 0) return;

        const cellNumber = index + 1;
        if (cellNumber !== currentTurnTotal) {
            showPopup(`Select cell ${currentTurnTotal}`, currentTurnTotal);
            return;
        }

        const newCells = [...cells];
        newCells[index] = currentPlayer;
        setCells(newCells);

        setPlayerMoves(prev => {
            const newMoves = [...prev];
            newMoves[currentPlayer - 1].push(currentTurnTotal);
            return newMoves;
        });

        setScores(prev => {
            const newScores = [...prev];
            newScores[currentPlayer - 1] += currentTurnTotal;
            return newScores;
        });

        checkWinner(newCells);
        resetTurn();
        switchPlayer();

        // Enable dice after cell selection
        setDiceDisabled(false);
    };

    const checkWinner = (currentCells) => {
        for (let combo of winCombos) {
            const [a, b, c] = combo;
            if (currentCells[a] && currentCells[a] === currentCells[b] && currentCells[a] === currentCells[c]) {
                showPopup(`Player ${currentPlayer} wins! +100 points`, 100);
                setScores(prev => {
                    const newScores = [...prev];
                    newScores[currentPlayer - 1] += 100;
                    return newScores;
                });
                setTimeout(resetGame, 2000);
                return;
            }
        }
        if (currentCells.every(cell => cell !== null)) {
            showPopup('Game Draw!', 0);
            setTimeout(resetGame, 2000);
        }
    };

    const switchPlayer = () => {
        if (!extraChance) {
            setCurrentPlayer(prev => prev === 1 ? 2 : 1);
        }
    };

    const resetTurn = () => {
        setCurrentTurnTotal(0);
        setExtraChance(false);
    };

    const resetGame = () => {
        setCells(Array(9).fill(null));
        setPlayerMoves([[], []]);
        setCurrentTurnTotal(0);
        setDiceDisabled(false); // Enable dice on game reset
    };

    const showPopup = (message, number) => {
        setPopupMessage(`${message} (Dice: ${number})`);
        setTimeout(() => setPopupMessage(''), 2000);
    };

    const updateDisplay = () => {
        // Handled through React state updates
    };

    return (
        <div className="tic-tac-toe">
            <a href="#" className="back-icon">⬅</a>
            <a href="#" className="home-icon">🏠</a>
            <h1 className="header">Tic Tac Toe</h1>

            <div className="game-container">
                <div className="board">
                    {cells.map((cell, index) => (
                        <div
                            key={index}
                            className={`cell ${cell === 1 ? 'x' : cell === 2 ? 'o' : ''} ${cell ? 'used' : ''}`}
                            onClick={() => handleCellClick(index)}
                        >
                            {cell === 1 ? 'X' : cell === 2 ? 'O' : index + 1}
                        </div>
                    ))}
                </div>
            </div>

            <div className="players">
                <div className={`player ${currentPlayer === 1 ? 'active' : ''}`}>
                    Player 1 (X): P{scores[0]}
                </div>
                <div className={`player ${currentPlayer === 2 ? 'active' : ''}`}>
                    Player 2 (O): P{scores[1]}
                </div>
            </div>

            <div className="dice-container">
                <div
                    className={`dice ${rolling ? 'rolling' : ''} ${diceDisabled ? 'disabled' : ''}`}
                    onClick={!diceDisabled ? rollDice : undefined}
                >
                    <Dice3D currentNumber={diceResult} rolling={rolling} />
                </div>
            </div>

            {popupMessage && <div className="popup">{popupMessage}</div>}
        </div>
    );
};

export default TicTac;






















