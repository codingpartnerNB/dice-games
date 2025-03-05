import React, { useEffect } from 'react';
import './Dice3D.css';

const Dice3D = ({ currentNumber, rolling }) => {
    const getRotation = (number) => {
        switch (number) {
            case 1:
                return 'rotateX(0deg) rotateY(0deg)';
            case 2:
                return 'rotateX(0deg) rotateY(180deg)';
            case 3:
                return 'rotateX(0deg) rotateY(-90deg)';
            case 4:
                return 'rotateX(0deg) rotateY(90deg)';
            case 5:
                return 'rotateX(-90deg) rotateY(0deg)';
            case 6:
                return 'rotateX(90deg) rotateY(0deg)';
            default:
                return 'rotateX(0deg) rotateY(0deg)';
        }
    };

    const diceFaces = [
        { id: 1, face: 'front', dots: 1 },
        { id: 2, face: 'back', dots: 2 },
        { id: 3, face: 'left', dots: 3 },
        { id: 4, face: 'right', dots: 4 },
        { id: 5, face: 'top', dots: 5 },
        { id: 6, face: 'bottom', dots: 6 },
    ];

    return (
        <div className="diceContainer border-4 rounded-xl flex items-center justify-center">
            <div className="scene">
                <div
                    className={`dice ${rolling ? 'rolling' : ''}`}
                    style={{ transform: rolling ? 'rotateX(360deg) rotateY(360deg)' : getRotation(currentNumber) }}
                >
                    {diceFaces.map((face) => (
                        <div key={face.id} className={`diceFace ${face.face}`}>
                            <div className="dotContainer">
                                {Array.from({ length: face.dots }).map((_, index) => (
                                    <div key={index} className={`dot dot-${face.dots}`} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dice3D;







