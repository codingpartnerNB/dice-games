

import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaGlobe, FaGamepad } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import "./Playzone.css";

const ImageCard = ({ imageSrc, altText, onClick, isActive, title }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Image Container */}
      <div className="image-card-container" onClick={onClick}>
        <img src={imageSrc} alt={altText} className="game-image" />
      </div>

      {/* Game Title */}
      <p className="game-title">{title}</p>

      {/* Options (Displayed Below Image, Outside Container) */}
      {isActive && (
        <div className="options-container">
          <button className="option-button">
            <FaGamepad className="text-lg" /> PLAY OFFLINE
          </button>

          <button className="option-button">
            <FaGlobe className="text-lg" /> PLAY ONLINE
          </button>

          <button className="option-button">
            <GiTrophyCup className="text-lg" /> TOURNAMENT
          </button>
        </div>
      )}
    </div>
  );
};

const Playzone = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".image-card-container")) {
        setActiveIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="playzone-container">
        <h1 className="heading ">GAMES</h1>
        <div className="games-wrapper">
          <div className="image-card">
            <ImageCard
              imageSrc="diice-img.jpg"
              altText="Game 1"
              title="Tic Tac Toe"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(activeIndex === 0 ? null : 0);
              }}
              isActive={activeIndex === 0}
            />
          </div>
          <div className="image-card">
            <ImageCard
              imageSrc="snake.jpg"
              altText="Game 2"
              title="Snake Ladder"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(activeIndex === 1 ? null : 1);
              }}
              isActive={activeIndex === 1}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Playzone;








