import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";

const Footer = () => {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  return (
    <div className="mt-5 flex flex-col justify-end pb-4">
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] bg-opacity-70 shadow-lg rounded-t-xl w-full flex justify-around p-2">
        <NavItem
          icon={<HomeIcon style={{ fontSize: "30px" }} className="cursor-pointer" onClick={() => navigate("/navbar")} />} 
          label="Home"
          active={active === "home"}
          onClick={() => setActive("home")}
        />

        <NavItem
          icon={<LocalGroceryStoreIcon style={{ fontSize: "29px" }} className="cursor-pointer" />}
          label="Supermarket"
          active={active === "Supermarket"}
          onClick={() => setActive("Supermarket")}
        />

        <NavItem
          icon={<SportsEsportsIcon style={{ fontSize: "30px" }} className="cursor-pointer" onClick={() => navigate("/playzone")} />}
          label="Playzone"
          active={active === "playzone"}
          onClick={() => setActive("playzone")}
        />

        <NavItem
          icon={<GroupIcon style={{ fontSize: "30px" }} className="cursor-pointer" onClick={() => navigate("/friend")}/>}
          label="Friends"
          active={active === "Friends"}
          onClick={() => setActive("Friends")}
        />

        <NavItem
          icon={<AccountCircleIcon style={{ fontSize: "27px" }} className="cursor-pointer" onClick={() => navigate("/profile")} />}
          label="Profile"
          active={active === "profile"}
          onClick={() => setActive("profile")}
        />
      </nav>
    </div>
  );
};

export default Footer;

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center text-white transition-all ${active ? "text-blue-400" : "text-gray-400"} hover:scale-110 active:scale-95`}>
      {icon}
      <span className="text-xs pt-1 md:text-sm lg:text-md cursor-pointer">{label}</span>
    </button>
  );
}
