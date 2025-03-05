

import React, { useState } from "react";
import { FaCoins } from "react-icons/fa"; // Import Coin Icon from react-icons
import NotificationsIcon from "@mui/icons-material/Notifications"; // Inactive Bell Icon
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"; // Active Bell Icon

const Header = () => {
  // State to manage the active/inactive state of the notification icon
  const [isNotificationActive, setIsNotificationActive] = useState(false);

  // Function to toggle the notification icon state
  const handleNotificationClick = () => {
    setIsNotificationActive(!isNotificationActive);
  };

  return (
    <header className="b-head sticky top-0 z-50 w-full bg-gradient-to-r from-black to-gray-800 text-white p-4 sm:p-6 flex justify-between items-center">
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="dice-wrapper">
          <img
            src="Dice-logo.jpg"
            alt="Profile"
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold">Diice Raja</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Tokens:05 with Coin Icon */}
        <div className="flex items-center gap-1 sm:gap-2">
          <FaCoins className="text-yellow-400" size={18} />
          <span id="displayName" className="text-xs sm:text-base">
            Tokens: 05
          </span>
        </div>

        {/* User ID */}
        <span id="userId" className="sm:inline text-xs sm:text-base">
          User ID: 0000
        </span>

        {/* Notification Icon with onClick functionality */}
        <div
          onClick={handleNotificationClick}
          className="cursor-pointer transition duration-300 hover:scale-110"
        >
          {isNotificationActive ? (
            <NotificationsActiveIcon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
          ) : (
            <NotificationsIcon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
          )}
        </div>

       
      </div>
    </header>
  );
};

export default Header;