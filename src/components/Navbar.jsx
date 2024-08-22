import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 ">
        <div className="logo font-bold text-2xl">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </div>
        <button className="text-white my-5 rounded-md flex justify-between items-center">
            <img className="invert w-10 p-1" src="icons/github.svg" alt="github" />
            <span className="font-bold px-2">Github</span>    
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
