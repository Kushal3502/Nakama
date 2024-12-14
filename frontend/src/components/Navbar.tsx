import React from "react";

function Navbar() {
  return (
    <div className="bg-white/10 backdrop-blur-xl h-16 flex items-center justify-between fixed md:top-8 top-4 md:left-20 left-4 md:right-20 right-4 z-50 rounded-xl shadow-lg px-8">
      <h1 className="text-white font-bold text-xl">Nakama</h1>
      <div className="flex items-center gap-4">
        <p className=" ">
          Hi, <span>User</span>
        </p>
        <div className="h-8 w-8 rounded-full bg-indigo-400"></div>
          </div>
    </div>
  );
}

export default Navbar;
