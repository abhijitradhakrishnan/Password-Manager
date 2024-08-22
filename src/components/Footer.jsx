import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-row justify-around items-center w-full">
      <div className="flex justify-center items-center">
        Create with <img className="w-7 mx-2" src="icons/heart.png" alt="heart-emoji" /> by Abhi
      </div>
      <div className="logo font-bold text-2xl ">
        <span className="text-green-700">&lt;</span>
        Pass
        <span className="text-green-700">OP/&gt;</span>
      </div>
    </div>
  );
};

export default Footer;
