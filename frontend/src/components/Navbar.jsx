import React from "react";
import Footer from "./Footer";
import ImageCarousel from "./ImageCarousel";
import './Login.css'
import Header from "./Header";
import LudoWinners from "./LudoWinners";
import BuySellTokens from "./BuySellTokens";

const Navbar = () => {
  return (
    <div className=" b-nav bg-gradient-to-b from-gray-900 to-gray-700 text-white min-h-screen" >
      <Header />
      
      <main className="p-4" >
        <section className="mb-4">
          <ImageCarousel/>
        </section>
        
        {/* Equal Width Cards Grid */}
        <section className="p-4 grid grid-cols-1 md:grid-cols-2 gap-12 mb-6">
            <LudoWinners className="h-full"/>
            <BuySellTokens className="h-full"/>
        </section>
        
        <section className="mt-4">
          <h2 className="text-lg font-bold">Upcoming Matches</h2>
          <div className="overflow-hidden w-full h-40 bg-gray-300 flex items-center justify-center text-black">
          </div>
        </section><br></br>
        
      </main>
      <Footer/>
    </div>
  );
};

export default Navbar;
